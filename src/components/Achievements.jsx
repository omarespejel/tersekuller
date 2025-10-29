import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Achievements({ cards, streak }) {
  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('tersekuller-achievements');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });
  
  const [newAchievement, setNewAchievement] = useState(null);
  
  const achievements = [
    { 
      id: 'first', 
      icon: '🌟', 
      title: '¡Primera vez!', 
      desc: 'First correct answer', 
      condition: () => cards.some(c => c.difficulty > 0) 
    },
    { 
      id: 'streak5', 
      icon: '🔥', 
      title: '¡Cinco seguidas!', 
      desc: '5 in a row', 
      condition: () => streak >= 5 
    },
    { 
      id: 'streak10', 
      icon: '💎', 
      title: '¡Diez perfectas!', 
      desc: '10 in a row', 
      condition: () => streak >= 10 
    },
    { 
      id: 'master5', 
      icon: '📚', 
      title: '¡Cinco dominadas!', 
      desc: 'Master 5 cards', 
      condition: () => cards.filter(c => c.difficulty >= 3).length >= 5 
    },
    { 
      id: 'master10', 
      icon: '🎓', 
      title: '¡Diez maestría!', 
      desc: 'Master 10 cards', 
      condition: () => cards.filter(c => c.difficulty >= 3).length >= 10 
    },
    { 
      id: 'halfway', 
      icon: '🌮', 
      title: '¡A la mitad!', 
      desc: '50% mastered', 
      condition: () => cards.filter(c => c.difficulty >= 3).length >= 15 
    },
    { 
      id: 'complete', 
      icon: '🏆', 
      title: '¡Chingona total!', 
      desc: '100% mastered', 
      condition: () => cards.filter(c => c.difficulty >= 3).length === 30 
    }
  ];
  
  useEffect(() => {
    achievements.forEach(achievement => {
      if (achievement.condition() && !unlockedAchievements.includes(achievement.id)) {
        setNewAchievement(achievement);
        setUnlockedAchievements(prev => {
          const updated = [...prev, achievement.id];
          try {
            localStorage.setItem('tersekuller-achievements', JSON.stringify(updated));
          } catch (error) {
            console.error('Error saving achievements:', error);
          }
          return updated;
        });
        
        // Hide after 3 seconds
        setTimeout(() => setNewAchievement(null), 3000);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, streak]);
  
  return (
    <AnimatePresence>
      {newAchievement && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="achievement-popup"
        >
          <span className="achievement-icon">{newAchievement.icon}</span>
          <div>
            <strong>{newAchievement.title}</strong>
            <p>{newAchievement.desc}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

