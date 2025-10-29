# TERSEKULLER

A flashcard app that teaches Mexican Spanish using spaced repetition. Built for Buse, who needs practical phrases for travel. The app remembers what you know and shows you what you don't.

## What It Does

You see a Spanish phrase. Flip the card to see the English translation. Tell the app if you got it right or wrong. Cards you know well appear less often. Cards you struggle with come back sooner. Your progress saves automatically in your browser.

The app includes 125 flashcards covering street Spanish, essential phrases, food vocabulary, emergency situations, and vegetarian-specific phrases. Each card includes context and examples showing how the phrase is used in real conversations.

## How It Works

The spaced repetition algorithm follows SM-2 principles, inspired by programs like Anki. When you answer correctly, the card waits longer before showing again. When you answer incorrectly, it returns within a day. Cards overdue for review appear first.

Visual feedback tells you immediately if you got the answer right—a green flash for correct, a red shake for wrong. Celebrations happen when you build streaks. Dobby images appear with Mexican encouragement phrases like "¡Órale, qué chingón!" when you get answers right.

## Setup

Install dependencies with Bun:

```bash
bun install
```

Start the development server:

```bash
bun dev
```

Build for production:

```bash
bun build
```

Preview the production build:

```bash
bun preview
```

## Project Structure

The app is organized simply. Components live in `src/components/`. Data lives in `src/data/`. Hooks for business logic live in `src/hooks/`.

- `FlashCard.jsx` - The main card component with flip animation
- `useSpacedRepetition.js` - Handles the spaced repetition algorithm and localStorage persistence
- `flashcards.js` - Contains all 125 phrases with Spanish, English, context, and examples
- `App.jsx` - Orchestrates components and handles answer submissions

Other components track progress: `Stats`, `DailyGoal`, `Achievements`, `ReviewSchedule`, and `ProgressSummary`. Each serves a specific purpose—showing your streak, displaying cards mastered, highlighting achievements unlocked, or visualizing your review schedule.

## Technical Details

The app uses React with Vite for fast development and small bundles. It relies on `framer-motion` for animations, `canvas-confetti` for celebrations, and `react-swipeable` for mobile gestures. Everything runs in the browser—no backend required. Progress saves to localStorage automatically.

The design uses a Berachain-inspired color palette: honey gold, bear brown, and pink accents. Cards use glassmorphism effects with backdrop blur. The interface responds to mobile and desktop screens. Touch targets meet accessibility standards—buttons are at least 44 pixels tall on mobile.

## Deployment

The app deploys as a static site. Render.com configuration exists in `render.yaml`. Push to GitHub and connect the repository to Render. The build process runs `bun build`, which outputs static files to `dist/`. Render serves these files.

## Keyboard Shortcuts

Press Spacebar to flip a card. Press 1 for "Need practice" or 2 for "Got it!" after flipping. On mobile, swipe up to flip, swipe left for wrong, swipe right for correct.

## About the Name

TERSEKULLER combines "Türk" (Turkish) and "skull" (as in studying hard), made cute with bear and honey emojis. It's built specifically for Buse, who is Turkish and learning Spanish for travel.

---

Made for Buse by Omar Espejel
