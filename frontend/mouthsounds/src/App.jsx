import { useState } from "react";
import SplashPage from "./SplashPage";
import SightWords from "./SightWords";
import LetterSounds from "./LetterSounds";
import LetterSoundsParent from "./LetterSoundsParent";
import LetterSoundsSplashPage from "./LetterSoundsSplashPage";
import SightWordsParent from "./SightWordsParent";
import SightWordsSplashPage from "./SightWordsSplashPage";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [sightWordGrade, setSightWordGrade] = useState(-1);

  if (currentPage === "lettersSplash") {
    return <LetterSoundsSplashPage setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "letters") {
    return <LetterSounds setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "lettersparent") {
    return <LetterSoundsParent setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "sightSplash") {
    return (
      <SightWordsSplashPage
        setCurrentPage={setCurrentPage}
        setSightWordGrade={setSightWordGrade}
      />
    );
  }

  if (currentPage === "sightwords") {
    return (
      <SightWords setCurrentPage={setCurrentPage} gradeLevel={sightWordGrade} />
    );
  }

  if (currentPage === "sightwordsparent") {
    return (
      <SightWordsParent
        setCurrentPage={setCurrentPage}
        gradeLevel={sightWordGrade}
      />
    );
  }

  return <SplashPage setCurrentPage={setCurrentPage} />;
}

export default App;
