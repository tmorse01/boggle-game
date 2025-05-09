# Boggle Game

A React + TypeScript implementation of the classic word-finding game Boggle.

![Boggle Game Screenshot](https://taylor-boggle.netlify.app/screenshot1.png)

## 🎮 Play Now

[Live Demo](https://taylor-boggle.netlify.app/)

## 📋 Overview

In this implementation of Boggle, players try to find as many words as possible on a randomly generated 4×4 grid of letters. Words must be formed by connecting adjacent letters (horizontally, vertically, or diagonally) without reusing the same letter tile. The game follows official Boggle rules with a 3-minute time limit and standard scoring.

## ✨ Features

- 🎲 Random board generation using the official Boggle dice configuration
- 🔍 Word validation against a comprehensive English dictionary
- ⏱️ 3-minute countdown timer
- 📊 Scoring based on official Boggle rules
- 👆 Interactive letter selection with path visualization
- 📱 Responsive design using Tailwind CSS
- 📋 End-game summary showing all possible words, found words, and missed opportunities

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tmorse01/boggle-game.git
   cd boggle-game
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## 🎮 How to Play

1. When the game starts, you'll see a 4×4 grid of random letters.
2. Find words by clicking on adjacent letters to form paths.
3. Words must be at least 3 letters long.
4. You cannot use the same letter cube more than once in a word.
5. Submit a word by clicking the "Submit" button or pressing Enter.
6. The timer will count down from 3 minutes.
7. When time expires, you'll see a summary of your performance.

## 📏 Scoring

- 3-4 letters: 1 point
- 5 letters: 2 points
- 6 letters: 3 points
- 7 letters: 5 points
- 8+ letters: 11 points

## 🧰 Tech Stack

- **React**: Front-end library for building the user interface
- **TypeScript**: For type safety and improved developer experience
- **Tailwind CSS**: For styling the application
- **Vite**: For fast development and optimized builds

## 🧪 Running Tests

```bash
npm run test
# or
yarn test
```

## 📚 Project Structure

```
src/
├── components/       # React components
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── assets/          # Static assets
```

### Key Components

- **Board**: Renders the 4×4 grid of letter tiles
- **Tile**: Individual interactive letter tiles
- **Timer**: Countdown timer component
- **Score**: Displays the current score
- **WordList**: Shows valid words found by the player
- **Controls**: Game control buttons
- **Results**: End-game summary with statistics

### Algorithm

The game uses a Depth-First Search (DFS) algorithm in the `solveBoard` function to find all possible words on the board. See our [technical documentation](./docs/project-overview.md) for more details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Original Boggle game by Parker Brothers/Hasbro
- Word list sourced from [Collins Scrabble Words](https://boardgames.stackexchange.com/questions/38366/latest-collins-scrabble-words-list-in-text-file)
