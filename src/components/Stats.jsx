export function Stats({ cards, streak }) {
  // Cards reviewed in the last 24 hours
  const today = cards.filter(c => 
    c.lastSeen && Date.now() - c.lastSeen < 86400000
  ).length;
  
  // Cards with difficulty >= 3 (reviewed successfully 3+ times)
  const mastered = cards.filter(c => c.difficulty >= 3).length;
  const total = cards.length;

  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-icon">📚</span>
        <span className="stat-label">Today</span>
        <span className="stat-value">{today}</span>
        <span className="stat-tooltip">Cards you've practiced in the last 24 hours</span>
      </div>
      
      <div className="stat-item">
        <span className="stat-icon">🔥</span>
        <span className="stat-label">Streak</span>
        <span className="stat-value">{streak}</span>
        <span className="stat-tooltip">Correct answers in a row</span>
      </div>
      
      <div className="stat-item">
        <span className="stat-icon">⭐</span>
        <span className="stat-label">Mastered</span>
        <span className="stat-value">{mastered}/{total}</span>
        <span className="stat-tooltip">Cards you know well (3+ correct reviews)</span>
      </div>
    </div>
  );
}

