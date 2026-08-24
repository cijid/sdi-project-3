import { useState } from "react";
import Timer from "./Timer";
import "./App.css";

function LetterSounds() {
  function letterConverter() {
    const asciiStart = 65;
    const letterIndex = Math.floor(Math.random() * 58);
    const letter = String.fromCharCode(asciiStart + letterIndex);

    if (
      letter === "[" ||
      letter === "\\" ||
      letter === "]" ||
      letter === "^" ||
      letter === "_" ||
      letter === "`"
    ) {
      return letterConverter();
    }

    return letter;
  }

  const [finalLetter, setFinalLetter] = useState(letterConverter());
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function handleLetterClick() {
    // Don't allow more clicks after 60 seconds
    if (gameOver) {
      return;
    }

    // First click starts timer
    if (!gameStarted) {
      setGameStarted(true);
    }

    const newLetter = letterConverter();
    setFinalLetter(newLetter);
  }

  return (
    <div className="letterGame-Container">
      <div className="letterGame-Header">
        <h1>Letter Sounds!</h1>
      </div>

      <div
        className="randomLetter-Container"
        onClick={handleLetterClick}
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        {gameOver ? "Time's Up!" : finalLetter}
      </div>
      <Timer when={gameStarted && !gameOver} setGameOver={setGameOver} />
    </div>
  );
}
export default LetterSounds;
