import { useCallback, useEffect, useState } from "react";
import "./App.css";
import words from "./wordList.json";
import HandmanDrawing from "./HandmanDrawing";
import HandmanWord from "./HandmanWord";
import Keyboard from "./Keyboard";
import Snow from "./Snow";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}
function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  
  const isLoser = incorrectLetters.length >= 6
    const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;

    setGuessedLetters((currentLetters) => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== 'Enter') return;

      e.preventDefault()
      setGuessedLetters([])
  setWordToGuess(getWord()) 
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };

  }, [])
  return (
    <div className="main">
   <Snow />
      <div className="lose">
        {isWinner && 'Winner!  - Refresh to try again'}
        {isLoser && 'Nice try - Refresh to try again'}
      </div>
      <HandmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HandmanWord reveal={isLoser} 
      guessedLetters={guessedLetters} 
      wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
        disabled={isWinner || isLoser }
         activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters = {incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
