import { useState } from "react";
import { useTickets } from "../ticketHooks";
import TicketItem from "./TicketItem";

export default function TicketList({ refreshKey }) {
  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    status: "",
    search: ""
  });

  const { tickets } = useTickets(filters, refreshKey);

  const handleFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Tickets</h2>

      <input
        name="search"
        placeholder="Search..."
        onChange={handleFilter}
      />

      <select name="category" onChange={handleFilter}>
        <option value="">All Categories</option>
        <option value="billing">billing</option>
        <option value="technical">technical</option>
        <option value="account">account</option>
        <option value="general">general</option>
      </select>

      <select name="priority" onChange={handleFilter}>
        <option value="">All Priority</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
        <option value="critical">critical</option>
      </select>

      <select name="status" onChange={handleFilter}>
        <option value="">All Status</option>
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
        <option value="resolved">resolved</option>
        <option value="closed">closed</option>
      </select>

      <br /><br />

      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}