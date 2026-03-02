import { Link } from "react-router-dom";
import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <div className="mb-4 grid h-14 w-14 place-content-center rounded-2xl bg-primary/10 text-primary">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold">No tickets yet</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">Create your first support ticket and let AI classify it instantly.</p>
      <Button asChild className="mt-5">
        <Link to="/tickets/create">Create Ticket</Link>
      </Button>
    </div>
  );
}
