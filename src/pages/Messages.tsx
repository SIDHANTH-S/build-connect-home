
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Search,
  User,
  Send,
  Paperclip,
  Image as ImageIcon,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Clock,
  CheckCheck,
  Check,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    recipient: {
      id: 1,
      name: "David Chen",
      role: "Civil Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      online: true,
    },
    unread: 2,
    lastMessage: "Let me send you the updated floor plans",
    lastMessageTime: "10:32 AM",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hello! I've reviewed your project details and I think I can help with the structural engineering aspects.",
        time: "Yesterday, 4:30 PM",
        status: "read",
      },
      {
        id: 2,
        sender: "me",
        text: "Great! I'm looking for someone to review our house plans and make sure they're structurally sound.",
        time: "Yesterday, 4:45 PM",
        status: "read",
      },
      {
        id: 3,
        sender: "them",
        text: "I can definitely do that. Could you share more details about the project scope?",
        time: "Yesterday, 5:15 PM",
        status: "read",
      },
      {
        id: 4,
        sender: "me",
        text: "We're planning a two-story home with a basement. About 2,500 sq ft total. The site is on a slight slope.",
        time: "Yesterday, 5:30 PM",
        status: "read",
      },
      {
        id: 5,
        sender: "them",
        text: "I see. For a project like this, I'll need to review the architectural drawings and site survey to provide proper recommendations.",
        time: "Yesterday, 6:00 PM",
        status: "read",
      },
      {
        id: 6,
        sender: "them",
        text: "Let me send you the updated floor plans",
        time: "10:32 AM",
        status: "sent",
      },
    ],
  },
  {
    id: 2,
    recipient: {
      id: 2,
      name: "Sophia Rodriguez",
      role: "Interior Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      online: false,
    },
    unread: 0,
    lastMessage: "The material samples will arrive tomorrow",
    lastMessageTime: "Yesterday",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hi there! I saw your project request for interior design help. I specialize in modern and minimalist designs.",
        time: "Monday, 9:15 AM",
        status: "read",
      },
      {
        id: 2,
        sender: "me",
        text: "Hi Sophia! That's exactly what we're looking for. We want to redesign our living room and kitchen area.",
        time: "Monday, 10:20 AM",
        status: "read",
      },
      {
        id: 3,
        sender: "them",
        text: "Perfect! I'd love to hear more about your vision. Do you have any specific colors or styles in mind?",
        time: "Monday, 11:05 AM",
        status: "read",
      },
      {
        id: 4,
        sender: "me",
        text: "We're thinking neutral tones with some accent colors. We prefer clean lines and functional design.",
        time: "Monday, 1:30 PM",
        status: "read",
      },
      {
        id: 5,
        sender: "them",
        text: "That sounds great! I'll prepare some mood boards based on your preferences. I also have some material samples I can show you.",
        time: "Monday, 2:45 PM",
        status: "read",
      },
      {
        id: 6,
        sender: "me",
        text: "That would be excellent! When can we expect to see the initial concepts?",
        time: "Yesterday, 8:10 AM",
        status: "read",
      },
      {
        id: 7,
        sender: "them",
        text: "The material samples will arrive tomorrow",
        time: "Yesterday, 9:30 AM",
        status: "read",
      },
    ],
  },
  {
    id: 3,
    recipient: {
      id: 3,
      name: "BuildPro Supplies",
      role: "Material Supplier",
      image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      online: true,
    },
    unread: 0,
    lastMessage: "Your order #BPS-2025-04189 has been shipped",
    lastMessageTime: "Apr 10",
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Thank you for your order #BPS-2025-04189. We've received your payment and are processing your materials.",
        time: "Apr 8, 10:15 AM",
        status: "read",
      },
      {
        id: 2,
        sender: "me",
        text: "Great! When can I expect the delivery?",
        time: "Apr 8, 11:20 AM",
        status: "read",
      },
      {
        id: 3,
        sender: "them",
        text: "We estimate delivery within 2-3 business days. We'll send you a tracking number once it ships.",
        time: "Apr 8, 1:45 PM",
        status: "read",
      },
      {
        id: 4,
        sender: "me",
        text: "Perfect, thank you! Is it possible to add a few more items to my order?",
        time: "Apr 9, 9:10 AM",
        status: "read",
      },
      {
        id: 5,
        sender: "them",
        text: "I'm sorry, but your order has already been processed. You would need to place a new order for additional items.",
        time: "Apr 9, 10:30 AM",
        status: "read",
      },
      {
        id: 6,
        sender: "me",
        text: "I understand. I'll place a new order then. Thanks for the information!",
        time: "Apr 9, 11:15 AM",
        status: "read",
      },
      {
        id: 7,
        sender: "them",
        text: "Your order #BPS-2025-04189 has been shipped",
        time: "Apr 10, 2:30 PM",
        status: "read",
      },
    ],
  },
];

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState("");
  const [filteredConversations, setFilteredConversations] = useState(mockConversations);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter conversations based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredConversations(mockConversations);
    } else {
      const results = mockConversations.filter((conversation) =>
        conversation.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conversation.recipient.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredConversations(results);
    }
  }, [searchTerm]);

  // Scroll messages to bottom when active conversation changes
  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [activeConversation]);

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    // In a real app, this would send the message to an API
    toast({
      description: "Message sent",
    });
    
    setMessageText("");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return <Check className="h-3 w-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Messages</h1>
            <p className="text-gray-500">
              Communicate with professionals and suppliers for your building project
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {/* Conversations Sidebar */}
              <div className="border-r">
                <div className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search messages..."
                      className="pl-9 pr-4"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <Tabs defaultValue="all" className="w-full">
                  <div className="px-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="unread">Unread</TabsTrigger>
                      <TabsTrigger value="archive">Archive</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="all" className="mt-0">
                    <div className="divide-y max-h-[calc(100vh-240px)] overflow-y-auto">
                      {filteredConversations.map((conversation) => (
                        <div
                          key={conversation.id}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            activeConversation.id === conversation.id ? "bg-gray-50" : ""
                          }`}
                          onClick={() => setActiveConversation(conversation)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={conversation.recipient.image} alt={conversation.recipient.name} />
                                <AvatarFallback>{conversation.recipient.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {conversation.recipient.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                <div className="truncate font-medium">{conversation.recipient.name}</div>
                                <div className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.lastMessageTime}</div>
                              </div>
                              
                              <div className="text-sm text-gray-500 truncate">{conversation.recipient.role}</div>
                              
                              <div className="flex justify-between items-center mt-1">
                                <div className="text-sm truncate">{conversation.lastMessage}</div>
                                {conversation.unread > 0 && (
                                  <Badge variant="default" className="rounded-full h-5 w-5 p-0 flex items-center justify-center ml-2">
                                    {conversation.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="unread" className="mt-0">
                    <div className="p-6 text-center text-gray-500">
                      <p>Unread messages will appear here</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="archive" className="mt-0">
                    <div className="p-6 text-center text-gray-500">
                      <p>Archived conversations will appear here</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Main Chat Area */}
              <div className="md:col-span-2 lg:col-span-3 flex flex-col h-[calc(100vh-240px)]">
                {/* Chat Header */}
                <div className="border-b p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={activeConversation.recipient.image} alt={activeConversation.recipient.name} />
                      <AvatarFallback>{activeConversation.recipient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="font-medium">{activeConversation.recipient.name}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{activeConversation.recipient.role}</span>
                        {activeConversation.recipient.online && (
                          <Badge variant="outline" className="ml-2 text-xs px-1 py-0 border-green-500 text-green-600">
                            Online
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                        <DropdownMenuItem>Archive Chat</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Block Contact</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Messages Container */}
                <div id="message-container" className="flex-grow p-4 overflow-y-auto space-y-4">
                  <div className="text-center">
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      {format(new Date(), "MMMM d, yyyy")}
                    </span>
                  </div>
                  
                  {activeConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "them" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src={activeConversation.recipient.image} alt={activeConversation.recipient.name} />
                          <AvatarFallback>{activeConversation.recipient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className="max-w-[75%]">
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === "me"
                              ? "bg-primary text-white rounded-br-none"
                              : "bg-gray-100 text-gray-800 rounded-bl-none"
                          }`}
                        >
                          <p>{message.text}</p>
                        </div>
                        
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span>{message.time}</span>
                          {message.sender === "me" && (
                            <span className="ml-1">{getStatusIcon(message.status)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-end gap-2">
                    <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full flex-shrink-0">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    
                    <div className="flex-grow relative">
                      <Input
                        type="text"
                        placeholder="Type your message..."
                        className="pr-10 py-3 rounded-full"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
                        <Smile className="h-5 w-5 text-gray-400" />
                      </Button>
                    </div>
                    
                    <Button className="rounded-full flex-shrink-0" onClick={handleSendMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messages;
