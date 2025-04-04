import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/types";
import { formatDate } from "@/lib/utils";
import { Link } from "wouter";

interface UrgentTasksProps {
  tasks: Task[];
  isLoading?: boolean;
}

export default function UrgentTasks({ tasks, isLoading }: UrgentTasksProps) {
  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-border flex justify-between items-center">
        <CardTitle>Urgent Next Steps</CardTitle>
        <Link href="/tasks" className="text-primary hover:text-primary/80 text-sm">
          View All Tasks
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex justify-center py-6">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">No urgent tasks</div>
        ) : (
          <ul className="divide-y divide-border">
            {tasks.map((task, index) => (
              <li key={task.id} className="py-3 flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <span className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.description}</p>
                  <div className="mt-1 flex justify-between items-center text-xs text-muted-foreground">
                    <span>Due: {formatDate(task.due_date)}</span>
                    {task.related_item && <span>Ref: {task.related_item}</span>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
