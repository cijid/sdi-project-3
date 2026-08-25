function SplashPage({ setCurrentPage }) {
  return (
    <div className="splashPage">
      <h1> Mouth Sounds</h1>
      <h2> What would you like to learn today?</h2>

      <button onClick={() => setCurrentPage("lettersSplash")}>
        Letter Sounds
      </button>

      <button onClick={() => setCurrentPage("sightSplash")}>Sight Words</button>
    </div>
  );
}

export default SplashPage;
