import { useState } from "react";

const emptyProblem = {
  title: "",
  platform: "LeetCode",
  difficulty: "Easy",
  status: "Todo",
  topic: "",
  notes: "",
};

export default function ProblemForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState(initialData || emptyProblem);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form card-form" onSubmit={handleSubmit}>
      <div className="grid-2">
        <label>
          Title
          <input
            name="title"
            required
            value={form.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Platform
          <input
            name="platform"
            required
            value={form.platform}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="grid-2">
        <label>
          Difficulty
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Solved</option>
          </select>
        </label>
      </div>

      <label>
        Topic
        <input
          name="topic"
          value={form.topic}
          onChange={handleChange}
          placeholder="Arrays, DP, Graphs..."
        />
      </label>

      <label>
        Notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows="3"
        />
      </label>

      <div className="form-actions">
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="primary">Save problem</button>
      </div>
    </form>
  );
}
