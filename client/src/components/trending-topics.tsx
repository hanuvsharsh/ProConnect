import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trendingTopics = [
  { title: "#RemoteWork", posts: "1,234 posts this week" },
  { title: "#ArtificialIntelligence", posts: "987 posts this week" },
  { title: "#DigitalTransformation", posts: "756 posts this week" },
  { title: "#Sustainability", posts: "623 posts this week" },
  { title: "#Leadership", posts: "589 posts this week" },
];

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Trending in your network</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {trendingTopics.map((topic, index) => (
          <div key={index} className="cursor-pointer hover:bg-gray-50 p-2 rounded-md">
            <h4 className="text-sm font-semibold text-gray-900">{topic.title}</h4>
            <p className="text-xs text-gray-600">{topic.posts}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
