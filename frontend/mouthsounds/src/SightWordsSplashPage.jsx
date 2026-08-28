import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function SightWordsSplashPage({ setSightWordGrade }) {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState("-1");

  function handleChildMode() {
    setSightWordGrade(Number(selectedGrade));
    navigate("/sightwords/play");
  }

  function handleParentMode() {
    setSightWordGrade(Number(selectedGrade));
    navigate("/sightwords/parent");
  }

  return (
    <div className="page-container">
      <div className="page-card">
        <header className="mb-10 text-center">
          <h1 className="page-title">Sight Words</h1>

          <h2 className="page-subtitle">
            Say the word that appears on screen.
          </h2>
        </header>

        <label
          htmlFor="grade"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Choose a grade level:
          <select
            id="grade"
            value={selectedGrade}
            onChange={(event) => setSelectedGrade(event.target.value)}
            className="form-select"
          >
            <option value="-1">Pre-K</option>
            <option value="0">Kindergarten</option>
            <option value="1">First Grade</option>
            <option value="2">Second Grade</option>
            <option value="3">Third Grade</option>
            <option value="4">Nouns</option>
          </select>
        </label>
        <br />
        <div className="grid gap-5 sm:grid-cols-2">
          <button
            onClick={handleChildMode}
            className="activity-button activity-button-primary"
          >
            Sight Words - Child Mode
          </button>

          <button
            onClick={handleParentMode}
            className="activity-button activity-button-secondary"
          >
            Sight Words - Parent Participation Mode
          </button>
        </div>
        <br />
        <div className="grid gap-5 sm:grid-cols-1">
          <button onClick={() => navigate("/")} className="secondary-button">
            Back to Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
export default SightWordsSplashPage;
