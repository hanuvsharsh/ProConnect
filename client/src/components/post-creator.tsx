import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Image, Hash } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function PostCreator() {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: async (postContent: string) => {
      const response = await apiRequest("POST", "/api/posts", {
        content: postContent,
      });
      return response.json();
    },
    onSuccess: () => {
      setContent("");
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Post created successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!content.trim()) {
      toast({
        title: "Please enter some content",
        variant: "destructive",
      });
      return;
    }
    createPostMutation.mutate(content);
  };

  if (!user) return null;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.profileImage || ""} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-left justify-start rounded-full text-gray-500 hover:bg-gray-50"
                >
                  What's on your mind, {user.name.split(' ')[0]}?
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create a post</DialogTitle>
                </DialogHeader>
                <div className="flex items-start space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.profileImage || ""} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                    {user.title && <p className="text-sm text-gray-600">{user.title}</p>}
                  </div>
                </div>
                <Textarea
                  placeholder="What do you want to talk about?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] resize-none border-none p-0 focus-visible:ring-0"
                />
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm">
                      <Image className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Hash className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!content.trim() || createPostMutation.isPending}
                    className="bg-linkedin-blue hover:bg-blue-700"
                  >
                    {createPostMutation.isPending ? "Posting..." : "Post"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <div className="flex items-center justify-between mt-3">
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100">
                <Edit className="w-4 h-4 text-linkedin-blue" />
                <span className="text-sm font-medium">Write article</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100">
                <Image className="w-4 h-4 text-success-green" />
                <span className="text-sm font-medium">Add photo</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
