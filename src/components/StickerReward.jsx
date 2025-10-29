import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Dobby images
const dobbyImages = [
  '/images/dobby1.jpeg',
  '/images/dobby2.jpeg',
  '/images/dobby3.jpeg',
  '/images/dobby4.jpeg',
  '/images/dobby5.jpeg'
];

// Always use "¡A huevo!" for all congratulations
const encouragementText = "¡A huevo!";

export function StickerReward({ show, streak }) {
  // Use useRef to track the index and cycle through images
  const imageIndexRef = useRef(0);
  
  const [currentImage, setCurrentImage] = useState(0);
  
  useEffect(() => {
    if (show) {
      // Cycle through images instead of random
      imageIndexRef.current = (imageIndexRef.current + 1) % dobbyImages.length;
      
      const newImageIndex = imageIndexRef.current;
      
      setCurrentImage(newImageIndex);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#FFE4E1']
      });
      
      // Preload next image to ensure it's ready
      const nextIndex = (newImageIndex + 1) % dobbyImages.length;
      const img = new Image();
      img.src = dobbyImages[nextIndex];
      
      // Debug logs
      console.log('Showing reward with image:', dobbyImages[newImageIndex]);
      console.log('Image index:', newImageIndex);
    }
  }, [show]);

  // Always render but control visibility with AnimatePresence
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="sticker-reward"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="sticker-reward"
        >
          <img 
            src={dobbyImages[currentImage]} 
            alt="Celebration Dobby" 
            className="dobby-image"
            onError={(e) => {
              // Fallback if image fails to load
              e.target.src = dobbyImages[0];
            }}
          />
          <span className="encouragement-text">{encouragementText}</span>
          <span className="streak-text">¡{streak} in a row!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



