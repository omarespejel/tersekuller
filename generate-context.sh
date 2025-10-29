#!/bin/bash
#
# Description:
# This script generates a comprehensive prompt for an LLM by concatenating key source
# files from the TERSEKULLER project, including React components, hooks, flashcard data,
# styling, and deployment configuration.
#
# Usage:
# ./generate-context.sh
#

# --- Configuration ---

# Get current date for the output filename (ISO 8601 format for best practices)
DATE=$(date '+%Y-%m-%d_%H-%M-%S_%Z')

# Output filename with descriptive name following best practices
OUTPUT_FILE="tersekuller-context-${DATE}.txt"

# --- Script Body ---

# Clean up any previous output file to start fresh
rm -f "$OUTPUT_FILE"

echo "🚀 Starting LLM prompt generation for the TERSEKULLER project..."
echo "------------------------------------------------------------"
echo "Output will be saved to: $OUTPUT_FILE"
echo ""

# 1. Add a Preamble and Goal for the LLM
echo "Adding LLM preamble and goal..."
{
  echo "# TERSEKULLER Project Context & Goal"
  echo ""
  echo "## Goal for the LLM"
  echo "You are an expert React developer and frontend architect with deep expertise in:"
  echo "- React hooks and component architecture"
  echo "- Spaced repetition algorithms for learning"
  echo "- Framer Motion animations"
  echo "- LocalStorage persistence"
  echo "- Vite build tooling"
  echo "- Bun package manager"
  echo "- Responsive design and CSS animations"
  echo "- Canvas confetti effects"
  echo "- Static site deployment (Render.com)"
  echo ""
  echo "Your task is to analyze the complete context of this TERSEKULLER flashcard app project. The system features:"
  echo "- Interactive flashcard component with flip animations"
  echo "- Spaced repetition algorithm for effective learning"
  echo "- 30+ Mexican Spanish phrases with translations and context"
  echo "- Progress tracking with localStorage persistence"
  echo "- Reward system with confetti and stickers"
  echo "- Berachain-inspired color palette (honey gold, bear brown, pink accents)"
  echo "- Responsive design for mobile and desktop"
  echo "- Vite + React architecture"
  echo ""
  echo "Please review the project structure, dependencies, source code, and configuration,"
  echo "then provide specific, actionable advice for improvement. Focus on:"
  echo "- React best practices and component architecture"
  echo "- Hook optimization and performance (useCallback, useMemo)"
  echo "- Spaced repetition algorithm accuracy and efficiency"
  echo "- Animation performance and user experience"
  echo "- LocalStorage data persistence and error handling"
  echo "- Accessibility (a11y) improvements"
  echo "- Mobile responsiveness and touch interactions"
  echo "- Code organization and maintainability"
  echo "- Build optimization and bundle size"
  echo "- Testing strategies (unit tests, integration tests)"
  echo "- Progressive Web App (PWA) capabilities"
  echo "- SEO and meta tags"
  echo ""
  echo "---"
  echo ""
} >> "$OUTPUT_FILE"

# 2. Add the project's directory structure (cleaned up)
echo "Adding cleaned directory structure..."
echo "## Directory Structure" >> "$OUTPUT_FILE"
if command -v tree &> /dev/null; then
    echo "  -> Adding directory structure (tree -L 4)"
    # Exclude common noise from the tree view
    tree -L 4 -I "node_modules|dist|.git|.DS_Store|bun.lockb|*.log" >> "$OUTPUT_FILE"
else
    echo "  -> WARNING: 'tree' command not found. Using find instead."
    echo "NOTE: 'tree' command was not found. Directory listing:" >> "$OUTPUT_FILE"
    find . -maxdepth 3 -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' | head -50 >> "$OUTPUT_FILE"
fi
echo "" >> "$OUTPUT_FILE"

# 3. Add Core Project and Configuration Files
echo "Adding core project and configuration files..."
# Core files that provide project context
CORE_FILES=(
  "README.md"
  "package.json"
  "vite.config.js"
  "index.html"
  ".gitignore"
  "render.yaml"
  "$0" # This script itself
)

for file in "${CORE_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  -> Adding $file"
    echo "## FILE: $file" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "---" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
  else
    echo "  -> WARNING: $file not found. Skipping."
  fi
done

# 4. Add all source files from src/
echo "Adding source files from src/..."

