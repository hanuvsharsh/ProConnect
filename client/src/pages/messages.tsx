import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, Search } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

import { Layout } from "@/components/layout";

export function MessagesPage() {
  const { user } = useAuth();
  const [messageText, setMessageText] = useState("");

  // Mock conversation data for demo
  const conversations = [
    {
      id: "1",
      name: "Sarah Chen",
      title: "Product Manager at Tech Corp",
      lastMessage: "Thanks for connecting! Would love to chat about the project.",
      timestamp: "2h",
      unread: true,
      avatar: ""
    },
    {
      id: "2", 
      name: "Mike Johnson",
      title: "Software Engineer",
      lastMessage: "The meeting went great, let's follow up next week.",
      timestamp: "1d",
      unread: false,
      avatar: ""
    }
  ];

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  // Mock messages for selected conversation
  const messages = [
    {
      id: "1",
      senderId: selectedConversation.id,
      senderName: selectedConversation.name,
      content: "Hi! Thanks for connecting with me on ProConnect.",
      timestamp: new Date(Date.now() - 3600000),
      isOwnMessage: false
    },
    {
      id: "2",
      senderId: user?.id || "",
      senderName: user?.name || "",
      content: "Hello! Great to connect with you too. I saw your recent post about product strategy.",
      timestamp: new Date(Date.now() - 3000000),
      isOwnMessage: true
    },
    {
      id: "3",
      senderId: selectedConversation.id,
      senderName: selectedConversation.name,
      content: "Thanks for connecting! Would love to chat about the project.",
      timestamp: new Date(Date.now() - 2700000),
      isOwnMessage: false
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message via API
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout>
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Messages</span>
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                    selectedConversation.id === conversation.id
                      ? 'border-linkedin-blue bg-blue-50'
                      : 'border-transparent'
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conversation.avatar} alt={conversation.name} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.name}
                        </p>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-1 truncate">{conversation.title}</p>
                      <p className={`text-sm truncate ${
                        conversation.unread ? 'font-medium text-gray-900' : 'text-gray-600'
                      }`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-linkedin-blue rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                <p className="text-sm text-gray-600">{selectedConversation.title}</p>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${
                    message.isOwnMessage
                      ? 'bg-linkedin-blue text-white'
                      : 'bg-gray-100 text-gray-900'
                  } rounded-lg px-4 py-2`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="bg-linkedin-blue hover:bg-blue-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
        </div>
      </div>
    </Layout>
  );
}