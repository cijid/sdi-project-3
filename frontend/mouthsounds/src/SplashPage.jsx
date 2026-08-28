import { useNavigate } from "react-router-dom";
import "./index.css";

function SplashPage({ children, selectedChild, setSelectedChild }) {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className="page-card">
        <header className="mb-10 text-center">
          <h1 className="page-title">Mouth Sounds</h1>

          <h2 className="page-subtitle">What would you like to learn today?</h2>
        </header>

        <div className="mb-8">
          <label
            htmlFor="child-select"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Who is practicing?
          </label>

          <select
            id="child-select"
            value={selectedChild?.id || ""}
            onChange={(event) => {
              const child = children.find(
                (child) => child.id === Number(event.target.value),
              );

              setSelectedChild(child);
            }}
            className="form-select"
          >
            <option value="">Select Child</option>

            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.first_name} {child.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <button
            disabled={!selectedChild}
            onClick={() => navigate("/letters")}
            className="activity-button activity-button-primary"
          >
            Letter Sounds
          </button>

          <button
            disabled={!selectedChild}
            onClick={() => navigate("/sightwords")}
            className="activity-button activity-button-secondary"
          >
            Sight Words
          </button>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <h3 className="section-title">Parent / Guardian</h3>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => navigate("/children/create")}
              className="secondary-button"
            >
              Conceive a Child
            </button>

            <button
              onClick={() => navigate("/guardians/create")}
              className="secondary-button"
            >
              Create a Guardian
            </button>

            <button
              onClick={() => navigate("/guardians/link")}
              className="secondary-button"
            >
              Link Guardian & Child
            </button>

            <button
              disabled={!selectedChild}
              onClick={() => navigate("/results")}
              className="secondary-button"
            >
              View Selected Child&apos;s Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
