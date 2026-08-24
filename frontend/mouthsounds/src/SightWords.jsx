import { useState, useEffect } from "react";
import Timer from "./Timer";

function SightWords({ setCurrentPage }) {
  const [wordList, setWordList] = useState([]);
  const [word, setWord] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/sightwords")
      .then((res) => res.json())
      .then((data) => {
        setWordList(data);

        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          setWord(data[randomIndex]);
        }
      });
  }, []);

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
    <div className="letterGame-Container">
      <div className="letterGame-Header">
        <h1>Sight Words!</h1>
      </div>

      <div
        className="randomLetter-Container"
        onClick={handleWordClick}
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        {gameOver ? "Time's Up!" : word?.word}
      </div>

      <Timer when={gameStarted && !gameOver} setGameOver={setGameOver} />

      {gameOver && (
        <button onClick={() => setCurrentPage("home")}>
          Back to Main Menu
        </button>
      )}
    </div>
  );
}

export default SightWords;
