import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { PostCreator } from "@/components/post-creator";
import { PostCard } from "@/components/post-card";
import { SuggestedConnections } from "@/components/suggested-connections";
import { TrendingTopics } from "@/components/trending-topics";
import { PostWithAuthor } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: posts, isLoading } = useQuery<PostWithAuthor[]>({
    queryKey: ["/api/posts"],
  });

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <section className="lg:col-span-2">
            <PostCreator />
            
            <div className="space-y-6">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-start space-x-3">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))
              ) : posts && posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <p className="text-gray-500">No posts yet. Be the first to share something!</p>
                </div>
              )}
            </div>
        </section>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <SuggestedConnections />
          <TrendingTopics />
        </aside>
      </div>
    </Layout>
  );
}
