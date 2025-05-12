// Trie data structure for efficient word lookup
export interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = {
      children: new Map(),
      isEndOfWord: false,
    };
  }

  // Insert a word into the trie
  insert(word: string): void {
    let currentNode = this.root;

    // Handle special case for Boggle where 'Qu' is a single tile
    const processedWord = word.toLowerCase().replace(/qu/g, "q");

    for (const char of processedWord) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, {
          children: new Map(),
          isEndOfWord: false,
        });
      }
      currentNode = currentNode.children.get(char)!;
    }

    // Mark the end of the word
    currentNode.isEndOfWord = true;
  }
  // Check if the word exists in the trie
  search(word: string): boolean {
    let currentNode = this.root;

    // Handle special case for Boggle where 'Qu' is a single tile
    const processedWord = word.toLowerCase().replace(/qu/g, "q");

    for (const char of processedWord) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char)!;
    }

    return currentNode.isEndOfWord;
  }

  // Check if there is any word in the trie that starts with the given prefix
  startsWith(prefix: string): boolean {
    let currentNode = this.root;

    // Handle special case for Boggle where 'Qu' is a single tile
    const processedPrefix = prefix.toLowerCase().replace(/qu/g, "q");

    for (const char of processedPrefix) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char)!;
    }

    return true;
  }

  // Build a trie from a set of words
  static fromWordSet(wordSet: Set<string>): Trie {
    const trie = new Trie();
    for (const word of wordSet) {
      trie.insert(word);
    }
    return trie;
  }
}
