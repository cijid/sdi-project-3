import { useState } from "react";

function CreateGuardian({ setCurrentPage }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  async function handleGuardianSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/guardians", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstname,
          last_name: lastname,
          email: email,
        }),
      });

      const data = await response.json();

      console.log("Guardian created:", data);

      setFirstname("");
      setLastname("");
      setEmail("");
    } catch (error) {
      console.error("Error creating Guardian:", error);
    }
  }

  return (
    <div className="page-container">
      <div className="page-card">
        <header className="mb-10 text-center">
          <h1 className="page-title">Create a Parent/Guardian</h1>

          <h2 className="page-subtitle">
            This is where you can add a new parent/guardian to the database.
          </h2>
        </header>

        <form onSubmit={handleGuardianSubmit}>
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
              Email:
              <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-select"
              />
            </label>
          </div>
          <div className="grid gap-5 sm:grid-cols-1">
            <div className="activity-button-small activity-button-primary">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
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

export default CreateGuardian;
