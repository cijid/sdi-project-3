import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

function SightWordsParent({ selectedChild, gradeLevel }) {
  const navigate = useNavigate();
  const [wordList, setWordList] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wordHistory, setWordHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/sightwords?gradelevel=${gradeLevel}`)
      .then((res) => res.json())
      .then((data) => {
        setWordList(data);

        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const firstWord = data[randomIndex];

          setWordHistory([firstWord]);
          setCurrentIndex(0);
        }
      })
      .catch((err) => {
        console.error("Failed to load sight words:", err);
      });
  }, [gradeLevel]);

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
        console.log("Sight word session completed:", data);
      })
      .catch((err) => {
        console.error("Failed to complete sight word session:", err);
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
          activity_type: "sightwords",
          mode: "parent",
          gradelevel: gradeLevel,
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

  async function saveAttempt(word, activeSessionId) {
    try {
      const response = await fetch("http://localhost:8081/practice-attempts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: activeSessionId,
          sight_word_id: word.id,
          is_correct: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save sight word attempt");
      }

      return await response.json();
    } catch (err) {
      console.error("Attempt save error:", err);
      return null;
    }
  }

  async function ensureSession() {
    if (sessionId) {
      return sessionId;
    }

    return await createSession();
  }

  function randomWord() {
    if (wordList.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
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

    if (currentWord) {
      await saveAttempt(currentWord, activeSessionId);
    }

    if (currentIndex < wordHistory.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setScore((prevScore) => prevScore + 1);
      return;
    }

    const newWord = randomWord();

    if (newWord) {
      setWordHistory((prevHistory) => [...prevHistory, newWord]);

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

  const currentWord = wordHistory[currentIndex];

  return (
    <div className="page-container">
      <div className="page-card">
        <header className="mb-10 text-center">
          <h1 className="page-title">Sight Words! - Parent Mode</h1>
        </header>
        {!gameOver && (
          <div className="mt-6 flex w-full items-center justify-between">
            <button
              className="parent-mode-button"
              onClick={handlePrevious}
              disabled={currentIndex <= 0}
            >
              Previous
            </button>

            <button className="parent-mode-button" onClick={handleNext}>
              Next
            </button>
          </div>
        )}
        <div
          className={`game-letter ${
            gameOver ? "text-5xl whitespace-nowrap" : "text-8xl"
          }`}
        >
          {gameOver ? "Time's Up!" : currentWord?.word}
        </div>

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
            <button className="secondary-button" onClick={() => navigate("/")}>
              Back to Main Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SightWordsParent;
