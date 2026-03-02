import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryBadge, PriorityBadge, StatusBadge } from "@/features/tickets/components/badges";
import { formatDate } from "@/lib/utils";
import type { Ticket } from "@/types/ticket";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Link to={`/tickets/${ticket.id}`} className="block transition-transform hover:-translate-y-0.5">
      <Card className="rounded-2xl border-border/70 shadow-sm hover:shadow-md">
        <CardContent className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="line-clamp-1 text-base font-semibold">{ticket.title}</h3>
            <StatusBadge status={ticket.status} />
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{ticket.description}</p>
          <div className="flex flex-wrap gap-2">
            <PriorityBadge priority={ticket.priority} />
            <CategoryBadge category={ticket.category} />
          </div>
          <p className="text-xs text-muted-foreground">Created {formatDate(ticket.createdAt)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
