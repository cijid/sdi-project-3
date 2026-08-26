import { useState, useEffect } from "react";
import SplashPage from "./SplashPage";
import SightWords from "./SightWords";
import LetterSounds from "./LetterSounds";
import LetterSoundsParent from "./LetterSoundsParent";
import LetterSoundsSplashPage from "./LetterSoundsSplashPage";
import SightWordsParent from "./SightWordsParent";
import SightWordsSplashPage from "./SightWordsSplashPage";
import ConceiveChild from "./ConceiveChild";
import CreateGuardian from "./CreateGuardian";
import LinkGuardianChild from "./LinkGuardianChild";
import ChildResults from "./ChildResults";

import "./App.css";

function App() {
  const [selectedChild, setSelectedChild] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [sightWordGrade, setSightWordGrade] = useState(-1);
  const [children, setChildren] = useState([]);

  //Fetch the children for they are on the loose.
  useEffect(() => {
    fetch("http://localhost:8081/children")
      .then((res) => res.json())
      .then((data) => {
        setChildren(data);
      });
  }, []);

  if (currentPage === "createChild") {
    return <ConceiveChild setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "createGuardian") {
    return <CreateGuardian setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "linkGuardianChild") {
    return <LinkGuardianChild setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "lettersSplash") {
    return <LetterSoundsSplashPage setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "letters") {
    return <LetterSounds setCurrentPage={setCurrentPage} />;
  }

  if (currentPage === "lettersparent") {
    return (
      <LetterSoundsParent
        selectedChild={selectedChild}
        setCurrentPage={setCurrentPage}
      />
    );
  }

  if (currentPage === "sightSplash") {
    return (
      <SightWordsSplashPage
        setCurrentPage={setCurrentPage}
        setSightWordGrade={setSightWordGrade}
      />
    );
  }

  if (currentPage === "childresults") {
    return (
      <ChildResults
        selectedChild={selectedChild}
        setCurrentPage={setCurrentPage}
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
        selectedChild={selectedChild}
      />
    );
  }

  return (
    <SplashPage
      setCurrentPage={setCurrentPage}
      children={children}
      selectedChild={selectedChild}
      setSelectedChild={setSelectedChild}
    />
  );
}

export default App;
