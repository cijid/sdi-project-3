import { useState } from "react";

function usePracticeHistory() {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [score, setScore] = useState(0);

  function initializeHistory(firstItem) {
    setHistory([firstItem]);
    setCurrentIndex(0);
  }

  function handleNext(newItem) {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setScore((prevScore) => prevScore + 1);
      return;
    }

    if (newItem) {
      setHistory((prevHistory) => [...prevHistory, newItem]);
      setCurrentIndex(currentIndex + 1);
      setScore((prevScore) => prevScore + 1);
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setScore((prevScore) => prevScore - 1);
    }
  }

  const currentItem = history[currentIndex];

  return {
    history,
    currentIndex,
    currentItem,
    score,
    initializeHistory,
    handleNext,
    handlePrevious,
  };
}

export default usePracticeHistory;
