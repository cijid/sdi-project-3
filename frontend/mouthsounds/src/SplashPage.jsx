import "./styles/splashpage.css";

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
      <div className="splashPageContent">
        <div className="childSelector">
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
        </div>
        <div className="activitySelector">
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
        <div className="guardianActionSelector">
          <button onClick={() => setCurrentPage("createChild")}>
            Conceive a Child
          </button>

          <button onClick={() => setCurrentPage("createGuardian")}>
            Create a Guardian
          </button>

          <button onClick={() => setCurrentPage("linkGuardianChild")}>
            Link Guardian Child
          </button>
          <button onClick={() => setCurrentPage("childresults")}>
            View Selected Child's Progress
          </button>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
