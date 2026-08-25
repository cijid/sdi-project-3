import { useState, useEffect } from "react";
import Timer from "./Timer";
import "./App.css";

function LetterSounds({ setCurrentPage, selectedChild }) {
  const [letterList, setLetterList] = useState([]);
  const [finalLetter, setFinalLetter] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [letterHistory, setLetterHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8081/lettersounds")
      .then((res) => res.json())
      .then((data) => {
        setLetterList(data);

        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const firstLetter = data[randomIndex];

          setLetterHistory([firstLetter]);
          setCurrentIndex(0);
        }
      });
  }, []);

  function randomLetter() {
    if (letterList.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * letterList.length);
    console.log(letterList);
    return letterList[randomIndex];
  }

  function handleNext() {
    // Don't allow more clicks after 60 seconds
    if (gameOver) {
      return;
    }

    // First click starts timer
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (currentIndex < letterHistory.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setScore(score + 1);
      return;
    }

    const newLetter = randomLetter();

    if (newLetter) {
      setLetterHistory([...letterHistory, newLetter]);
      setCurrentIndex(currentIndex + 1);
      setScore(score + 1);
    }
  }

  function handlePrevious() {
    if (gameOver) {
      return;
    }

    // First click starts timer
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setScore(score - 1);
    }
  }

  const currentLetter = letterHistory[currentIndex];

  return (
    <div className="letterGame-Container">
      <div className="letterGame-Header">
        <h1>Parent Mode</h1>
      </div>

      <div
        className="randomLetter-Container"
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        {gameOver ? "Time's Up!" : currentLetter?.letter}
      </div>

      {!gameOver && (
        <div>
          <button onClick={handlePrevious} disabled={currentIndex <= 0}>
            Previous
          </button>

          <button onClick={handleNext}>Next</button>
        </div>
      )}

      <Timer when={gameStarted && !gameOver} setGameOver={setGameOver} />
      <div className="scoreboard">
        <p>Score: {score}</p>
      </div>

      {gameOver && (
        <button onClick={() => setCurrentPage("home")}>
          Back to Main Menu
        </button>
      )}
    </div>
  );
}
export default LetterSounds;
