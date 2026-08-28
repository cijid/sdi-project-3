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
import { useNavigate } from "react-router-dom";
import "./index.css";

function ChildResults({ selectedChild }) {
  const navigate = useNavigate();
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
    <div className="page-container">
      <div className="page-card">
        <header className="mb-10 text-center">
          <h1 className="page-title">Results</h1>

          <h2 className="page-subtitle">View a selected child's progress.</h2>
        </header>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Child:
          <select
            value={childId}
            onChange={(event) => setChildId(event.target.value)}
            className="form-select"
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

        <div className="grid gap-5 sm:grid-cols-1">
          <button onClick={() => navigate("/")} className="secondary-button">
            Back to Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChildResults;
