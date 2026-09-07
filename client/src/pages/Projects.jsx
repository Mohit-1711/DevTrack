import { useEffect, useState } from "react";
import api from "../api";
import ProjectForm from "../components/ProjectForm";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load projects");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const saveProject = async (data) => {
    try {
      if (editing) {
        await api.put(`/projects/${editing._id}`, data);
      } else {
        await api.post("/projects", data);
      }
      setShow(false);
      setEditing(null);
      loadProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save project");
    }
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      loadProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete project");
    }
  };

  return (
    <>
      <div className="page-head">
        <div>
          <p className="eyebrow">BUILDING</p>
          <h1>Projects</h1>
          <p>Keep your portfolio work organized.</p>
        </div>
        <button
          className="primary"
          onClick={() => {
            setEditing(null);
            setShow(!show);
          }}
        >
          {show ? "Close" : "+ Add project"}
        </button>
      </div>

      {show && (
        <ProjectForm
          onSubmit={saveProject}
          onCancel={() => {
            setShow(false);
            setEditing(null);
          }}
          initialData={editing}
        />
      )}

      {error && <p className="error">{error}</p>}

      <div className="project-grid">
        {projects.length === 0 ? (
          <div className="empty">No projects yet.</div>
        ) : (
          projects.map((p) => (
            <div className="project-card" key={p._id}>
              <div className="project-top">
                <h2>{p.name}</h2>
                <span className="badge">{p.status}</span>
              </div>
              <p>{p.description}</p>
              <div className="chips">
                {p.techStack.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="project-actions">
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                )}
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
                  onClick={() => deleteProject(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
