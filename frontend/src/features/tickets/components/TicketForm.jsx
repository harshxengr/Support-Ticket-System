import { useState } from "react";
import { createTicket, classifyTicket } from "../ticketService";

const categories = ["billing", "technical", "account", "general"];
const priorities = ["low", "medium", "high", "critical"];

export default function TicketForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClassify = async () => {
    if (!form.description) return;

    try {
      setLoading(true);
      const res = await classifyTicket(form.description);
      setForm((prev) => ({
        ...prev,
        category: res.data.suggested_category || "",
        priority: res.data.suggested_priority || ""
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTicket(form);
    setForm({
      title: "",
      description: "",
      category: "",
      priority: ""
    });
    onSuccess();
  };

  return (
    <div>
      <h2>Create Ticket</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          maxLength={200}
          value={form.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          onBlur={handleClassify}
          required
        />

        {loading && <p>Analyzing with AI...</p>}

        <br /><br />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="">Select Priority</option>
          {priorities.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}