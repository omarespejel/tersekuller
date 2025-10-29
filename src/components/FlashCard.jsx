import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

export function FlashCard({ card, onAnswer }) {
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showExamples, setShowExamples] = useState(true); // Show by default!
  const [answerFeedback, setAnswerFeedback] = useState(null); // 'correct' or 'wrong'

  const categoryColors = {
    street: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    essential: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
    profanity: 'linear-gradient(135deg, #F093FB, #F5576C)',
    daily: 'linear-gradient(135deg, #FA709A, #FEE140)',
    survival: 'linear-gradient(135deg, #667eea, #764ba2)',
    food: 'linear-gradient(135deg, #fa709a, #fee140)',
    emergency: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
    transport: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    social: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    'vegetarian-essential': 'linear-gradient(135deg, #51cf66, #40c057)',
    'vegetarian-warning': 'linear-gradient(135deg, #ffd43b, #fcc419)',
    'vegetarian-foods': 'linear-gradient(135deg, #66d9e8, #3bc9db)',
    'vegetarian-mexican': 'linear-gradient(135deg, #ff922b, #fd7e14)',
    'vegetarian-emergency': 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
    'vegetarian-positive': 'linear-gradient(135deg, #51cf66, #40c057)'
  };

  const handleAnswer = useCallback((correct) => {
    setAnswered(true);
    setAnswerFeedback(correct ? 'correct' : 'wrong');
    onAnswer(card.id, correct);
    
    // Reset feedback after animation
    setTimeout(() => {
      setAnswerFeedback(null);
    }, 800);
    
    setTimeout(() => {
      setFlipped(false);
      setAnswered(false);
      setShowExamples(true); // Reset to show examples for next card
      setAnswerFeedback(null);
    }, 1500);
  }, [card.id, onAnswer]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Spacebar to flip card
      if (e.key === ' ' && !flipped) {
        e.preventDefault();
        setFlipped(true);
      }
      // Number keys to answer (only when flipped)
      if (flipped && !answered) {
        if (e.key === '1') {
          e.preventDefault();
          handleAnswer(false);
        }
        if (e.key === '2') {
          e.preventDefault();
          handleAnswer(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [flipped, answered, handleAnswer]);

  const category = card.category || 'street';
  
  // Reset examples visibility when card changes
  useEffect(() => {
    setShowExamples(true);
    setFlipped(false);
    setAnswered(false);
    setAnswerFeedback(null);
  }, [card.id]);

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      if (!flipped) {
        setFlipped(true);
      }
    },
    onSwipedLeft: () => {
      if (flipped && !answered) {
        handleAnswer(false);
      }
    },
    onSwipedRight: () => {
      if (flipped && !answered) {
        handleAnswer(true);
      }
    },
    trackMouse: true,
    preventScrollOnSwipe: true
  });

  return (
    <motion.div 
      className="card-container"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      {...swipeHandlers}
    >
      <div className={`card ${flipped ? 'flipped' : ''} ${answerFeedback ? `answer-${answerFeedback}` : ''}`}>
        {/* Front of card */}
        <div className="card-front">
          {card.category && (
            <div 
              className="category-badge"
              style={{ background: categoryColors[category] || categoryColors.street }}
            >
              {category}
            </div>
          )}
          
          <h2 className="spanish-text">{card.spanish}</h2>
          
          <div className="card-actions">
            <button 
              onClick={() => setFlipped(true)}
              className="flip-btn glass-btn"
            >
              <span className="btn-icon">🔄</span>
              Flip to English
            </button>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="card-back">
          <h3 className="english-text">{card.english}</h3>
          <p className="context-text">{card.context}</p>
          
          {/* Examples section */}
          {card.examples && Array.isArray(card.examples) && card.examples.length > 0 && (
            <div className="examples-section">
              <button 
                onClick={() => setShowExamples(!showExamples)}
                className="examples-toggle"
                type="button"
              >
                {showExamples ? '📚 Hide' : '📖 Show'} Examples ({card.examples.length})
              </button>
              
              {showExamples && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="examples-list"
                >
                  {card.examples.map((ex, idx) => (
                    <div key={`example-${idx}`} className="example-item">
                      <p className="example-spanish">{ex.es}</p>
                      <p className="example-english">{ex.en}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
          
          {/* Answer buttons */}
          {!answered && (
            <div className="answer-buttons">
              <button 
                onClick={() => handleAnswer(false)}
                className="btn-answer btn-wrong"
                aria-label="Need practice - Press 1"
              >
                <span>😔</span>
                Need practice
              </button>
              <button 
                onClick={() => handleAnswer(true)}
                className="btn-answer btn-correct"
                aria-label="Got it - Press 2"
              >
                <span>💪</span>
                Got it!
              </button>
            </div>
          )}
          {flipped && !answered && (
            <p className="keyboard-hint">💡 Tip: Press Spacebar to flip, 1/2 to answer</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}



