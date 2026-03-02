import { PageContainer } from "@/components/layout/page-container";
import { CreateTicketForm } from "@/features/tickets/components/create-ticket-form";

export default function CreateTicketPage() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Create Ticket</h1>
        <p className="text-sm text-muted-foreground">Submit ticket details and let AI classify it.</p>
      </div>
      <CreateTicketForm />
    </PageContainer>
  );
}
