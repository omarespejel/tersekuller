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

  const getNextCard = useCallback((excludeCardId = null) => {
    const now = Date.now();
    const DAY_MS = 24 * 60 * 60 * 1000;
    
    // Minimum time before showing the same card again (1 minute)
    const MIN_REPEAT_TIME = 60 * 1000;
    
    // Cards that are due for review (excluding recently seen cards and current card)
    const dueCards = cards.filter(card => {
      // Exclude the current card if specified
      if (excludeCardId && card.id === excludeCardId) return false;
      
      if (!card.lastSeen) return true; // Never seen = always due
      
      // Don't show cards that were just seen (within last minute)
      if (now - card.lastSeen < MIN_REPEAT_TIME) return false;
      
      const daysSinceLastSeen = (now - card.lastSeen) / DAY_MS;
      return daysSinceLastSeen >= card.interval;
    });
    
    if (dueCards.length > 0) {
      // Return a random due card instead of always the most overdue
      // This adds variety while still prioritizing due cards
      return dueCards[Math.floor(Math.random() * dueCards.length)];
    }
    
    // No cards due? Get cards not seen in last minute (excluding current card)
    const availableCards = cards.filter(card => {
      if (excludeCardId && card.id === excludeCardId) return false;
      
      if (!card.lastSeen) return true;
      
      // Don't show cards seen in the last minute
      return (now - card.lastSeen) >= MIN_REPEAT_TIME;
    });
    
    if (availableCards.length > 0) {
      return availableCards[Math.floor(Math.random() * availableCards.length)];
    }
    
    // If all cards were seen recently, return a random one (except current)
    const remainingCards = excludeCardId 
      ? cards.filter(c => c.id !== excludeCardId)
      : cards;
    
    if (remainingCards.length > 0) {
      return remainingCards[Math.floor(Math.random() * remainingCards.length)];
    }
    
    // Fallback: return any card
    return cards[0];
  }, [cards]);

  return { cards, updateCard, getNextCard };
}

