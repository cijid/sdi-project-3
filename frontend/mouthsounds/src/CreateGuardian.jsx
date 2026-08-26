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
    <div className="guardiancreation-container">
      <form onSubmit={handleGuardianSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </label>

        <br />

        <label>
          Last Name:
          <input
            type="text"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </label>

        <br />

        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <br />

        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setCurrentPage("home")}>Back to Main Menu</button>
    </div>
  );
}

export default CreateGuardian;
