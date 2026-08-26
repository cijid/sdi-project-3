import { useEffect, useState } from "react";

function LinkGuardianChild({ setCurrentPage }) {
  const [children, setChildren] = useState([]);
  const [guardians, setGuardians] = useState([]);
  const [childId, setChildId] = useState("");
  const [guardianId, setGuardianId] = useState("");
  const [relationship, setRelationship] = useState("");
  const [assignedGuardians, setAssignedGuardians] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/children")
      .then((res) => res.json())
      .then((data) => setChildren(data));

    fetch("http://localhost:8081/guardians")
      .then((res) => res.json())
      .then((data) => setGuardians(data));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/child-guardians", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          child_id: Number(childId),
          guardian_id: Number(guardianId),
          relationship: relationship,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to associate guardian with child");
      }

      const data = await response.json();

      console.log("Relationship created:", data);

      setChildId("");
      setGuardianId("");
      setRelationship("");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!childId) {
      setAssignedGuardians([]);
      return;
    }

    fetch(`http://localhost:8081/children/${childId}/guardians`)
      .then((res) => res.json())
      .then((data) => {
        setAssignedGuardians(data);
      })
      .catch((err) => {
        console.error("Could not load assigned guardians:", err);
      });
  }, [childId]);

  return (
    <div>
      <h1>Associate Guardian with Child</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Child:
          <select
            value={childId}
            onChange={(event) => setChildId(event.target.value)}
          >
            <option value="">Select Child</option>

            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.first_name} {child.last_name}
              </option>
            ))}
          </select>
        </label>

        {childId && (
          <div>
            <h3>Assigned Guardians</h3>

            {assignedGuardians.length === 0 ? (
              <p>No guardians assigned.</p>
            ) : (
              <ul>
                {assignedGuardians.map((guardian) => (
                  <li key={guardian.id}>
                    {guardian.first_name} {guardian.last_name}
                    {" - "}
                    {guardian.relationship}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <br />

        <label>
          Guardian:
          <select
            value={guardianId}
            onChange={(event) => setGuardianId(event.target.value)}
          >
            <option value="">Select Guardian</option>

            {guardians.map((guardian) => (
              <option key={guardian.id} value={guardian.id}>
                {guardian.first_name} {guardian.last_name}
              </option>
            ))}
          </select>
        </label>

        <br />

        <label>
          Relationship:
          <select
            value={relationship}
            onChange={(event) => setRelationship(event.target.value)}
          >
            <option value="">Select Relationship</option>
            <option value="Parent">Parent</option>
            <option value="Guardian">Guardian</option>
            <option value="Grandparent">Grandparent</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <br />

        <button
          type="submit"
          disabled={!childId || !guardianId || !relationship}
        >
          Link Guardian to Child
        </button>
      </form>

      <button onClick={() => setCurrentPage("home")}>Back to Main Menu</button>
    </div>
  );
}

export default LinkGuardianChild;
