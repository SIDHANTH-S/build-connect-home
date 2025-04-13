
import { useState } from "react";
import { Star, ThumbsUp, Award, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Mock data - would come from API in real app
const professionals = [
  {
    id: 1,
    name: "Alex Morgan",
    title: "Civil Engineer",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    rating: 4.9,
    reviewCount: 127,
    location: "San Francisco, CA",
    specialties: ["Structural Design", "Permits", "Renovation"],
    verified: true,
    featured: true,
    completedProjects: 89,
    type: "engineer"
  },
  {
    id: 2,
    name: "Samantha Lee",
    title: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    rating: 4.8,
    reviewCount: 94,
    location: "Los Angeles, CA",
    specialties: ["Modern", "Minimalist", "Sustainable"],
    verified: true,
    featured: true,
    completedProjects: 72,
    type: "designer"
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    title: "Construction Manager",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    rating: 4.7,
    reviewCount: 156,
    location: "Chicago, IL",
    specialties: ["Project Management", "Residential", "Commercial"],
    verified: true,
    featured: false,
    completedProjects: 112,
    type: "contractor"
  },
  {
    id: 4,
    name: "Priya Patel",
    title: "Architect",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
    rating: 4.9,
    reviewCount: 88,
    location: "New York, NY",
    specialties: ["Modern Design", "Sustainable", "Custom Homes"],
    verified: true,
    featured: true,
    completedProjects: 64,
    type: "engineer"
  },
  {
    id: 5,
    name: "James Wilson",
    title: "Material Supplier",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    rating: 4.6,
    reviewCount: 111,
    location: "Austin, TX",
    specialties: ["Eco-friendly", "Premium Materials", "Wholesale"],
    verified: true,
    featured: false,
    completedProjects: 203,
    type: "supplier"
  },
  {
    id: 6,
    name: "Michael Chen",
    title: "Construction Contractor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    rating: 4.7,
    reviewCount: 136,
    location: "Portland, OR",
    specialties: ["Residential", "Remodeling", "Additions"],
    verified: true,
    featured: true,
    completedProjects: 92,
    type: "contractor"
  }
];

const FeaturedProfessionals = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filteredProfessionals = activeFilter === "all" 
    ? professionals 
    : professionals.filter(pro => pro.type === activeFilter);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="font-heading text-3xl font-bold mb-2">Top Rated Professionals</h2>
            <p className="text-gray-600">Vetted experts ready to bring your vision to life</p>
          </div>
          
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={activeFilter === "engineer" ? "default" : "outline"}
              onClick={() => setActiveFilter("engineer")}
              className="rounded-full"
            >
              Engineers
            </Button>
            <Button
              variant={activeFilter === "designer" ? "default" : "outline"}
              onClick={() => setActiveFilter("designer")}
              className="rounded-full"
            >
              Designers
            </Button>
            <Button
              variant={activeFilter === "contractor" ? "default" : "outline"}
              onClick={() => setActiveFilter("contractor")}
              className="rounded-full"
            >
              Contractors
            </Button>
            <Button
              variant={activeFilter === "supplier" ? "default" : "outline"}
              onClick={() => setActiveFilter("supplier")}
              className="rounded-full"
            >
              Suppliers
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfessionals.map((professional, index) => (
            <motion.div
              key={professional.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start">
                  <img
                    src={professional.avatar}
                    alt={professional.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-heading font-semibold text-lg">{professional.name}</h3>
                        <p className="text-gray-600 text-sm">{professional.title}</p>
                      </div>
                      {professional.featured && (
                        <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">
                          <Award size={14} className="mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{professional.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({professional.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-start mb-3">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-2" />
                    <span className="text-gray-700 text-sm">{professional.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {professional.specialties.map(specialty => (
                      <Badge key={specialty} variant="outline" className="bg-gray-100">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-secondary mr-1" />
                      <span>{professional.verified ? "Verified Pro" : "Unverified"}</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 text-primary mr-1" />
                      <span>{professional.completedProjects} Projects</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="default" className="w-full">View Profile</Button>
                    <Button variant="outline" className="px-4">Contact</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" className="px-8">
            View All Professionals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
