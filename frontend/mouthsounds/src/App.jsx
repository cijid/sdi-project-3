import { Routes, Route } from "react-router-dom";
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

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SplashPage
            children={children}
            selectedChild={selectedChild}
            setSelectedChild={setSelectedChild}
          />
        }
      />
      <Route path="/children/create" element={<ConceiveChild />} />

      <Route path="/guardians/create" element={<CreateGuardian />} />

      <Route path="/guardians/link" element={<LinkGuardianChild />} />

      <Route
        path="/results"
        element={<ChildResults selectedChild={selectedChild} />}
      />

      <Route path="/letters" element={<LetterSoundsSplashPage />} />

      <Route path="/letters/play" element={<LetterSounds />} />

      <Route
        path="/letters/parent"
        element={<LetterSoundsParent selectedChild={selectedChild} />}
      />

      <Route
        path="/sightwords"
        element={<SightWordsSplashPage setSightWordGrade={setSightWordGrade} />}
      />

      <Route
        path="/sightwords/play"
        element={<SightWords gradeLevel={sightWordGrade} />}
      />

      <Route
        path="/sightwords/parent"
        element={
          <SightWordsParent
            gradeLevel={sightWordGrade}
            selectedChild={selectedChild}
          />
        }
      />
    </Routes>
  );
}

export default App;
