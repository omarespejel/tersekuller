export function ReviewSchedule({ cards }) {
  const now = Date.now();
  const DAY_MS = 24 * 60 * 60 * 1000;
  
  const schedule = {
    overdue: 0,
    today: 0,
    tomorrow: 0,
    thisWeek: 0,
    later: 0
  };
  
  cards.forEach(card => {
    if (!card.lastSeen) {
      // Never seen = due today
      schedule.today++;
      return;
    }
    
    const nextReview = card.lastSeen + (card.interval * DAY_MS);
    const daysUntilDue = Math.floor((nextReview - now) / DAY_MS);
    
    if (daysUntilDue < 0) schedule.overdue++;
    else if (daysUntilDue === 0) schedule.today++;
    else if (daysUntilDue === 1) schedule.tomorrow++;
    else if (daysUntilDue <= 7) schedule.thisWeek++;
    else schedule.later++;
  });
  
  return (
    <>
      <div className="review-schedule">
        {schedule.overdue > 0 && (
          <div className="schedule-item overdue">
            <span className="schedule-icon">🚨</span>
            <span className="schedule-count">{schedule.overdue}</span>
            <span className="schedule-label">overdue</span>
          </div>
        )}
        
        {schedule.today > 0 && (
          <div className="schedule-item today">
            <span className="schedule-icon">📚</span>
            <span className="schedule-count">{schedule.today}</span>
            <span className="schedule-label">due today</span>
          </div>
        )}
        
        {schedule.tomorrow > 0 && (
          <div className="schedule-item tomorrow">
            <span className="schedule-icon">📅</span>
            <span className="schedule-count">{schedule.tomorrow}</span>
            <span className="schedule-label">tomorrow</span>
          </div>
        )}
        
        {schedule.thisWeek > 0 && (
          <div className="schedule-item week">
            <span className="schedule-icon">📆</span>
            <span className="schedule-count">{schedule.thisWeek}</span>
            <span className="schedule-label">this week</span>
          </div>
        )}
      </div>
      
      {/* Explanation section */}
      <div className="schedule-explanation">
        <details className="explanation-details">
          <summary>What do these mean? 🤔</summary>
          <div className="explanation-content">
            <div className="explanation-item">
              <strong>🚨 Overdue:</strong> Cards you should have reviewed earlier. 
              Review these first - they're at risk of being forgotten!
            </div>
            <div className="explanation-item">
              <strong>📚 Due today:</strong> Cards scheduled for review today. 
              These are ready for practice to strengthen your memory.
            </div>
            <div className="explanation-item">
              <strong>📅 Tomorrow:</strong> Cards that will be ready for review tomorrow. 
              Come back then to keep them fresh!
            </div>
            <div className="explanation-item">
              <strong>📆 This week:</strong> Cards scheduled for review in the next 2-7 days. 
              The algorithm spaces these out based on your performance.
            </div>
          </div>
        </details>
      </div>
    </>
  );
}

