import { useState } from "react";

function ConceiveChild({ setCurrentPage }) {
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
    <div className="childcreation-container">
      <form onSubmit={handleChildSubmit}>
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
          Date of Birth:
          <input
            type="date"
            value={dateofbirth}
            onChange={(event) => setDateofbirth(event.target.value)}
          />
        </label>

        <br />

        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setCurrentPage("home")}>Back to Main Menu</button>
    </div>
  );
}

export default ConceiveChild;
