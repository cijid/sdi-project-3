import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";
import "./index.css";

function LetterSounds({ setCurrentPage }) {
  const navigate = useNavigate();
  const [letterList, setLetterList] = useState([]);
  const [finalLetter, setFinalLetter] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/lettersounds")
      .then((res) => res.json())
      .then((data) => {
        setLetterList(data);

        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setFinalLetter(data[randomIndex]);
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

  function handleLetterClick() {
    // Don't allow more clicks after 60 seconds
    if (gameOver) {
      return;
    }

    // First click starts timer
    if (!gameStarted) {
      setGameStarted(true);
    }

    const newLetter = randomLetter();

    if (newLetter) {
      setFinalLetter(newLetter);
    }
  }

  return (
    <div className="page-container">
      <div className="page-card">
        <header className="mb-10 text-center">
          <h1 className="page-title">Letter Sounds!</h1>
        </header>

        <div className="grid justify-items-center gap-5">
          <div
            className={`game-letter ${
              gameOver ? "text-5xl whitespace-nowrap" : "text-8xl"
            }`}
            onClick={handleLetterClick}
          >
            {gameOver ? "Time's Up!" : finalLetter?.letter}
          </div>

          <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
            <span>Timer:</span>
            <Timer when={gameStarted && !gameOver} setGameOver={setGameOver} />
          </div>

          {gameOver && (
            <button className="secondary-button" onClick={() => navigate("/")}>
              Back to Main Menu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default LetterSounds;
