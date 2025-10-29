import { useState, useEffect, useCallback } from 'react';
import { flashcards } from '../data/flashcards';

export function useSpacedRepetition() {
  const [cards, setCards] = useState(() => {
    try {
      const saved = localStorage.getItem('tersekuller-cards');
      if (saved) {
        const parsedCards = JSON.parse(saved);
        // Merge saved cards with original flashcards to ensure examples are preserved
        return parsedCards.map(savedCard => {
          const originalCard = flashcards.find(fc => fc.id === savedCard.id);
          if (originalCard) {
            // Preserve saved progress but use original card data (including examples)
            return {
              ...originalCard,
              difficulty: savedCard.difficulty ?? originalCard.difficulty,
              lastSeen: savedCard.lastSeen ?? originalCard.lastSeen,
              interval: savedCard.interval ?? originalCard.interval,
              nextReview: savedCard.nextReview ?? originalCard.nextReview
            };
          }
          return savedCard;
        });
      }
      return flashcards;
    } catch (error) {
      console.error('Error loading saved cards:', error);
      return flashcards;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tersekuller-cards', JSON.stringify(cards));
    } catch (error) {
      console.error('Error saving cards to localStorage:', error);
    }
  }, [cards]);

  const updateCard = useCallback((cardId, correct) => {
    setCards(prev => {
      const updated = prev.map(card => {
        if (card.id === cardId) {
          let newInterval;
          let newDifficulty;
          
          if (correct) {
            // SM-2 inspired intervals for language learning
            // Based on research: 1 day, 2 days, 7 days, 16 days, 35 days, 70 days, 120 days
            const intervals = [1, 2, 7, 16, 35, 70, 120];
            const currentLevel = Math.min(card.difficulty, intervals.length - 1);
            newInterval = intervals[currentLevel];
            newDifficulty = card.difficulty + 1;
          } else {
            // Reset to beginning if wrong
            newInterval = 1;
            newDifficulty = 0;
          }
          
          return {
            ...card,
            difficulty: newDifficulty,
            lastSeen: Date.now(),
            interval: newInterval,
            nextReview: Date.now() + (newInterval * 24 * 60 * 60 * 1000)
          };
        }
        return card;
      });
      
      return updated;
    });
  }, []);

  const getNextCard = useCallback(() => {
    const now = Date.now();
    const DAY_MS = 24 * 60 * 60 * 1000;
    
    // Cards that are due for review
    const dueCards = cards.filter(card => {
      if (!card.lastSeen) return true; // Never seen = always due
      
      const daysSinceLastSeen = (now - card.lastSeen) / DAY_MS;
      return daysSinceLastSeen >= card.interval;
    });
    
    if (dueCards.length > 0) {
      // Return the most overdue card
      return dueCards.sort((a, b) => {
        const aOverdue = a.lastSeen ? 
          (now - a.lastSeen) / (a.interval * DAY_MS) : Infinity;
        const bOverdue = b.lastSeen ? 
          (now - b.lastSeen) / (b.interval * DAY_MS) : Infinity;
        return bOverdue - aOverdue; // Most overdue first
      })[0];
    }
    
    // No cards due? Show the one due soonest
    return cards.sort((a, b) => {
      const aDueDate = (a.lastSeen || 0) + (a.interval * DAY_MS);
      const bDueDate = (b.lastSeen || 0) + (b.interval * DAY_MS);
      return aDueDate - bDueDate; // Soonest first
    })[0];
  }, [cards]);

  return { cards, updateCard, getNextCard };
}

