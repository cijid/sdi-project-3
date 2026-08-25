function SplashPage({
  setCurrentPage,
  children,
  selectedChild,
  setSelectedChild,
}) {
  return (
    <div className="splashPage">
      <h1> Mouth Sounds</h1>
      <h2> What would you like to learn today?</h2>

      <select
        value={selectedChild?.id || ""}
        onChange={(event) => {
          const child = children.find(
            (child) => child.id === Number(event.target.value),
          );

          setSelectedChild(child);
        }}
      >
        <option value="">Select Child</option>

        {children.map((child) => (
          <option key={child.id} value={child.id}>
            {child.first_name} {child.last_name}
          </option>
        ))}
      </select>

      <button
        disabled={!selectedChild}
        onClick={() => setCurrentPage("lettersSplash")}
      >
        Letter Sounds
      </button>

      <button
        disabled={!selectedChild}
        onClick={() => setCurrentPage("sightSplash")}
      >
        Sight Words
      </button>
    </div>
  );
}

export default SplashPage;
