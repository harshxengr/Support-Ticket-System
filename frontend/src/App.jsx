import { useState } from "react";
import TicketForm from "./features/tickets/components/TicketForm";
import TicketList from "./features/tickets/components/TicketList";
import StatsDashboard from "./features/tickets/components/StatsDashboard";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Support Ticket System</h1>

      <TicketForm onSuccess={refresh} />
      <StatsDashboard refreshKey={refreshKey} />
      <TicketList refreshKey={refreshKey} />
    </div>
  );
}