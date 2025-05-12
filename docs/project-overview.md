# Boggle Game Project Overview

## Project Summary

This is a React + TypeScript implementation of the classic word game Boggle. In Boggle, players try to find as many words as possible on a 4×4 grid of letters within a time limit. Words are formed by tracing paths through adjacent letters.

## Core Features

- **Dynamic Grid Generation**: Randomly generates a playable 4×4 Boggle board using the official dice configuration
- **Custom Grid Support**: Allows injecting a preset grid for testing or specific gameplay scenarios
- **Word Validation**: Validates player words against a comprehensive English word list
- **Path Tracking**: Tracks and visualizes the player's letter selection path on the board
- **Scoring System**: Implements official Boggle scoring rules based on word length
- **Timed Gameplay**: Features a 3-minute countdown timer for authentic gameplay
- **Results Analysis**: Shows a post-game summary of all possible words, found words, and missed opportunities
- **Electric Animations**: Provides satisfying visual feedback with electric animations when words are correctly identified
- **Page Routing**: Features dedicated landing, gameplay, and results pages with smooth transitions
- **Classic Boggle Theme**: Implements a classic Boggle aesthetic with a blue and yellow color scheme

## Technical Architecture

### Component Structure

The application follows a clean component-based architecture:

- **Board.tsx**: Main game board that displays the 4×4 grid of letters
- **Tile.tsx**: Individual letter tiles that respond to user interaction
- **Timer.tsx**: Countdown timer component that triggers game end
- **Score.tsx**: Displays and updates the player's current score
- **WordList.tsx**: Shows the player's found valid words
- **Controls.tsx**: Game control buttons (new game, show solution, etc.)
- **Results.tsx**: End-game summary with statistics and word analysis

### Custom Hooks

- **useBoggle.ts**: Central game logic hook that manages:
  - Game state
  - Word selection and validation
  - Scoring
  - Path tracking
- **useWordList.ts**: Hook for loading and accessing the dictionary of valid words

### Core Utilities

- **gridUtils.ts**: Contains essential grid manipulation functions:
  - `generateGrid`: Creates a random board following official Boggle dice patterns
  - `solveBoard`: Uses DFS algorithm to find all valid words on a given board
  - `calculateScore`: Scores words according to Boggle rules
  - Helper functions for position validation, adjacency checking, etc.

## Key Algorithm: Board Solving with DFS and Trie Optimization

The `solveBoard` function implements a **Depth-First Search (DFS)** algorithm optimized with a **Trie** data structure to efficiently find all valid words on the Boggle board:

1. **Initialization**:

   - Creates a Trie data structure from the dictionary for efficient prefix checking
   - Starts from each cell in the grid as a potential starting point
   - Maintains a visited matrix to prevent reusing letters

2. **Optimized Recursive Exploration**:

   - For each starting position, explores all possible paths by recursively visiting adjacent cells
   - Builds up word candidates letter by letter as it traverses the grid
   - **Early Pruning**: Uses the Trie to check if the current prefix can form any valid word
   - Immediately stops exploring paths that cannot lead to valid words

3. **Backtracking**:

   - After exploring a path, marks cells as unvisited to allow them to be used in other word paths
   - This ensures all possible valid letter combinations are checked

4. **Word Collection**:
   - Adds valid words (3+ letters) to a result set as they're discovered
   - Returns a deduplicated list of all found words at the end

This optimized algorithm significantly improves performance by pruning invalid search paths early, especially for large dictionaries and complex board configurations.

## Styling and User Experience

The application is styled entirely with **Tailwind CSS** for:

- Responsive grid layout
- Visual feedback for selected/unselected tiles
- Animations for successful word submissions
- Timer visualization
- Game state transitions

## Development Approach

- **TypeScript** for type safety and better developer experience
- **React Functional Components** with hooks for state management
- **Vite** for fast development and optimized builds

## Technical Challenges and Solutions

1. **Efficient Word Validation**:

   - Challenge: Checking words against a large dictionary quickly
   - Solution: Using Set data structure for O(1) lookups and Trie data structure for efficient prefix checking

2. **Path Validation**:

   - Challenge: Ensuring selected letters form a valid path
   - Solution: Adjacency checking between consecutive positions

3. **"Qu" Special Case**:

   - Challenge: Handling the special case where Q is always followed by U in Boggle
   - Solution: Custom letter handling in the grid generation and scoring logic

4. **Board Generation**:

   - Challenge: Creating boards with good letter distribution
   - Solution: Implementing the official Boggle dice configuration rather than random letters

5. **Finding All Solutions**:

   - Challenge: Efficiently finding all possible words on the board
   - Solution: Optimized DFS algorithm with Trie-based prefix checking for early pruning of invalid paths

6. **Performance Optimization**:
   - Challenge: Reducing computation time when solving large boards or using extensive dictionaries
   - Solution: Implementing a Trie data structure that allows for immediate rejection of invalid word prefixes
