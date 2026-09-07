import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load dashboard");
      }
    };
    loadDashboard();
  }, []);

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h1>Welcome, {user?.name}</h1>
          <p>Keep your problems and projects in one place.</p>
        </div>
        <div className="actions">
          <Link className="primary link-btn" to="/problems">
            Add problem
          </Link>
          <Link className="secondary link-btn" to="/projects">
            Add project
          </Link>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="stats">
        <div className="stat">
          <span>Total Problems</span>
          <strong>{stats?.totalProblems ?? "—"}</strong>
        </div>
        <div className="stat">
          <span>Solved</span>
          <strong>{stats?.solved ?? "—"}</strong>
        </div>
        <div className="stat">
          <span>In Progress</span>
          <strong>{stats?.inProgress ?? "—"}</strong>
        </div>
        <div className="stat">
          <span>Projects</span>
          <strong>{stats?.projects ?? "—"}</strong>
        </div>
      </div>

      <div className="info-card">
        <div className="section-title">
          <div>
            <p className="eyebrow">ACTIVITY</p>
            <h2>Recent Activity</h2>
          </div>
          <Link to="/problems">View problems</Link>
        </div>

        {!stats?.activity?.length ? (
          <p>No activity yet. Add your first problem or project.</p>
        ) : (
          <div className="activity-list">
            {stats.activity.map((item) => (
              <div className="activity-item" key={`${item.type}-${item.id}`}>
                <div className="activity-main">
                  <strong>{item.title}</strong>
                  <span>
                    {item.type === "problem"
                      ? `${item.platform} · ${item.status}`
                      : `Project · ${item.status}`}
                  </span>
                </div>
                <span className="activity-type">
                  {item.type === "problem" ? "Problem" : "Project"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
