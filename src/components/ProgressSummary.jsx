export function ProgressSummary({ cards }) {
  const total = cards.length;
  const neverSeen = cards.filter(c => !c.lastSeen).length;
  const learning = cards.filter(c => c.difficulty > 0 && c.difficulty < 3).length;
  const mastered = cards.filter(c => c.difficulty >= 3).length;
  
  return (
    <div className="progress-summary">
      <h3>Your Learning Journey 🗺️</h3>
      <div className="journey-stages">
        <div className="stage new">
          <div className="stage-bar" style={{ width: `${(neverSeen/total) * 100}%` }}>
            {neverSeen > 0 && <span>{neverSeen}</span>}
          </div>
          <label>New</label>
        </div>
        <div className="stage learning">
          <div className="stage-bar" style={{ width: `${(learning/total) * 100}%` }}>
            {learning > 0 && <span>{learning}</span>}
          </div>
          <label>Learning</label>
        </div>
        <div className="stage mastered">
          <div className="stage-bar" style={{ width: `${(mastered/total) * 100}%` }}>
            {mastered > 0 && <span>{mastered}</span>}
          </div>
          <label>Mastered</label>
        </div>
      </div>
      <div className="journey-explanation">
        <p><strong>New:</strong> Haven't seen yet</p>
        <p><strong>Learning:</strong> Reviewed 1-2 times</p>
        <p><strong>Mastered:</strong> Know it well (3+ reviews)</p>
      </div>
    </div>
  );
}

