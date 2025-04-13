
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Star, MapPin, Filter, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Mock data for professionals
const mockProfessionals = [
  {
    id: 1,
    name: "David Chen",
    profession: "Civil Engineer",
    location: "San Francisco, CA",
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    tags: ["Structural", "Residential"],
    hourlyRate: 85,
  },
  {
    id: 2,
    name: "Sophia Rodriguez",
    profession: "Interior Designer",
    location: "Los Angeles, CA",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    tags: ["Modern", "Sustainable"],
    hourlyRate: 95,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    profession: "Construction Manager",
    location: "Chicago, IL",
    rating: 4.6,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    tags: ["Commercial", "Renovation"],
    hourlyRate: 75,
  },
  {
    id: 4,
    name: "Aisha Patel",
    profession: "Architect",
    location: "New York, NY",
    rating: 4.9,
    reviews: 91,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    tags: ["Sustainable", "Residential"],
    hourlyRate: 110,
  },
  {
    id: 5,
    name: "James Wilson",
    profession: "Electrical Engineer",
    location: "Seattle, WA",
    rating: 4.7,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    tags: ["Residential", "Smart Home"],
    hourlyRate: 90,
  },
  {
    id: 6,
    name: "Linda Kim",
    profession: "Landscape Designer",
    location: "Portland, OR",
    rating: 4.8,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    tags: ["Sustainable", "Modern"],
    hourlyRate: 80,
  },
];

const BrowseProfessionals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfessionals, setFilteredProfessionals] = useState(mockProfessionals);
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [selectedProfession, setSelectedProfession] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter professionals based on search term and filters
  useEffect(() => {
    const results = mockProfessionals.filter((professional) => {
      const matchesSearch = 
        professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        professional.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProfession = 
        selectedProfession === "all" || 
        professional.profession.toLowerCase().includes(selectedProfession.toLowerCase());
      
      const matchesPrice = 
        professional.hourlyRate >= priceRange[0] && 
        professional.hourlyRate <= priceRange[1];
      
      const matchesRating = 
        selectedRating === "all" || 
        (professional.rating >= parseInt(selectedRating));
        
      return matchesSearch && matchesProfession && matchesPrice && matchesRating;
    });
    
    setFilteredProfessionals(results);
  }, [searchTerm, selectedProfession, priceRange, selectedRating]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Find Professionals</h1>
            <p className="text-gray-500 max-w-2xl">
              Connect with civil engineers, interior designers, architects, and construction managers for your building project.
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="relative w-full md:w-auto flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, role or location..."
                className="pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 w-full md:w-auto">
              <Select value={selectedProfession} onValueChange={setSelectedProfession}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Profession" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Professions</SelectItem>
                  <SelectItem value="engineer">Engineers</SelectItem>
                  <SelectItem value="designer">Designers</SelectItem>
                  <SelectItem value="architect">Architects</SelectItem>
                  <SelectItem value="manager">Construction Managers</SelectItem>
                </SelectContent>
              </Select>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Professionals</SheetTitle>
                    <SheetDescription>
                      Refine your search with specific filters
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-4 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Price Range (hourly)</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 150]}
                          max={150}
                          step={5}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Minimum Rating</h3>
                      <Select value={selectedRating} onValueChange={setSelectedRating}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Rating</SelectItem>
                          <SelectItem value="4">4+ Stars</SelectItem>
                          <SelectItem value="4.5">4.5+ Stars</SelectItem>
                          <SelectItem value="5">5 Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium">Specializations</h3>
                      <div className="space-y-2">
                        {["Residential", "Commercial", "Sustainable", "Renovation", "Modern", "Smart Home"].map((tag) => (
                          <div key={tag} className="flex items-center space-x-2">
                            <Checkbox id={tag} />
                            <Label htmlFor={tag}>{tag}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-500">
              Showing {filteredProfessionals.length} professionals
            </p>
          </div>
          
          {/* Professionals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <Card key={professional.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={professional.image}
                        alt={professional.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-heading font-semibold text-lg">{professional.name}</h3>
                        <p className="text-primary font-medium">{professional.profession}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{professional.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{professional.rating}</span>
                        <span className="ml-1 text-gray-500 text-sm">({professional.reviews} reviews)</span>
                      </div>
                      <div className="ml-auto">
                        <span className="font-semibold">${professional.hourlyRate}</span>
                        <span className="text-gray-500 text-sm">/hr</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {professional.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t p-4">
                    <Link to={`/professionals/${professional.id}`}>
                      <Button className="w-full">View Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowseProfessionals;
