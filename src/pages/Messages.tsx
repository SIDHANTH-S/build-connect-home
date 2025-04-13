
import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

// Mock chat data
const mockChats = [
  {
    id: 1,
    name: "David Chen",
    role: "Civil Engineer",
    lastMessage: "The foundation plans look good. Let's discuss details.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    messages: [
      { id: 1, sender: "David Chen", text: "Hi there, I've reviewed the project specs.", timestamp: "10:30 AM" },
      { id: 2, sender: "You", text: "Great, can we discuss the timeline?", timestamp: "10:35 AM" },
    ]
  },
  {
    id: 2,
    name: "Sophia Rodriguez",
    role: "Interior Designer",
    lastMessage: "I've updated the material selections.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    messages: [
      { id: 1, sender: "Sophia Rodriguez", text: "Here are the updated design concepts.", timestamp: "11:15 AM" },
    ]
  }
];

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Simulate adding a message (in a real app, this would be an API call)
      const newMessage = {
        id: selectedChat.messages.length + 1,
        sender: 'You',
        text: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setSelectedChat(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage]
      }));
      
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat List */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Messages</h2>
            {mockChats.map(chat => (
              <Card 
                key={chat.id} 
                className={`cursor-pointer ${selectedChat.id === chat.id ? 'border-primary' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <CardContent className="p-4 flex items-center">
                  <Avatar className="mr-4">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{chat.name}</h3>
                    <p className="text-sm text-gray-500">{chat.role}</p>
                    <p className="text-xs text-gray-400 mt-1">{chat.lastMessage}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chat Window */}
          <div className="md:col-span-2 flex flex-col">
            <Card className="flex-grow flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center">
                  <Avatar className="mr-4">
                    <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                    <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedChat.name}</CardTitle>
                    <p className="text-sm text-gray-500">{selectedChat.role}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
                {selectedChat.messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`
                        max-w-[70%] p-3 rounded-lg 
                        ${message.sender === 'You' 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-black'}
                      `}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              
              <div className="p-4 border-t flex items-center">
                <Input 
                  placeholder="Type a message..." 
                  className="mr-2"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  variant="default" 
                  size="icon" 
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
