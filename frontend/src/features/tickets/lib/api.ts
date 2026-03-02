import { apiClient } from "@/lib/api/client";
import type { ClassificationResult, DashboardStats, Ticket, TicketListResponse, TicketStatus } from "@/types/ticket";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  meta?: TicketListResponse["meta"];
}

export interface TicketFilters {
  q?: string;
  status?: string;
  priority?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export async function getDashboardStats() {
  const { data } = await apiClient.get<ApiEnvelope<DashboardStats>>("/tickets/dashboard/stats");
  return data.data;
}

export async function getTickets(filters: TicketFilters) {
  const { data } = await apiClient.get<ApiEnvelope<Ticket[]>>("/tickets", { params: filters });

  return {
    data: data.data,
    meta: data.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 }
  } satisfies TicketListResponse;
}

export async function getTicketById(id: string) {
  const { data } = await apiClient.get<ApiEnvelope<Ticket>>(`/tickets/${id}`);
  return data.data;
}

export async function classifyTicket(payload: { title: string; description: string }) {
  const { data } = await apiClient.post<ApiEnvelope<ClassificationResult>>("/tickets/classify", payload);
  return data.data;
}

export async function createTicket(payload: { title: string; description: string }) {
  const { data } = await apiClient.post<ApiEnvelope<Ticket>>("/tickets", payload);
  return data.data;
}

export async function updateTicketStatus(payload: { id: string; status: TicketStatus }) {
  const { data } = await apiClient.patch<ApiEnvelope<Ticket>>(`/tickets/${payload.id}/status`, {
    status: payload.status
  });
  return data.data;
}
