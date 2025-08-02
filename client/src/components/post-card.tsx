import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { PostWithAuthor } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: PostWithAuthor;
}

export function PostCard({ post }: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt!), { addSuffix: true });

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* Post Header */}
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={post.author.profileImage || ""} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
            {post.author.title && <p className="text-sm text-gray-600">{post.author.title}</p>}
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Post Content */}
        <div className="mt-4">
          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </div>
      </CardContent>
      
      {/* Post Actions */}
      <div className="border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>{post.likeCount || 0} likes</span>
          <span>{post.commentCount || 0} comments</span>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 flex-1 justify-center">
            <ThumbsUp className="w-4 h-4" />
            <span>Like</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 flex-1 justify-center">
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 flex-1 justify-center">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
