import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  classifyTicket,
  createTicket,
  getDashboardStats,
  getTicketById,
  getTickets,
  type TicketFilters,
  updateTicketStatus
} from "@/features/tickets/lib/api";
import type { Ticket } from "@/types/ticket";

export const ticketKeys = {
  all: ["tickets"] as const,
  list: (filters: TicketFilters) => [...ticketKeys.all, "list", filters] as const,
  detail: (id: string) => [...ticketKeys.all, "detail", id] as const,
  dashboard: ["tickets", "dashboard"] as const
};

export function useDashboardQuery() {
  return useQuery({
    queryKey: ticketKeys.dashboard,
    queryFn: getDashboardStats
  });
}

export function useTicketsQuery(filters: TicketFilters) {
  return useQuery({
    queryKey: ticketKeys.list(filters),
    queryFn: () => getTickets(filters),
    placeholderData: (previous) => previous
  });
}

export function useTicketDetailQuery(id: string) {
  return useQuery({
    queryKey: ticketKeys.detail(id),
    queryFn: () => getTicketById(id),
    enabled: Boolean(id)
  });
}

export function useClassifyTicketMutation() {
  return useMutation({ mutationFn: classifyTicket });
}

export function useCreateTicketMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTicket,
    onSuccess: async () => {
      toast.success("Ticket created successfully");
      await queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    }
  });
}

export function useUpdateTicketStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTicketStatus,
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ticketKeys.detail(id) });
      const previous = queryClient.getQueryData<Ticket>(ticketKeys.detail(id));

      if (previous) {
        queryClient.setQueryData<Ticket>(ticketKeys.detail(id), { ...previous, status });
      }

      return { previous };
    },
    onError: (_error, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(ticketKeys.detail(variables.id), context.previous);
      }
      toast.error("Unable to update status");
    },
    onSuccess: async (ticket) => {
      queryClient.setQueryData(ticketKeys.detail(ticket.id), ticket);
      await queryClient.invalidateQueries({ queryKey: ticketKeys.list({}) });
      await queryClient.invalidateQueries({ queryKey: ticketKeys.dashboard });
      toast.success("Status updated");
    }
  });
}
