import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Send } from "lucide-react";
import { PostWithAuthor, CommentWithAuthor } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface PostCardProps {
  post: PostWithAuthor;
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const timeAgo = formatDistanceToNow(new Date(post.createdAt!), { addSuffix: true });

  // Fetch comments
  const { data: comments = [] } = useQuery<CommentWithAuthor[]>({
    queryKey: ['/api/posts', post.id, 'comments'],
    enabled: showComments,
  });

  // Like/unlike mutation
  const likeMutation = useMutation({
    mutationFn: () => apiRequest(`/api/posts/${post.id}/like`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to update like status",
        variant: "destructive"
      });
    }
  });

  // Comment submission
  const commentMutation = useMutation({
    mutationFn: (content: string) => 
      apiRequest(`/api/posts/${post.id}/comments`, {
        method: 'POST',
        body: { content },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/posts', post.id, 'comments'] });
      queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      setCommentText("");
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to post comment",
        variant: "destructive"
      });
    }
  });

  const handleLike = () => {
    if (!user) return;
    likeMutation.mutate();
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleSubmitComment = () => {
    if (!commentText.trim() || !user) return;
    commentMutation.mutate(commentText);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ 
      title: "Copied!", 
      description: "Post link copied to clipboard" 
    });
  };

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
          <Button 
            variant="ghost" 
            className={`flex items-center space-x-2 flex-1 justify-center ${
              post.isLiked ? 'text-linkedin-blue hover:bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={handleLike}
            disabled={likeMutation.isPending}
          >
            <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
            <span>Like</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 flex-1 justify-center"
            onClick={handleComment}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Comment</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 flex-1 justify-center"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </div>
        
        {/* Comments Section */}
        {showComments && (
          <div className="mt-4">
            <Separator className="mb-4" />
            
            {/* Comment Input */}
            {user && (
              <div className="flex space-x-3 mb-4">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.profileImage || ""} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex space-x-2">
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                  <Button
                    size="sm"
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim() || commentMutation.isPending}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.author.profileImage || ""} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="font-semibold text-sm text-gray-900">{comment.author.name}</p>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDistanceToNow(new Date(comment.createdAt!), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}