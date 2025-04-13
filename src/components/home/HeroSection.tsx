
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  SearchIcon, 
  MapPin, 
  HardHat, 
  PaintBucket, 
  Users, 
  ShoppingBag 
} from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [selectedTab, setSelectedTab] = useState("build");
  
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-blue-50 opacity-70 rounded-bl-full"></div>
        <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-blue-50 opacity-70 rounded-tr-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.h1 
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Building Dreams, <span className="text-primary">Connecting</span> Experts
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find the perfect professionals and materials for your home construction and design projects. All in one place.
          </motion.p>
          
          <motion.div 
            className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-1 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Tabs */}
            <div className="flex rounded-lg bg-gray-100 p-1 mb-4">
              <button
                onClick={() => setSelectedTab("build")}
                className={`flex-1 py-2 rounded-md transition-all ${
                  selectedTab === "build" ? "bg-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center justify-center">
                  <HardHat size={18} className="mr-2" />
                  <span>Build a Home</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedTab("design")}
                className={`flex-1 py-2 rounded-md transition-all ${
                  selectedTab === "design" ? "bg-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center justify-center">
                  <PaintBucket size={18} className="mr-2" />
                  <span>Design Interior</span>
                </div>
              </button>
              <button
                onClick={() => setSelectedTab("materials")}
                className={`flex-1 py-2 rounded-md transition-all ${
                  selectedTab === "materials" ? "bg-white shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center justify-center">
                  <ShoppingBag size={18} className="mr-2" />
                  <span>Buy Materials</span>
                </div>
              </button>
            </div>
            
            {/* Search box */}
            <div className="flex flex-col md:flex-row gap-2 p-2">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder={
                    selectedTab === "build" ? "What kind of project are you planning?" :
                    selectedTab === "design" ? "What space do you want to design?" :
                    "What materials do you need?"
                  }
                  className="pl-10 pr-4 py-6 w-full rounded-lg border-gray-200"
                />
                <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <div className="relative md:w-1/3">
                <Input
                  type="text"
                  placeholder="Your location"
                  className="pl-10 pr-4 py-6 w-full rounded-lg border-gray-200"
                />
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <Button size="lg" className="py-6 px-8">
                <SearchIcon size={18} className="mr-2" />
                <span>Search</span>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-3 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span>Popular:</span>
            <a href="/search?q=house-plan" className="hover:text-primary hover:underline">House Plans</a>
            <span>•</span>
            <a href="/search?q=renovation" className="hover:text-primary hover:underline">Renovation</a>
            <span>•</span>
            <a href="/search?q=interior-design" className="hover:text-primary hover:underline">Interior Design</a>
            <span>•</span>
            <a href="/search?q=kitchen" className="hover:text-primary hover:underline">Kitchen</a>
            <span>•</span>
            <a href="/search?q=bathroom" className="hover:text-primary hover:underline">Bathroom</a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
