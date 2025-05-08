# GitHub Copilot Project Prompt

We are building a React + TypeScript Boggle game app.

The project structure includes:

- Components: Board, Tile, Timer, Score, WordList, Controls
- Hook: useBoggle
- Utility: generate random 4x4 letter grid or accept a preset grid
- Word validation: uses a provided list of English words loaded from `public/words.txt`

The app supports:
✅ Random grid generation or injecting a preset 4x4 matrix  
✅ Tracking user-selected paths  
✅ Validating words against the word list (must be ≥3 letters)  
✅ Scoring based on Boggle rules  
✅ A 3-minute countdown timer

---

### Copilot Instructions

✅ Use **Tailwind CSS** for all styling, including:

- Board layout grid
- Tile appearance (selected vs. unselected)
- Timer, score, word list, and controls

✅ Write unit tests for:

- `useBoggle` hook (especially `submitWord` logic)
- `generateGrid` utility
- Word selection and validation logic

✅ Add a `solveBoard` function that finds all valid words on the current grid using the word list.

✅ Add animations or visual effects when:

- A word is successfully submitted.
- The timer reaches 0.
- The board resets.

✅ Add a post-game results summary showing:

- All possible words on the board.
- Which words the player found.
- Missed words.

## Theme tailwind variablesBackground:

Background:

from-blue-500 - Medium blue for gradient start
to-indigo-600 - Deeper indigo for gradient end

Text colors:

text-white - White text for the main content
text-blue-900 - Dark blue text for buttons and card content
text-white/70 - White with 70% opacity for footer

Button:

bg-yellow-400 - Yellow background for the Start Game button
text-blue-900 - Dark blue text for the button

Cards:

bg-white - White background for the feature cards
text-blue-900 - Dark blue text for the card content

---

### Technical Notes

- Use React functional components and hooks.
- Use TypeScript for all code.
- Use **Tailwind CSS** for styling (do not use plain CSS or CSS modules).
