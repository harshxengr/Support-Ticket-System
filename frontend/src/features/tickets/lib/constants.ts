import type { TicketCategory, TicketPriority, TicketStatus } from "@/types/ticket";

export const statusOptions: TicketStatus[] = ["OPEN", "IN_PROGRESS", "RESOLVED"];
export const priorityOptions: TicketPriority[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
export const categoryOptions: TicketCategory[] = ["BILLING", "TECHNICAL", "ACCOUNT", "GENERAL"];

export const enumLabel = (value: string) => value.replaceAll("_", " ").toLowerCase();
