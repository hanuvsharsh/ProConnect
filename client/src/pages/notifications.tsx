import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, ThumbsUp, MessageCircle, UserPlus, Briefcase } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Layout } from "@/components/layout";

export function NotificationsPage() {
  // Mock notification data for demo
  const notifications = [
    {
      id: "1",
      type: "like",
      user: { name: "Sarah Chen", avatar: "", title: "Product Manager" },
      content: "liked your post about career development",
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: "2", 
      type: "comment",
      user: { name: "Mike Johnson", avatar: "", title: "Software Engineer" },
      content: "commented on your post: 'Great insights about team leadership!'",
      timestamp: new Date(Date.now() - 7200000),
      read: false
    },
    {
      id: "3",
      type: "connection",
      user: { name: "Lisa Wang", avatar: "", title: "UX Designer" },
      content: "wants to connect with you",
      timestamp: new Date(Date.now() - 10800000),
      read: true
    },
    {
      id: "4",
      type: "job",
      user: { name: "TechCorp", avatar: "", title: "Company" },
      content: "posted a new job that matches your profile: Senior Developer",
      timestamp: new Date(Date.now() - 86400000),
      read: true
    },
    {
      id: "5",
      type: "like",
      user: { name: "David Kim", avatar: "", title: "Data Scientist" },
      content: "liked your comment on Innovation in AI",
      timestamp: new Date(Date.now() - 172800000),
      read: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <ThumbsUp className="w-4 h-4 text-blue-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-green-500" />;
      case 'connection':
        return <UserPlus className="w-4 h-4 text-purple-500" />;
      case 'job':
        return <Briefcase className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout>
      <div className="max-w-4xl">
        <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive">{unreadCount}</Badge>
              )}
            </div>
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                You're all caught up! New notifications will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card key={notification.id} className={`hover:shadow-md transition-shadow cursor-pointer ${
              !notification.read ? 'bg-blue-50 border-l-4 border-l-linkedin-blue' : ''
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      {getNotificationIcon(notification.type)}
                      <p className="text-sm">
                        <span className="font-medium text-gray-900">{notification.user.name}</span>
                        <span className="text-gray-600 ml-1">{notification.content}</span>
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {notification.user.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="w-2 h-2 bg-linkedin-blue rounded-full mt-2"></div>
                  )}
                </div>
                
                {(notification.type === 'connection' || notification.type === 'job') && (
                  <div className="mt-3 flex space-x-2">
                    {notification.type === 'connection' ? (
                      <>
                        <Button size="sm" className="bg-linkedin-blue hover:bg-blue-600">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          Ignore
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="bg-linkedin-blue hover:bg-blue-600">
                        View Job
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
        </div>
      </div>
    </Layout>
  );
}