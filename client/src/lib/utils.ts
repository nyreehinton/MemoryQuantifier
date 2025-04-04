import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "MMM d, yyyy");
  } catch (error) {
    return dateString;
  }
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "TBD";
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getStatusColor(
  status: "Outstanding" | "Requested" | "Partially Satisfied" | "Satisfied" | "N/A" | 
         "Needed" | "Received" | "Verified" |
         "To Do" | "In Progress" | "Complete" |
         "Verified" | "Pending" | "Potential"
): string {
  switch (status) {
    case "Outstanding":
    case "Needed":
    case "To Do":
      return "destructive";
    case "Requested":
    case "Partially Satisfied":
    case "In Progress":
    case "Pending":
      return "warning";
    case "Satisfied":
    case "Verified":
    case "Complete":
      return "success";
    case "Potential":
      return "secondary";
    case "N/A":
    case "Received":
    default:
      return "secondary";
  }
}
