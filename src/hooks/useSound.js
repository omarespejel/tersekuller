export function useSound() {
  const playCorrect = () => {
    try {
      const audio = new Audio('/sounds/correct.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Silently fail if sound file doesn't exist
      });
    } catch (error) {
      // Silently fail if audio not available
    }
  };
  
  const playWrong = () => {
    try {
      const audio = new Audio('/sounds/wrong.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (error) {
      // Silently fail
    }
  };
  
  const playFlip = () => {
    try {
      const audio = new Audio('/sounds/flip.mp3');
      audio.volume = 0.2;
      audio.play().catch(() => {});
    } catch (error) {
      // Silently fail
    }
  };
  
  return { playCorrect, playWrong, playFlip };
}

