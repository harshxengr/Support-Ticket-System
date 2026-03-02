import { Badge } from "@/components/ui/badge";
import { enumLabel } from "@/features/tickets/lib/constants";
import type { TicketCategory, TicketPriority, TicketStatus } from "@/types/ticket";

export function StatusBadge({ status }: { status: TicketStatus }) {
  const variant = status === "RESOLVED" ? "success" : status === "IN_PROGRESS" ? "info" : "secondary";
  return <Badge variant={variant}>{enumLabel(status)}</Badge>;
}

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const variant =
    priority === "CRITICAL" ? "danger" : priority === "HIGH" ? "warning" : priority === "MEDIUM" ? "info" : "secondary";
  return <Badge variant={variant}>{enumLabel(priority)}</Badge>;
}

export function CategoryBadge({ category }: { category: TicketCategory }) {
  return <Badge variant="outline">{enumLabel(category)}</Badge>;
}
