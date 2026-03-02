export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type TicketCategory = "BILLING" | "TECHNICAL" | "ACCOUNT" | "GENERAL";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  aiSource?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TicketListResponse {
  data: Ticket[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardStats {
  cards: {
    open: number;
    inProgress: number;
    resolved: number;
    critical: number;
  };
  trends: Array<{ date: string; count: number }>;
  recentTickets: Ticket[];
}

export interface ClassificationResult {
  category: TicketCategory;
  priority: TicketPriority;
  source: "gemini" | "fallback";
}
