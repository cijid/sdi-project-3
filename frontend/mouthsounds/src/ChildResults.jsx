import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function ChildResults({ selectedChild, setCurrentPage }) {
  const [children, setChildren] = useState([]);
  const [childId, setChildId] = useState(selectedChild?.id || "");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/children")
      .then((res) => res.json())
      .then((data) => {
        setChildren(data);
      });
  }, []);

  useEffect(() => {
    if (!childId) {
      setResults([]);
      return;
    }

    fetch(`http://localhost:8081/children/${childId}/results`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }, [childId]);

  const chartData = results.map((result) => ({
    session: result.session_id,
    date: new Date(result.started_at).toLocaleDateString(),
    lettersounds: result.activity_type === "lettersounds" ? result.score : null,
    sightwords: result.activity_type === "sightwords" ? result.score : null,
  }));

  return (
    <div className="childrenresults">
      <h1>Child Progress</h1>

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

      {results.length > 0 && (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="lettersounds"
                stroke="#003cff"
                name="Letter Sounds"
                connectNulls
              />

              <Line
                type="monotone"
                dataKey="sightwords"
                stroke="#b99e03"
                name="Sight Words"
                connectNulls
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <button onClick={() => setCurrentPage("home")}>Back to Main Menu</button>
    </div>
  );
}

export default ChildResults;
