import { Card, CardContent } from "@/components/ui/card";
import { Italic } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: Italic;
  iconColor?: string;
  progress?: number;
  progressColor?: string;
  footer?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "bg-blue-100 text-blue-600",
  progress,
  progressColor = "bg-blue-500",
  footer,
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {Icon && (
            <span className={`flex items-center justify-center ${iconColor} w-10 h-10 rounded-full`}>
              <Icon className="h-6 w-6" />
            </span>
          )}
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{value}</span>
          {subtitle && <span className="ml-2 text-sm text-muted-foreground">{subtitle}</span>}
        </div>
        {progress !== undefined && (
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className={`h-2 ${progressColor} rounded-full`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        {footer && <div className="mt-4">{footer}</div>}
      </CardContent>
    </Card>
  );
}
