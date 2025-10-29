# 🐻 TERSEKULLER 🍯

A cute flashcard app for learning Mexican Spanish phrases, built with React and Vite.

## Features

- 📚 30+ Mexican Spanish phrases
- 🧠 Spaced repetition algorithm for effective learning
- 🎨 Beautiful Berachain-inspired design (honey & bear colors)
- ✨ Cute animations and confetti rewards
- 💾 Local storage for progress tracking
- 📱 Responsive design

## Quick Setup

```bash
# Install dependencies
bun install

# Start development server
bun run dev
# or simply: bun dev

# Build for production
bun run build
# or simply: bun build

# Preview production build
bun run preview
# or simply: bun preview
```

## Project Structure

```
tersekuller/
├── src/
│   ├── components/
│   │   ├── FlashCard.jsx      # Main flashcard component with flip animation
│   │   ├── StickerReward.jsx  # Celebration rewards with confetti
│   │   └── ProgressBar.jsx    # Progress indicator
│   ├── data/
│   │   └── flashcards.js      # Static Mexican Spanish phrases
│   ├── hooks/
│   │   └── useSpacedRepetition.js  # Spaced repetition algorithm
│   ├── App.jsx                # Main app component
│   ├── App.css                # Styling with Berachain colors
│   └── main.jsx               # Entry point
├── package.json
├── vite.config.js
└── render.yaml                 # Render.com deployment config
```

## How It Works

1. **Flashcards**: See a Spanish phrase, flip to see the English translation
2. **Spaced Repetition**: Cards you know appear less frequently, cards you struggle with appear more often
3. **Progress Tracking**: Your progress is saved locally in your browser
4. **Rewards**: Get cute stickers and confetti when you get answers right!

## Spaced Repetition Algorithm

The app uses a simple but effective spaced repetition algorithm:
- Correct answers: Double the interval (max 30 days)
- Wrong answers: Reset to 1 day
- Priority given to cards that are due for review

## Deployment

The app is configured for deployment on Render.com. Simply push to GitHub and connect your repository to Render.

## Made with ❤️

Created by Omar Espejel for Buse

