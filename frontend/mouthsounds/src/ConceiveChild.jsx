import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function ConceiveChild() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");

  async function handleChildSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/children", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstname,
          last_name: lastname,
          date_of_birth: dateofbirth,
        }),
      });

      const data = await response.json();

      console.log("Child created:", data);

      setFirstname("");
      setLastname("");
      setDateofbirth("");
    } catch (error) {
      console.error("Error creating child:", error);
    }
  }

  return (
    <div className="page-container">
      <div className="page-card">
        <header className="mb-10 text-center">
          <h1 className="page-title">Conceive a Child</h1>

          <h2 className="page-subtitle">
            I kid. This creates a profile for a new child.
          </h2>
        </header>
        <form onSubmit={handleChildSubmit}>
          <div className="grid gap-5 sm:grid-cols-3">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              First Name:
              <input
                type="text"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
                className="form-select"
              />
            </label>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Last Name:
              <input
                type="text"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
                className="form-select"
              />
            </label>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Date of Birth:
              <input
                type="date"
                value={dateofbirth}
                onChange={(event) => setDateofbirth(event.target.value)}
                className="form-select"
              />
            </label>
          </div>
          <br />
          <div className="grid gap-5 sm:grid-cols-1">
            <div className="activity-button-small activity-button-primary">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
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

export default ConceiveChild;
