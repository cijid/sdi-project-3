function LetterSoundsSplashPage({ setCurrentPage }) {
  return (
    <div>
      <div className="activitySelector">
        <button onClick={() => setCurrentPage("letters")}>
          Letter Sounds - Child Mode
        </button>

        <button onClick={() => setCurrentPage("lettersparent")}>
          Letter Sounds - Parent Participation Mode
        </button>
      </div>
      <button onClick={() => setCurrentPage("home")}>Back to Main Menu</button>
    </div>
  );
}
export default LetterSoundsSplashPage;
