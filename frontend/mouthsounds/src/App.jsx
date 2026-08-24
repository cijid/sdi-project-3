import { useState } from "react";
import SplashPage from "./SplashPage";
import LetterSounds from "./LetterSounds";
import SightWords from "./SightWords";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  if (currentPage === "letters") {
    return <LetterSounds setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "sightwords") {
    return <SightWords setCurrentPage={setCurrentPage} />;
  }

  return <SplashPage setCurrentPage={setCurrentPage} />;
}

export default App;
