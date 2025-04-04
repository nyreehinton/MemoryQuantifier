import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/utils";

interface StatusBadgeProps {
  status: "Outstanding" | "Requested" | "Partially Satisfied" | "Satisfied" | "N/A" | 
         "Needed" | "Received" | "Verified" |
         "To Do" | "In Progress" | "Complete" |
         "Verified" | "Pending" | "Potential";
  size?: "default" | "sm";
}

export function StatusBadge({ status, size = "default" }: StatusBadgeProps) {
  const color = getStatusColor(status);
  
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  
  switch (color) {
    case "destructive":
      variant = "destructive";
      break;
    case "warning":
      variant = "outline";
      break;
    case "success":
      variant = "default";
      break;
    case "secondary":
    default:
      variant = "secondary";
      break;
  }
  
  return (
    <Badge 
      variant={variant} 
      className={
        size === "sm" 
          ? "text-xs px-2 py-0.5" 
          : ""
      }
    >
      {status}
    </Badge>
  );
}
