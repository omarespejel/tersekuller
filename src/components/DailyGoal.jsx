import { useState, useEffect } from 'react';

export function DailyGoal({ cards }) {
  const today = new Date().toDateString();
  const dailyGoal = 10; // Review 10 cards per day
  
  const [dailyProgress, setDailyProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('tersekuller-daily');
      const data = saved ? JSON.parse(saved) : { date: today, count: 0 };
      
      // Reset if new day
      if (data.date !== today) {
        return { date: today, count: 0 };
      }
      return data;
    } catch (error) {
      return { date: today, count: 0 };
    }
  });
  
  const todayReviewed = cards.filter(c => {
    if (!c.lastSeen) return false;
    const reviewDate = new Date(c.lastSeen).toDateString();
    return reviewDate === today;
  }).length;
  
  useEffect(() => {
    const newData = { date: today, count: todayReviewed };
    setDailyProgress(newData);
    try {
      localStorage.setItem('tersekuller-daily', JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving daily progress:', error);
    }
  }, [todayReviewed, today]);
  
  const percentage = Math.min((todayReviewed / dailyGoal) * 100, 100);
  const completed = todayReviewed >= dailyGoal;
  
  return (
    <div className={`daily-goal ${completed ? 'completed' : ''}`}>
      <h4>Today's Goal {completed && '✨'}</h4>
      <div className="goal-progress">
        <div className="goal-bar">
          <div 
            className="goal-fill" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span>{todayReviewed}/{dailyGoal}</span>
      </div>
      {completed && (
        <p className="goal-message">¡Meta cumplida! Goal achieved!</p>
      )}
    </div>
  );
}

