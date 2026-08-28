import { useState, useEffect } from "react";
import Timer from "./Timer";
import "./styles/gamestyleparent.css";

function LetterSoundsParent({ setCurrentPage, selectedChild }) {
  const [letterList, setLetterList] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [letterHistory, setLetterHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  // Load letters from API
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
      })
      .catch((err) => {
        console.error("Failed to load letters:", err);
      });
  }, []);

  // Finish session when timer ends
  useEffect(() => {
    if (!gameOver || !sessionId) {
      return;
    }

    fetch(`http://localhost:8081/practice-sessions/${sessionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score: score,
        ended_at: new Date().toISOString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Session completed:", data);
      })
      .catch((err) => {
        console.error("Failed to complete session:", err);
      });
  }, [gameOver, sessionId, score]);

  async function createSession() {
    try {
      const response = await fetch("http://localhost:8081/practice-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          child_id: selectedChild.id,
          activity_type: "lettersounds",
          mode: "parent",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create practice session");
      }

      const data = await response.json();

      setSessionId(data.id);

      return data.id;
    } catch (err) {
      console.error("Session creation error:", err);
      return null;
    }
  }

  async function saveAttempt(letter, activeSessionId) {
    const response = await fetch("http://localhost:8081/practice-attempts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: activeSessionId,
        letter_sound_id: letter.id,
        is_correct: true,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save practice attempt");
    }

    return await response.json();
  }

  function randomLetter() {
    if (letterList.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * letterList.length);
    return letterList[randomIndex];
  }

  async function ensureSession() {
    if (sessionId) {
      return sessionId;
    }

    return await createSession();
  }

  async function handleNext() {
    if (gameOver) {
      return;
    }

    if (!gameStarted) {
      setGameStarted(true);
    }

    const activeSessionId = await ensureSession();

    if (!activeSessionId) {
      return;
    }

    // Move forward through existing history
    if (currentIndex < letterHistory.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setScore((prevScore) => prevScore + 1);
      return;
    }

    if (currentLetter) {
      await saveAttempt(currentLetter, activeSessionId);
    }
    // Generate new letter
    const newLetter = randomLetter();

    if (newLetter) {
      setLetterHistory((prevHistory) => [...prevHistory, newLetter]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setScore((prevScore) => prevScore + 1);
    }
  }

  async function handlePrevious() {
    if (gameOver) {
      return;
    }

    if (!gameStarted) {
      setGameStarted(true);
    }

    const activeSessionId = await ensureSession();

    if (!activeSessionId) {
      return;
    }

    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setScore((prevScore) => prevScore - 1);
    }
  }

  const currentLetter = letterHistory[currentIndex];

  return (
    <div className="page-container">
      <div className="page-card">
        <header className="mb-10 text-center">
          <h1 className="page-title">Letter Sounds! - Parent Mode</h1>
        </header>

        <div
          className={`game-letter ${
            gameOver ? "text-5xl whitespace-nowrap" : "text-8xl"
          }`}
        >
          {gameOver ? "Time's Up!" : currentLetter?.letter}
        </div>

        {!gameOver && (
          <div className="gameNavigationRow">
            <button
              className="navButton prevButton"
              onClick={handlePrevious}
              disabled={currentIndex <= 0}
            >
              Previous
            </button>

            <button className="navButton nextButton" onClick={handleNext}>
              Next
            </button>
          </div>
        )}
        <br />
        <div className="grid justify-items-center gap-5">
          <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
            <span>Timer:</span>
            <Timer when={gameStarted && !gameOver} setGameOver={setGameOver} />
          </div>

          <div className="flex items-center gap-2 text-lg font-semibold text-slate-700">
            <p>Score: {score}</p>
          </div>
        </div>

        {gameOver && (
          <div className="grid justify-items-center gap-5">
            <button
              className="secondary-button"
              onClick={() => setCurrentPage("home")}
            >
              Back to Main Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LetterSoundsParent;
