export function ProgressBar({ progress, total }) {
  const percentage = (progress / total) * 100;

  return (
    <div className="progress">
      <span>{progress}/{total} mastered</span>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}



