import { useStats } from "../ticketHooks";

export default function StatsDashboard({ refreshKey }) {
  const { stats } = useStats(refreshKey);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total: {stats.total_tickets}</p>
      <p>Open: {stats.open_tickets}</p>
      <p>Avg per day: {stats.avg_tickets_per_day}</p>

      <h4>Priority Breakdown</h4>
      {stats.priority_breakdown.map((p) => (
        <p key={p.priority}>
          {p.priority}: {p._count}
        </p>
      ))}

      <h4>Category Breakdown</h4>
      {stats.category_breakdown.map((c) => (
        <p key={c.category}>
          {c.category}: {c._count}
        </p>
      ))}
    </div>
  );
}