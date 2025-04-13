
import { useState, useEffect } from "react";
import {
  FileText, Paperclip, Clock, Check, Calendar, AlertTriangle, Image, 
  Upload, MessageSquare, Settings, ChevronRight, PlusCircle, User
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    name: "Residential Renovation",
    address: "123 Main St, San Francisco, CA",
    status: "In Progress",
    progress: 60,
    startDate: "Jan 15, 2025",
    endDate: "May 30, 2025",
    budget: 150000,
    spent: 90000,
    team: [
      {
        id: 1,
        name: "David Chen",
        role: "Civil Engineer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 2,
        name: "Sophia Rodriguez",
        role: "Interior Designer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 3,
        name: "Marcus Johnson",
        role: "Construction Manager",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      }
    ],
    timeline: [
      {
        id: 1,
        title: "Design Planning",
        description: "Architectural plans and interior design concepts finalized",
        date: "Jan 15 - Feb 10, 2025",
        status: "completed",
      },
      {
        id: 2,
        title: "Foundation Work",
        description: "Reinforcement of existing foundation and structural modifications",
        date: "Feb 15 - Mar 20, 2025",
        status: "completed",
      },
      {
        id: 3,
        title: "Framing and Electrical",
        description: "Wall framing, electrical wiring and plumbing installation",
        date: "Mar 25 - Apr 30, 2025",
        status: "in-progress",
      },
      {
        id: 4,
        title: "Interior Finishing",
        description: "Drywall, painting, flooring and cabinet installation",
        date: "May 5 - May 30, 2025",
        status: "pending",
      }
    ],
    documents: [
      {
        id: 1,
        name: "Floor Plans.pdf",
        size: "3.5 MB",
        uploaded: "Jan 10, 2025",
        type: "pdf",
      },
      {
        id: 2,
        name: "Material Specifications.docx",
        size: "1.2 MB",
        uploaded: "Jan 18, 2025",
        type: "docx",
      },
      {
        id: 3,
        name: "Contract Agreement.pdf",
        size: "2.8 MB",
        uploaded: "Jan 5, 2025",
        type: "pdf",
      },
      {
        id: 4,
        name: "Design Renderings.png",
        size: "5.7 MB",
        uploaded: "Feb 2, 2025",
        type: "image",
      }
    ],
    notes: [
      {
        id: 1,
        text: "Client requested a change in kitchen countertop material from granite to quartz.",
        date: "Mar 5, 2025",
        author: "Sophia Rodriguez",
      },
      {
        id: 2,
        text: "Additional support beam needed for the expanded living room area.",
        date: "Mar 12, 2025",
        author: "David Chen",
      },
      {
        id: 3,
        text: "Expecting a delay in tile delivery. Alternative suppliers being contacted.",
        date: "Apr 2, 2025",
        author: "Marcus Johnson",
      }
    ]
  },
  {
    id: 2,
    name: "Backyard Landscaping",
    address: "123 Main St, San Francisco, CA",
    status: "Planning",
    progress: 25,
    startDate: "Apr 10, 2025",
    endDate: "Jun 15, 2025",
    budget: 45000,
    spent: 12000,
    team: [
      {
        id: 6,
        name: "Linda Kim",
        role: "Landscape Designer",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        id: 7,
        name: "Robert Garcia",
        role: "Hardscape Specialist",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      }
    ],
    timeline: [
      {
        id: 1,
        title: "Design Concept",
        description: "Landscape design planning and concept development",
        date: "Apr 10 - Apr 25, 2025",
        status: "completed",
      },
      {
        id: 2,
        title: "Site Preparation",
        description: "Clear existing vegetation and grade the area",
        date: "Apr 30 - May 10, 2025",
        status: "in-progress",
      },
      {
        id: 3,
        title: "Hardscape Installation",
        description: "Patio, walkways, and retaining walls",
        date: "May 15 - May 30, 2025",
        status: "pending",
      },
      {
        id: 4,
        title: "Planting and Finishing",
        description: "Install plants, trees, and final landscaping elements",
        date: "Jun 1 - Jun 15, 2025",
        status: "pending",
      }
    ],
    documents: [
      {
        id: 1,
        name: "Landscape Design.pdf",
        size: "4.2 MB",
        uploaded: "Apr 5, 2025",
        type: "pdf",
      },
      {
        id: 2,
        name: "Plant Selection.xlsx",
        size: "1.8 MB",
        uploaded: "Apr 12, 2025",
        type: "xlsx",
      }
    ],
    notes: [
      {
        id: 1,
        text: "Client would like to include a water feature in the final design.",
        date: "Apr 18, 2025",
        author: "Linda Kim",
      },
      {
        id: 2,
        text: "Soil analysis shows need for additional drainage solutions.",
        date: "Apr 22, 2025",
        author: "Robert Garcia",
      }
    ]
  }
];

