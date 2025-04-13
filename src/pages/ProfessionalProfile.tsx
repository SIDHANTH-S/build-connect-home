
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { 
  Star, MapPin, Calendar, Briefcase, Clock, Award, 
  Phone, Mail, Check, Clipboard, Image, Download 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

// Mock data for professionals
const mockProfessionals = [
  {
    id: "1",
    name: "David Chen",
    profession: "Civil Engineer",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    tags: ["Structural", "Residential", "Commercial", "Sustainable"],
    hourlyRate: 85,
    bio: "Civil engineer with over 10 years of experience specializing in structural engineering for residential and commercial projects. Focused on sustainable and earthquake-resistant designs.",
    experience: 10,
    portfolio: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    education: "Master of Engineering, Stanford University",
    languages: ["English", "Mandarin"],
    certifications: ["Professional Engineer (PE)", "LEED Certified Professional"],
    contactInfo: {
      email: "david.chen@example.com",
      phone: "+1 (555) 123-4567"
    },
    reviewDetails: [
      {
        user: "Sarah M.",
        rating: 5,
        date: "March 15, 2025",
        comment: "David was professional, thorough, and went above and beyond in helping us with our home renovation structural plans. Highly recommended!",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        user: "Michael T.",
        rating: 4,
        date: "February 3, 2025",
        comment: "Great experience working with David on our commercial building project. He provided excellent insights and solutions.",
        userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        user: "Jennifer L.",
        rating: 5,
        date: "January 12, 2025",
        comment: "David helped us design a sustainable addition to our home. His knowledge and attention to detail were impressive.",
        userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ],
    availability: ["Morning", "Afternoon", "Evening"]
  },
  {
    id: "2",
    name: "Sophia Rodriguez",
    profession: "Interior Designer",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    tags: ["Modern", "Sustainable", "Residential", "Minimalist"],
    hourlyRate: 95,
    bio: "Award-winning interior designer with 8 years of experience creating beautiful, functional, and sustainable spaces. Specializing in modern residential design with a focus on sustainability.",
    experience: 8,
    portfolio: [
      "https://images.unsplash.com/photo-1618219944342-824e40a13285",
      "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
    ],
    education: "Bachelor of Fine Arts, Interior Design, RISD",
    languages: ["English", "Spanish"],
    certifications: ["NCIDQ Certified", "LEED Green Associate"],
    contactInfo: {
      email: "sophia.r@example.com",
      phone: "+1 (555) 987-6543"
    },
    reviewDetails: [
      {
        user: "James W.",
        rating: 5,
        date: "April 2, 2025",
        comment: "Sophia transformed our living space completely! Her eye for detail and ability to understand our needs was remarkable.",
        userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      {
        user: "Emma P.",
        rating: 5,
        date: "March 18, 2025",
        comment: "We loved working with Sophia on our home redesign. She created a beautiful, functional space that perfectly matches our style.",
        userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      }
    ],
    availability: ["Afternoon", "Evening"]
  }
];

const ProfessionalProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [professional, setProfessional] = useState<any>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [projectType, setProjectType] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch professional data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProfessional = mockProfessionals.find(p => p.id === id);
      if (foundProfessional) {
        setProfessional(foundProfessional);
      }
      setLoading(false);
    }, 300);
  }, [id]);

  const handleBooking = () => {
    if (!date) {
      toast({
        title: "Please select a date",
        description: "You need to choose a date for your booking",
        variant: "destructive"
      });
      return;
    }

    if (!timeSlot) {
      toast({
        title: "Please select a time slot",
        description: "You need to choose a time slot for your booking",
        variant: "destructive"
      });
      return;
    }

    setBookingComplete(true);
    
    setTimeout(() => {
      setDialogOpen(false);
      toast({
        title: "Booking confirmed!",
        description: `Your appointment with ${professional.name} on ${format(date, 'PPP')} at ${timeSlot} has been scheduled.`,
      });
      
      // Reset form after booking
      setTimeout(() => {
        setBookingComplete(false);
        setDate(undefined);
        setTimeSlot("");
        setProjectType("");
      }, 500);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <p className="text-gray-500">Loading professional profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Professional Not Found</h1>
            <p className="text-gray-500 mb-6">The professional you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <a href="/professionals">Browse Professionals</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Professional Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  
                  <div className="flex-1">
                    <h1 className="text-3xl font-heading font-bold">{professional.name}</h1>
                    <p className="text-primary font-medium text-lg">{professional.profession}</p>
                    
                    <div className="flex items-center mt-2 text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{professional.location}</span>
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{professional.rating}</span>
                        <span className="ml-1 text-gray-500">({professional.reviews} reviews)</span>
                      </div>
                      
                      <div className="ml-4 flex items-center">
                        <Briefcase className="h-4 w-4 mr-1 text-gray-600" />
                        <span className="text-gray-600">{professional.experience} years experience</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {professional.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">About</h2>
                  <p className="text-gray-700">{professional.bio}</p>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Education</p>
                      <p className="font-medium">{professional.education}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Hourly Rate</p>
                      <p className="font-medium">${professional.hourlyRate}/hour</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{professional.contactInfo.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{professional.contactInfo.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="portfolio" className="mb-6">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="portfolio" className="space-y-4">
                  <h2 className="text-xl font-semibold">Portfolio & Projects</h2>
                  
                  <Carousel className="w-full">
                    <CarouselContent>
                      {professional.portfolio.map((image: string, index: number) => (
                        <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-0">
                                <img 
                                  src={image}
                                  alt={`Portfolio item ${index + 1}`}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </TabsContent>
                
                <TabsContent value="reviews" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Client Reviews</h2>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold text-lg">{professional.rating}</span>
                      <span className="ml-1 text-gray-500">({professional.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {professional.reviewDetails.map((review: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={review.userImage}
                              alt={review.user}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{review.user}</h3>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              
                              <div className="flex items-center mt-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="certifications" className="space-y-4">
                  <h2 className="text-xl font-semibold">Certifications & Skills</h2>
                  
                  <div className="space-y-4">
                    {professional.certifications.map((cert: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold mt-6">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {professional.languages.map((lang: string, index: number) => (
                      <Badge key={index} variant="outline">{lang}</Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right column - Booking */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
                  
                  <div className="mb-6">
                    <p className="text-gray-500 mb-2">Select a date:</p>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Consultation Fee</span>
                      <span className="font-medium">${professional.hourlyRate}/hour</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium">$10.00</span>
                    </div>
                    
                    <div className="flex justify-between py-2">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">${professional.hourlyRate + 10}</span>
                    </div>
                  </div>
                  
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full mb-4">
                        Book Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Book an Appointment</DialogTitle>
                        <DialogDescription>
                          Complete your booking with {professional.name}
                        </DialogDescription>
                      </DialogHeader>
                      
                      {bookingComplete ? (
                        <div className="py-6 flex flex-col items-center">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-semibold text-center">Booking Confirmed!</h3>
                          <p className="text-gray-500 text-center mt-2">
                            Your appointment has been scheduled successfully.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="date" className="text-right">
                                Date
                              </label>
                              <div className="col-span-3">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      id="date"
                                      variant="outline"
                                      className="w-full justify-start text-left font-normal"
                                    >
                                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                      mode="single"
                                      selected={date}
                                      onSelect={setDate}
                                      initialFocus
                                      className="pointer-events-auto"
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="time" className="text-right">
                                Time Slot
                              </label>
                              <Select 
                                value={timeSlot} 
                                onValueChange={setTimeSlot}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {professional.availability.map((slot: string) => (
                                    <SelectItem key={slot} value={slot}>
                                      {slot}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="project" className="text-right">
                                Project Type
                              </label>
                              <Select 
                                value={projectType} 
                                onValueChange={setProjectType}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select project type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="residential">Residential Construction</SelectItem>
                                  <SelectItem value="commercial">Commercial Project</SelectItem>
                                  <SelectItem value="renovation">Renovation</SelectItem>
                                  <SelectItem value="consultation">Consultation Only</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label htmlFor="notes" className="text-right">
                                Notes
                              </label>
                              <Textarea
                                id="notes"
                                placeholder="Add any special requirements or questions"
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={handleBooking}>Confirm Booking</Button>
                          </DialogFooter>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <div className="text-center text-sm text-gray-500">
                    <p>No payment charged until after the consultation</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfessionalProfile;
