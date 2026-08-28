import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

function SightWords({ setCurrentPage, gradeLevel }) {
  const navigate = useNavigate();
  const [wordList, setWordList] = useState([]);
  const [word, setWord] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8081/sightwords?gradelevel=${gradeLevel}`)
      .then((res) => res.json())
      .then((data) => {
        setWordList(data);

        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setWord(data[randomIndex]);
        }
      });
  }, [gradeLevel]);

  function handleWordClick() {
    // Don't allow more clicks after 60 seconds
    if (gameOver) {
      return;
    }

    // First click starts timer
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (wordList.length > 0) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      setWord(wordList[randomIndex]);
    }
  }

  return (
    <div className="page-container">
      <div className="page-card">
        <header className="mb-10 text-center">
          <h1 className="page-title">Sight Words!</h1>
        </header>
        <div className="grid justify-items-center gap-5">
          <div
            className={`game-letter ${
              gameOver ? "text-5xl whitespace-nowrap" : "text-8xl"
            }`}
            onClick={handleWordClick}
          >
            {gameOver ? "Time's Up!" : word?.word}
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

export default SightWords;
