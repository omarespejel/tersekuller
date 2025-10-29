import { useState, useEffect } from 'react';
import { useSpacedRepetition } from './hooks/useSpacedRepetition';
import { FlashCard } from './components/FlashCard';
import { StickerReward } from './components/StickerReward';
import { ProgressBar } from './components/ProgressBar';
import { Stats } from './components/Stats';
import { ReviewSchedule } from './components/ReviewSchedule';
import { ProgressSummary } from './components/ProgressSummary';
import { DailyGoal } from './components/DailyGoal';
import { Achievements } from './components/Achievements';
import { About } from './components/About';
import './App.css';

function App() {
  const { cards, updateCard, getNextCard } = useSpacedRepetition();
  const [currentCard, setCurrentCard] = useState(null);
  const [streak, setStreak] = useState(0);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    setCurrentCard(getNextCard());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handleAnswer = (cardId, correct) => {
    updateCard(cardId, correct);
    
    if (correct) {
      setStreak(prev => prev + 1);
      setShowReward(true);
      // Longer display time for mobile
      setTimeout(() => setShowReward(false), 2500);
    } else {
      setStreak(0);
      setShowReward(false); // Ensure it's hidden on wrong answer
    }
    
    // Wait longer before showing next card, and ensure it's a different card
    setTimeout(() => {
      // Explicitly exclude the current card to prevent immediate repeats
      const nextCard = getNextCard(cardId);
      setCurrentCard(nextCard);
    }, correct ? 2600 : 1500); // Longer wait if correct to see celebration
  };

  const progress = cards.filter(c => c.difficulty > 0).length;

  if (!currentCard) {
    return (
      <div className="app">
        <div className="loading-skeleton">
          <div className="skeleton-card">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-text"></div>
            <div className="skeleton-line skeleton-text"></div>
            <div className="skeleton-line skeleton-button"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>🐻 TERSEKULLER 🍯</h1>
        <p className="subtitle">Preparing Buse for Spanish</p>
        
        <Stats cards={cards} streak={streak} />
        <DailyGoal cards={cards} />
        <ReviewSchedule cards={cards} />
        <ProgressSummary cards={cards} />
        <ProgressBar progress={progress} total={cards.length} />
      </header>

      <main>
        <FlashCard 
          card={currentCard} 
          onAnswer={handleAnswer}
        />
        
        <StickerReward 
          show={showReward} 
          streak={streak}
        />
        
        <Achievements 
          cards={cards} 
          streak={streak}
        />
      </main>

      <footer>
        <div className="footer-hearts">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i}
              className="floating-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.2}s`,
                fontSize: `${Math.random() * 20 + 15}px`
              }}
            >
              ♥
            </span>
          ))}
        </div>
        <About />
        <div className="made-with-love">
          Made with 
          <span className="heart-icon">♥️</span> 
          for 
          <span className="creator-names">Buse</span> 
          by 
          <span className="creator-names">Omar Espejel</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

