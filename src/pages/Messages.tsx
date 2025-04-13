
import { useState, useEffect } from "react";
import { Search, Send, Paperclip, Image, File, MoreVertical, Check, Clock, Phone, Video } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock data for conversations
const mockContacts = [
  {
    id: 1,
    name: "David Chen",
    role: "Civil Engineer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "I've reviewed the structural plans and everything looks good to proceed.",
    time: "10:23 AM",
    unread: 2,
    online: true,
    status: "Active"
  },
  {
    id: 2,
    name: "Sophia Rodriguez",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "Here are the color palette options for your living room.",
    time: "Yesterday",
    unread: 0,
    online: true,
    status: "Active"
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Construction Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "The crew will be on site tomorrow morning to begin foundation work.",
    time: "Yesterday",
    unread: 0,
    online: false,
    status: "Away"
  },
  {
    id: 4,
    name: "Linda Kim",
    role: "Landscape Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastMessage: "The plants will be delivered next Tuesday. Please confirm if that works for you.",
    time: "Monday",
    unread: 0,
    online: false,
    status: "Offline"
  },
  {
    id: 5,
    name: "Residential Renovation Team",
    role: "Group Chat",
    image: "",
    members: ["David Chen", "Sophia Rodriguez", "Marcus Johnson", "You"],
    lastMessage: "Marcus: We need to discuss the timeline for next phase.",
    time: "Monday",
    unread: 3,
    online: true,
    status: "Active",
    isGroup: true
  }
];

// Mock conversation with David Chen
const davidConversation = [
  {
    id: 1,
    sender: "David Chen",
    senderImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    message: "Hi there! I've received your project details and reviewed the initial plans.",
    time: "10:02 AM",
    status: "read"
  },
  {
    id: 2,
    sender: "David Chen",
    senderImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    message: "I have a few questions about the load-bearing walls you want to remove. It might require additional support structures.",
    time: "10:03 AM",
    status: "read"
  },
  {
    id: 3,
    sender: "You",
    message: "Thanks for looking into this so quickly. Yes, I'm flexible on the design if we need to add support beams.",
    time: "10:10 AM",
    status: "sent"
  },
  {
    id: 4,
    sender: "You",
    message: "Do you think this will significantly impact the budget?",
    time: "10:10 AM",
    status: "sent"
  },
  {
    id: 5,
    sender: "David Chen",
    senderImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    message: "It will add some cost, but not substantially. I've reviewed the structural plans and everything looks good to proceed with the modifications I'm suggesting.",
    time: "10:23 AM",
    status: "read"
  },
  {
    id: 6,
    sender: "David Chen",
    senderImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    message: "I can send over a revised quote later today. Would that work for you?",
    time: "10:23 AM",
    status: "delivered"
  }
];

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(mockContacts);
  const [conversation, setConversation] = useState(davidConversation);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter contacts based on search value
  useEffect(() => {
    const filtered = mockContacts.filter(
      contact => contact.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                (contact.role && contact.role.toLowerCase().includes(searchValue.toLowerCase()))
    );
    setFilteredContacts(filtered);
  }, [searchValue]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: conversation.length + 1,
      sender: "You",
      message: inputValue,
      time: "Just now",
      status: "sending"
    };
    
    setConversation([...conversation, newMessage]);
    setInputValue("");
    
    // Simulate message sent
    setTimeout(() => {
      setConversation(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? {...msg, status: "sent"} : msg
        )
      );
      
      toast({
        description: "Message sent successfully",
      });
    }, 500);
  };

  const getStatusIndicator = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleAttachFile = () => {
    toast({
      description: "File attachment feature coming soon!",
    });
  };

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="h-4 w-4 text-gray-400" />;
      case "delivered":
        return <Check className="h-4 w-4 text-gray-400" />;
      case "read":
        return <Check className="h-4 w-4 text-primary" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {/* Sidebar - Contacts */}
              <div className="md:col-span-1 border-r">
                <div className="p-4">
                  <h2 className="font-heading font-bold text-lg mb-4">Messages</h2>
                  
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      type="text"
                      placeholder="Search conversations..."
                      className="pl-9"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                  
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <div className="space-y-1 pr-2">
                      {filteredContacts.map((contact) => (
                        <div key={contact.id}>
                          <button
                            className={`w-full text-left p-3 rounded-lg transition-colors ${
                              selectedContact.id === contact.id 
                                ? "bg-primary/10" 
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() => setSelectedContact(contact)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative">
                                {contact.isGroup ? (
                                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-medium">{contact.name.split(' ').map(n => n[0]).join('')}</span>
                                  </div>
                                ) : (
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={contact.image} alt={contact.name} />
                                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                )}
                                {contact.online && (
                                  <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusIndicator(contact.status)} border-2 border-white`}></span>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                  <h4 className="font-medium truncate">{contact.name}</h4>
                                  <span className="text-xs text-gray-500">{contact.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                              </div>
                              
                              {contact.unread > 0 && (
                                <Badge variant="default" className="rounded-full h-5 min-w-[1.25rem] flex items-center justify-center px-1">
                                  {contact.unread}
                                </Badge>
                              )}
                            </div>
                          </button>
                          <Separator className="my-1" />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              
              {/* Main Chat Area */}
              <div className="md:col-span-2 lg:col-span-3 flex flex-col h-[calc(100vh-170px)]">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      {selectedContact.isGroup ? (
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">{selectedContact.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                      ) : (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedContact.image} alt={selectedContact.name} />
                          <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      {selectedContact.online && (
                        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${getStatusIndicator(selectedContact.status)} border-2 border-white`}></span>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{selectedContact.name}</h3>
                      {selectedContact.isGroup ? (
                        <p className="text-xs text-gray-500">{selectedContact.members.length} members</p>
                      ) : (
                        <p className="text-xs text-gray-500">{selectedContact.role} • {selectedContact.online ? selectedContact.status : "Offline"}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {conversation.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender !== "You" && (
                          <Avatar className="h-8 w-8 mr-2 mt-1">
                            <AvatarImage src={message.senderImage} alt={message.sender} />
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div className={`max-w-[75%] ${message.sender === "You" ? "flex items-end flex-col" : ""}`}>
                          <Card className={`${
                            message.sender === "You" 
                              ? "bg-primary text-white" 
                              : "bg-gray-100"
                          }`}>
                            <CardContent className="p-3">
                              <p className={`text-sm ${message.sender === "You" ? "text-white" : "text-gray-800"}`}>
                                {message.message}
                              </p>
                            </CardContent>
                          </Card>
                          
                          <div className="flex items-center mt-1 text-xs text-gray-500 space-x-1">
                            <span>{message.time}</span>
                            {message.sender === "You" && (
                              <span>{getMessageStatus(message.status)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                      onClick={handleAttachFile}
                    >
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                      onClick={handleAttachFile}
                    >
                      <Image className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                      onClick={handleAttachFile}
                    >
                      <File className="h-5 w-5 text-gray-500" />
                    </Button>
                    
                    <Input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-1"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    
                    <Button 
                      className="rounded-full aspect-square p-2" 
                      size="icon"
                      onClick={handleSendMessage}
                    >
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
