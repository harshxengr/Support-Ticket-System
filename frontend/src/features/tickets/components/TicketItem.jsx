import { updateTicket } from "../ticketService";

export default function TicketItem({ ticket }) {
  const handleStatusChange = async (e) => {
    await updateTicket(ticket.id, {
      status: e.target.value
    });
    window.location.reload();
  };

  return (
    <div style={{ border: "1px solid #ddd", margin: "10px 0", padding: "10px" }}>
      <h3>{ticket.title}</h3>
      <p>{ticket.description.slice(0, 100)}...</p>
      <p>Category: {ticket.category}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Status: {ticket.status}</p>
      <p>Created: {new Date(ticket.createdAt).toLocaleString()}</p>

      <select value={ticket.status} onChange={handleStatusChange}>
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
        <option value="resolved">resolved</option>
        <option value="closed">closed</option>
      </select>
    </div>
  );
}