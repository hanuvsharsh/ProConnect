import { Link, useLocation } from "wouter";
import { Home, Users, MessageCircle, Bell, User, Settings, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";

export function Sidebar() {
  const { user } = useAuth();
  const [location] = useLocation();

  const navigationItems = [
    { href: "/", icon: Home, label: "Home", active: location === "/" },
    { href: "/network", icon: Users, label: "My Network", active: location === "/network" },
    { href: "/messages", icon: MessageCircle, label: "Messaging", active: location === "/messages" },
    { href: "/notifications", icon: Bell, label: "Notifications", active: location === "/notifications" },
    { href: `/profile/${user?.id}`, icon: User, label: "Profile", active: location === `/profile/${user?.id}` },
  ];

  const quickAccess = [
    { href: "#", icon: Briefcase, label: "Jobs" },
    { href: "#", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 flex-shrink-0">
      <div className="sticky top-20 space-y-4">
        {/* User Profile Card */}
        <Card>
          <CardContent className="p-4 text-center">
            <Avatar className="w-16 h-16 mx-auto mb-3">
              <AvatarImage src={user?.profileImage || ""} alt={user?.name || ""} />
              <AvatarFallback className="text-lg">{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-gray-900">{user?.name || "User"}</h3>
            {user?.title && <p className="text-sm text-gray-600 mb-2">{user.title}</p>}
            <Link href={`/profile/${user?.id}`}>
              <Button variant="outline" size="sm" className="w-full">
                View Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Navigation Menu */}
        <Card>
          <CardContent className="p-2">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={item.active ? "secondary" : "ghost"}
                    className={`w-full justify-start text-left ${
                      item.active 
                        ? "bg-linkedin-blue/10 text-linkedin-blue hover:bg-linkedin-blue/20" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <Card>
          <CardContent className="p-2">
            <h4 className="text-sm font-medium text-gray-900 px-3 py-2">Quick Access</h4>
            <Separator className="mb-2" />
            <nav className="space-y-1">
              {quickAccess.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-gray-700 hover:bg-gray-100"
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Professional Stats */}
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Your Dashboard</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Profile views</span>
                <span className="font-medium text-linkedin-blue">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Connections</span>
                <span className="font-medium text-linkedin-blue">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Post impressions</span>
                <span className="font-medium text-linkedin-blue">128</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}