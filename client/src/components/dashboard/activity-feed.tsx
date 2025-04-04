import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ActivityType } from "@/types";
import { formatDate } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Bell, Plus } from "lucide-react";

interface ActivityFeedProps {
  activities: Activity[];
  isLoading?: boolean;
}

export default function ActivityFeed({ activities, isLoading }: ActivityFeedProps) {
  // Function to get the appropriate icon based on activity type
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "Added":
      case "Created":
        return <Plus className="h-5 w-5 text-white" />;
      case "Updated":
      case "Requested":
        return <Bell className="h-5 w-5 text-white" />;
      case "Completed":
        return <CheckCircle2 className="h-5 w-5 text-white" />;
      default:
        return <AlertCircle className="h-5 w-5 text-white" />;
    }
  };

  // Function to get the appropriate icon background color
  const getIconBackground = (type: ActivityType) => {
    switch (type) {
      case "Added":
      case "Created":
        return "bg-blue-500";
      case "Updated":
      case "Requested":
        return "bg-yellow-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-border">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex justify-center py-6">Loading activities...</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">No recent activities</div>
        ) : (
          <div className="flow-root">
            <ul className="-mb-8">
              {activities.map((activity, idx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {idx < activities.length - 1 && (
                      <span
                        className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-muted"
                        aria-hidden="true"
                      ></span>
                    )}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <span
                          className={`h-10 w-10 rounded-full ${getIconBackground(
                            activity.type
                          )} flex items-center justify-center ring-8 ring-background`}
                        >
                          {getActivityIcon(activity.type)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">{activity.type}</span>{" "}
                            {activity.description}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {formatDate(activity.timestamp)}
                          </p>
                        </div>
                        <div className="mt-2 text-sm">
                          <p>{activity.details}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
