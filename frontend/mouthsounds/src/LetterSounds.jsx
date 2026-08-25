import { useState, useEffect } from "react";
import Timer from "./Timer";
import "./App.css";

function LetterSounds({ setCurrentPage }) {
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
    <div className="letterGame-Container">
      <div className="letterGame-Header">
        <h1>Letter Sounds!</h1>
      </div>
      <div
        className="randomLetter-Container"
        onClick={handleLetterClick}
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        {gameOver ? "Time's Up!" : finalLetter?.letter}
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
export default LetterSounds;
