import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// Dobby images - stored in public/images/
const dobbyImages = [
  '/images/dobby1.jpeg',
  '/images/dobby2.jpeg',
  '/images/dobby3.jpeg',
  '/images/dobby4.jpeg',
  '/images/dobby5.jpeg'
];

const encouragementTexts = [
  "¡Órale, qué chingón!",
  "¡A huevo!",
  "¡Eso mera!",
  "¡Échale ganas!",
  "¡Rifaste!"
];

export function StickerReward({ show, streak }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  
  useEffect(() => {
    if (show) {
      // Randomize dobby image and text
      setCurrentImage(Math.floor(Math.random() * dobbyImages.length));
      setCurrentText(Math.floor(Math.random() * encouragementTexts.length));
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#FFE4E1']
      });
    }
  }, [show]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="sticker-reward"
    >
      <img 
        src={dobbyImages[currentImage]} 
        alt="Celebration Dobby" 
        className="dobby-image"
      />
      <span className="encouragement-text">{encouragementTexts[currentText]}</span>
      <span className="streak-text">¡{streak} in a row!</span>
    </motion.div>
  );
}



