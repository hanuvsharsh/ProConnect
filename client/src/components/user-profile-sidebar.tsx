import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Edit } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export function UserProfileSidebar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card className="overflow-hidden">
      {/* Cover Photo */}
      <div className="h-20 bg-gradient-to-r from-linkedin-blue to-teal-accent" />
      
      <CardContent className="px-4 pb-4 -mt-10 relative">
        {/* Profile Info */}
        <Avatar className="w-20 h-20 border-4 border-white">
          <AvatarImage src={user.profileImage || ""} alt={user.name} />
          <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <h3 className="mt-2 text-lg font-semibold text-gray-900">{user.name}</h3>
        {user.title && <p className="text-sm text-gray-600">{user.title}</p>}
        {user.location && <p className="text-xs text-gray-500 mt-1">{user.location}</p>}
        
        {/* Stats */}
        <div className="border-t border-gray-200 px-0 py-3 mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Connections</span>
            <span className="font-semibold text-linkedin-blue">0</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Posts</span>
            <span className="font-semibold text-linkedin-blue">0</span>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="border-t border-gray-200 px-0 py-3 space-y-1">
          <Button variant="ghost" className="w-full justify-start p-1 h-auto" asChild>
            <Link href={`/profile/${user.id}`}>
              <User className="w-4 h-4 mr-2" />
              View Profile
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start p-1 h-auto">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