# From src/
if [ -d "src" ]; then
  echo "  -> Found src/ directory; adding its files"
  # Find all JS, JSX, CSS files
  find "src" -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.json" \) \
    -not -path "*/node_modules/*" \
    | sort | while read -r src_file; do
      echo "  -> Adding source file: $src_file"
      echo "## FILE: $src_file" >> "$OUTPUT_FILE"
      cat "$src_file" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
      echo "---" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
    done
else
  echo "  -> WARNING: src/ directory not found."
fi

# 5. Add components/ directory files
echo "Adding React components..."
if [ -d "src/components" ]; then
  find "src/components" -type f \( -name "*.js" -o -name "*.jsx" \) \
    | sort | while read -r component_file; do
      echo "  -> Adding component file: $component_file"
      echo "## FILE: $component_file" >> "$OUTPUT_FILE"
      cat "$component_file" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
      echo "---" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
    done
else
  echo "  -> No src/components directory found. Skipping."
fi

# 6. Add hooks/ directory files
echo "Adding React hooks..."
if [ -d "src/hooks" ]; then
  find "src/hooks" -type f \( -name "*.js" -o -name "*.jsx" \) \
    | sort | while read -r hook_file; do
      echo "  -> Adding hook file: $hook_file"
      echo "## FILE: $hook_file" >> "$OUTPUT_FILE"
      cat "$hook_file" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
      echo "---" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
    done
else
  echo "  -> No src/hooks directory found. Skipping."
fi

# 7. Add data/ directory files
echo "Adding data files..."
if [ -d "src/data" ]; then
  find "src/data" -type f \( -name "*.js" -o -name "*.json" \) \
    | sort | while read -r data_file; do
      echo "  -> Adding data file: $data_file"
      echo "## FILE: $data_file" >> "$OUTPUT_FILE"
      cat "$data_file" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
      echo "---" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
    done
else
  echo "  -> No src/data directory found. Skipping."
fi

# 8. Add any public/ directory files if present
echo "Adding public files..."
if [ -d "public" ]; then
  find "public" -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" -o -name "*.svg" -o -name "*.png" -o -name "*.ico" \) \
    | sort | while read -r public_file; do
      echo "  -> Adding public file: $public_file"
      echo "## FILE: $public_file" >> "$OUTPUT_FILE"
      cat "$public_file" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
      echo "---" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
    done
else
  echo "  -> No public directory found. Skipping."
fi

# 9. Add configuration files (never include .env)
echo "Adding additional configuration files..."

# Never include .env to avoid secret exposure
if [ -f ".env" ]; then
  echo "  -> WARNING: .env detected but will NOT be included to avoid exposing secrets."
fi

CONFIG_FILES=(
  ".env.example"
  ".env.local.example"
  ".prettierrc"
  ".eslintrc"
  ".eslintrc.json"
  ".eslintrc.js"
  "tsconfig.json"
  "jsconfig.json"
)

for config_file in "${CONFIG_FILES[@]}"; do
  if [ -f "$config_file" ]; then
    echo "  -> Adding config file: $config_file"
    echo "## FILE: $config_file" >> "$OUTPUT_FILE"
    cat "$config_file" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "---" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
  fi
done

# --- Completion Summary ---

echo ""
echo "-------------------------------------"
echo "✅ Prompt generation complete!"
echo "Generated on: $(date '+%A, %B %d, %Y at %I:%M:%S %p %Z')"
echo ""
echo "This context file now includes:"
echo "  ✓ A clear goal and preamble for the LLM"
echo "  ✓ A cleaned project directory structure"
echo "  ✓ Core project files (README.md, package.json, vite.config.js)"
echo "  ✓ Configuration files (.gitignore, render.yaml, index.html)"
echo "  ✓ This generation script itself"
echo "  ✓ All React source code from src/ (App.jsx, main.jsx)"
echo "  ✓ React components from src/components/ (FlashCard, StickerReward, ProgressBar)"
echo "  ✓ React hooks from src/hooks/ (useSpacedRepetition)"
echo "  ✓ Data files from src/data/ (flashcards.js)"
echo "  ✓ Styling files (App.css)"
echo "  ✓ Public assets (if present)"
echo "  ✓ Additional configuration files"
echo ""
echo "File size: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo "Total lines: $(wc -l < "$OUTPUT_FILE" | xargs)"
echo ""
echo "You can now use the content of '$OUTPUT_FILE' as a context prompt for your LLM."
echo "Perfect for getting comprehensive code reviews, architecture advice, or feature suggestions!"
echo ""
echo "💡 Tip: This is especially useful for:"
echo "   - React component optimization and refactoring"
echo "   - Hook performance improvements (useCallback, useMemo)"
echo "   - Spaced repetition algorithm enhancements"
echo "   - Animation and UX improvements"
echo "   - Accessibility (a11y) enhancements"
echo "   - Mobile responsiveness optimization"
echo "   - Build size and performance optimization"
echo "   - Testing strategy recommendations"
echo "   - PWA implementation suggestions"
echo ""
echo "🎯 Key areas to focus on:"
echo "   - Spaced repetition algorithm accuracy (interval calculation, due date logic)"
echo "   - Component re-render optimization"
echo "   - LocalStorage error handling and data migration"
echo "   - Animation performance (Framer Motion)"
echo "   - Accessibility (keyboard navigation, screen readers)"
echo "   - Mobile touch interactions (swipe gestures)"
echo "   - Bundle size optimization"
echo "   - Progressive Web App features (offline support, installability)"
echo ""


