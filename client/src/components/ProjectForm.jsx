import { useState } from "react";

const emptyProject = {
  name: "",
  description: "",
  techStack: "",
  status: "Planning",
  githubUrl: "",
};

export default function ProjectForm({ onSubmit, onCancel, initialData }) {
  const startingForm = initialData
    ? { ...initialData, techStack: (initialData.techStack || []).join(", ") }
    : emptyProject;

  const [form, setForm] = useState(startingForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const techStack = form.techStack
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);
    onSubmit({ ...form, techStack });
  };

  return (
    <form className="form card-form" onSubmit={handleSubmit}>
      <label>
        Project name
        <input name="name" required value={form.name} onChange={handleChange} />
      </label>

      <label>
        Description
        <textarea
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Tech stack
        <input
          name="techStack"
          value={form.techStack}
          onChange={handleChange}
          placeholder="React, Node, MongoDB"
        />
      </label>

      <div className="grid-2">
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Planning</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
        <label>
          GitHub URL
          <input
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="primary">Save project</button>
      </div>
    </form>
  );
}
