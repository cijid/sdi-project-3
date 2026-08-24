function SplashPage({ setCurrentPage }) {
  return (
    <div className="splashPage">
      <h1> Mouth Sounds</h1>

      <button onClick={() => setCurrentPage("letters")}>Letter Sounds</button>

      <button onClick={() => setCurrentPage("sightwords")}>Sight Words</button>
    </div>
  );
}

export default SplashPage;
