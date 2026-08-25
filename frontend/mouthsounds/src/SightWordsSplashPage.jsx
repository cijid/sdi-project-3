import { useState } from "react";

function SightWordsSplashPage({ setCurrentPage, setSightWordGrade }) {
  const [selectedGrade, setSelectedGrade] = useState("-1");

  function handleChildMode() {
    setSightWordGrade(Number(selectedGrade));
    setCurrentPage("sightwords");
  }

  function handleParentMode() {
    setSightWordGrade(Number(selectedGrade));
    setCurrentPage("sightwordsparent");
  }

  return (
    <div>
      <h1>Sight Words</h1>

      <label htmlFor="grade">Choose a grade level:</label>

      <select
        id="grade"
        value={selectedGrade}
        onChange={(event) => setSelectedGrade(event.target.value)}
      >
        <option value="-1">Pre-K</option>
        <option value="0">Kindergarten</option>
        <option value="1">First Grade</option>
        <option value="2">Second Grade</option>
        <option value="3">Third Grade</option>
        <option value="4">Nouns</option>
      </select>

      <button onClick={() => setCurrentPage(handleChildMode)}>
        Sight Words - Child Mode
      </button>

      <button onClick={() => setCurrentPage(handleParentMode)}>
        Sight Words - Parent Participation Mode
      </button>

      <button onClick={() => setCurrentPage("home")}>Back to Main Menu</button>
    </div>
  );
}
export default SightWordsSplashPage;