const MyProjects = () => {
  const [activeProject, setActiveProject] = useState(mockProjects[0]);
  const [activeTab, setActiveTab] = useState("overview");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "planning":
        return "bg-blue-100 text-blue-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <div className="bg-green-100 p-2 rounded-full"><Check className="h-5 w-5 text-green-600" /></div>;
      case "in-progress":
        return <div className="bg-yellow-100 p-2 rounded-full"><Clock className="h-5 w-5 text-yellow-600" /></div>;
      case "pending":
        return <div className="bg-gray-100 p-2 rounded-full"><Calendar className="h-5 w-5 text-gray-600" /></div>;
      default:
        return <div className="bg-gray-100 p-2 rounded-full"><AlertTriangle className="h-5 w-5 text-gray-600" /></div>;
    }
  };

  const handleFileUpload = () => {
    toast({
      title: "File upload",
      description: "Your file has been successfully uploaded to the project.",
    });
  };

  const handleAddNote = () => {
    toast({
      title: "Note added",
      description: "Your note has been added to the project timeline.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">My Projects</h1>
              <p className="text-gray-500">
                Track and manage your ongoing construction and renovation projects
              </p>
            </div>
            <Button className="mt-4 md:mt-0 flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> New Project
            </Button>
          </div>
          
          {/* Project Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {mockProjects.map((project) => (
              <Card 
                key={project.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  activeProject.id === project.id ? "border-primary border-2" : ""
                }`}
                onClick={() => setActiveProject(project)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-heading font-semibold text-lg">{project.name}</h3>
                      <p className="text-gray-500 text-sm">{project.address}</p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  
                  <div className="mt-3 flex justify-between text-sm text-gray-500">
                    <div>
                      <span className="mr-3">Start: {project.startDate}</span>
                      <span>End: {project.endDate}</span>
                    </div>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="h-6 w-6 border-2 border-white">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs border-2 border-white">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Project Details */}
          <Card className="mb-8">
            <CardHeader className="pb-0">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <Badge className={getStatusColor(activeProject.status)}>
                    {activeProject.status}
                  </Badge>
                  <CardTitle className="text-2xl">{activeProject.name}</CardTitle>
                  <p className="text-gray-500 mt-1">{activeProject.address}</p>
                </div>
                
                <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> Team Chat
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" /> Settings
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="mr-3">
                      <span className="font-medium">Budget:</span> ${activeProject.budget.toLocaleString()}
                    </span>
                    <span>
                      <span className="font-medium">Spent:</span> ${activeProject.spent.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold text-lg mb-4">Project Timeline</h3>
                      <div className="space-y-6">
                        {activeProject.timeline.map((item, index) => (
                          <div key={item.id} className="flex">
                            <div className="mr-4">
                              {getTimelineIcon(item.status)}
                              {index < activeProject.timeline.length - 1 && (
                                <div className="w-px h-full bg-gray-200 mx-auto mt-2"></div>
                              )}
                            </div>
                            <div className={`pb-6 ${
                              index === activeProject.timeline.length - 1 ? "pb-0" : ""
                            }`}>
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                              <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Project Team</h3>
                      <div className="space-y-4">
                        {activeProject.team.map((member) => (
                          <div key={member.id} className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={member.image} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{member.name}</p>
                              <p className="text-gray-500 text-sm">{member.role}</p>
                            </div>
                            <button className="text-primary hover:text-primary/80">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="mt-6">
                  <div className="max-w-3xl">
                    <h3 className="font-semibold text-lg mb-4">Project Timeline</h3>
                    <div className="space-y-6">
                      {activeProject.timeline.map((item, index) => (
                        <div key={item.id} className="flex">
                          <div className="mr-4">
                            {getTimelineIcon(item.status)}
                            {index < activeProject.timeline.length - 1 && (
                              <div className="w-px h-full bg-gray-200 mx-auto mt-2"></div>
                            )}
                          </div>
                          <div className={`pb-6 ${
                            index === activeProject.timeline.length - 1 ? "pb-0" : ""
                          }`}>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                            
                            {item.status === "in-progress" && (
                              <div className="mt-3 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                                <p className="text-sm font-medium text-yellow-800">Currently in progress</p>
                                <p className="text-xs text-yellow-700 mt-1">
                                  Work is currently ongoing for this phase of the project.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="team" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeProject.team.map((member) => (
                      <Card key={member.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center mb-4">
                            <Avatar className="h-20 w-20 mb-3">
                              <AvatarImage src={member.image} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-primary">{member.role}</p>
                          </div>
                          
                          <div className="flex justify-center gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <User className="h-4 w-4" /> Profile
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <MessageSquare className="h-4 w-4" /> Message
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Card className="border-dashed">
                      <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center">
                        <PlusCircle className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-gray-500">Add Team Member</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="mt-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                    <h3 className="font-semibold text-lg">Project Documents</h3>
                    <Button className="mt-2 md:mt-0 flex items-center gap-2" onClick={handleFileUpload}>
                      <Upload className="h-4 w-4" /> Upload Files
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {activeProject.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                        {doc.type === "pdf" ? (
                          <FileText className="h-8 w-8 text-red-500 mr-3" />
                        ) : doc.type === "image" ? (
                          <Image className="h-8 w-8 text-blue-500 mr-3" />
                        ) : doc.type === "docx" ? (
                          <FileText className="h-8 w-8 text-blue-600 mr-3" />
                        ) : doc.type === "xlsx" ? (
                          <FileText className="h-8 w-8 text-green-600 mr-3" />
                        ) : (
                          <Paperclip className="h-8 w-8 text-gray-500 mr-3" />
                        )}
                        
                        <div className="flex-1">
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-gray-500 text-xs">
                            {doc.size} • Uploaded on {doc.uploaded}
                          </p>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    ))}
                    
                    <div className="flex items-center justify-center p-6 rounded-lg border border-dashed">
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Drag and drop files here or click to upload</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="mt-6">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                    <h3 className="font-semibold text-lg">Project Notes</h3>
                    <Button className="mt-2 md:mt-0 flex items-center gap-2" onClick={handleAddNote}>
                      <PlusCircle className="h-4 w-4" /> Add Note
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {activeProject.notes.map((note) => (
                      <div key={note.id} className="p-4 rounded-lg border">
                        <p className="text-gray-700">{note.text}</p>
                        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                          <span>Added by {note.author}</span>
                          <span>{note.date}</span>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-6 rounded-lg border border-dashed flex items-center justify-center">
                      <div className="text-center">
                        <PlusCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Add a new note about the project</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyProjects;
