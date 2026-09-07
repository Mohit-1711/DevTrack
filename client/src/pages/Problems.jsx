import { useEffect, useState } from "react";
import api from "../api";
import ProblemForm from "../components/ProblemForm";

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const loadProblems = async () => {
    try {
      const res = await api.get("/problems", { params: { search, status } });
      setProblems(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load problems");
    }
  };

  useEffect(() => {
    loadProblems();
  }, [search, status]);

  const saveProblem = async (data) => {
    try {
      if (editing) {
        await api.put(`/problems/${editing._id}`, data);
      } else {
        await api.post("/problems", data);
      }
      setShow(false);
      setEditing(null);
      loadProblems();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save problem");
    }
  };

  const deleteProblem = async (id) => {
    if (!confirm("Delete this problem?")) return;
    try {
      await api.delete(`/problems/${id}`);
      loadProblems();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete problem");
    }
  };

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">CODING</p>
          <h1>Problems</h1>
          <p>Track what you're solving and what you've learned.</p>
        </div>
        <button
          className="primary"
          onClick={() => {
            setEditing(null);
            setShow(!show);
          }}
        >
          {show ? "Close" : "+ Add problem"}
        </button>
      </div>

      {show && (
        <ProblemForm
          onSubmit={saveProblem}
          onCancel={() => {
            setShow(false);
            setEditing(null);
          }}
          initialData={editing}
        />
      )}

      <div className="filters">
        <input
          placeholder="Search title, topic or platform..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option>Todo</option>
          <option>In Progress</option>
          <option>Solved</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="list">
        {problems.length === 0 ? (
          <div className="empty">No problems yet.</div>
        ) : (
          problems.map((p) => (
            <div className="item" key={p._id}>
              <div>
                <div className="item-title">{p.title}</div>
                <div className="muted">
                  {p.platform} · {p.topic || "No topic"}
                </div>
                <p>{p.notes}</p>
              </div>
              <div className="item-side">
                <span
                  className={`badge ${p.status.replace(" ", "-").toLowerCase()}`}
                >
                  {p.status}
                </span>
                <span className="difficulty">{p.difficulty}</span>
                <div>
                  <button
                    className="text-btn"
                    onClick={() => {
                      setEditing(p);
                      setShow(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-btn danger"
                    onClick={() => deleteProblem(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
