import "./index.css";

function LetterSoundsSplashPage({ setCurrentPage }) {
  return (
    <div className="page-container">
      <div className="page-card">
        <header className="mb-10 text-center">
          <h1 className="page-title">Letter Sounds</h1>

          <h2 className="page-subtitle">Sound out the letter on screen.</h2>
        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          <button
            onClick={() => setCurrentPage("letters")}
            className="activity-button activity-button-primary"
          >
            Letter Sounds <br /> Child Mode
          </button>

          <button
            onClick={() => setCurrentPage("lettersparent")}
            className="activity-button activity-button-secondary"
          >
            Letter Sounds <br /> Parent Participation Mode
          </button>
        </div>
        <br />
        <div className="grid gap-5 sm:grid-cols-1">
          <button
            onClick={() => setCurrentPage("home")}
            className="secondary-button"
          >
            Back to Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}
export default LetterSoundsSplashPage;
