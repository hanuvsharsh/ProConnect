import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const suggestedConnections = [
  {
    id: "1",
    name: "David Park",
    title: "Financial Analyst at Goldman Sachs",
    mutualConnections: 12,
    profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "2",
    name: "Lisa Wang",
    title: "UX Designer at Adobe",
    mutualConnections: 8,
    profileImage: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    id: "3",
    name: "Alex Thompson",
    title: "Sales Director at Salesforce",
    mutualConnections: 15,
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
];

export function SuggestedConnections() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">People you may know</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestedConnections.map((connection) => (
          <div key={connection.id} className="flex items-start space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={connection.profileImage} alt={connection.name} />
              <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">{connection.name}</h4>
              <p className="text-xs text-gray-600 truncate">{connection.title}</p>
              <p className="text-xs text-gray-500">{connection.mutualConnections} mutual connections</p>
              <Button 
                size="sm" 
                className="mt-2 bg-linkedin-blue hover:bg-blue-700 text-xs px-3 py-1 h-auto"
              >
                Connect
              </Button>
            </div>
          </div>
        ))}
        <div className="pt-3 border-t border-gray-200">
          <Button variant="link" className="text-sm text-linkedin-blue p-0">
            View all recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
