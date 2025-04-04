import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Task, TaskPriority, TaskStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { StatusBadge } from "@/components/ui/status-badge";
import { format, parseISO } from "date-fns";
import { CalendarIcon, Edit, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TaskColumn({ 
  title, 
  status, 
  tasks, 
  color 
}: { 
  title: string;
  status: TaskStatus;
  tasks: Task[];
  color: string;
}) {
  return (
    <Card>
      <CardHeader className={`px-6 py-4 border-b ${color}`}>
        <CardTitle className="text-lg font-medium">{title} ({tasks.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm font-medium ${task.status === "Complete" ? "line-through" : ""}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center">
                    {task.priority === "High" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
                        High
                      </span>
                    )}
                    {task.priority === "Medium" && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                        Medium
                      </span>
                    )}
                    <button>
                      <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{task.description}</p>
                <div className="mt-3 flex justify-between items-center text-xs text-muted-foreground">
                  <span>Due: {format(parseISO(task.due_date), "MMM d, yyyy")}</span>
                  {task.related_item && <span>Ref: {task.related_item}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No tasks in this column
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function TaskManagement() {
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date>();
  
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading tasks...</div>;
  }

  if (!tasks) {
    return <div className="flex justify-center p-8">No tasks available</div>;
  }

  const todoTasks = tasks.filter(task => task.status === "To Do");
  const inProgressTasks = tasks.filter(task => task.status === "In Progress");
  const completeTasks = tasks.filter(task => task.status === "Complete");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Task Management</h2>
        <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input id="task-title" placeholder="Enter task title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea id="task-description" placeholder="Enter task description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Complete">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="related-item">Related Item (Optional)</Label>
                <Input id="related-item" placeholder="e.g., CR-NEED-04, PEC-PAY-01" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setNewTaskOpen(false)}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskColumn 
          title="To Do" 
          status="To Do" 
          tasks={todoTasks} 
          color="bg-red-50" 
        />
        
        <TaskColumn 
          title="In Progress" 
          status="In Progress" 
          tasks={inProgressTasks} 
          color="bg-yellow-50" 
        />
        
        <TaskColumn 
          title="Completed" 
          status="Complete" 
          tasks={completeTasks} 
          color="bg-green-50" 
        />
      </div>
    </div>
  );
}
