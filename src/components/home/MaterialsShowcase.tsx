
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Mock data - would come from API in real app
const materialCategories = [
  {
    id: "cement",
    name: "Cement & Concrete",
    image: "https://images.unsplash.com/photo-1518430272387-56773bcvx9de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    featured: true,
    badges: ["Eco-friendly options", "All grades"],
  },
  {
    id: "bricks",
    name: "Bricks & Blocks",
    image: "https://images.unsplash.com/photo-1518430272387-56773bc5d39e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    featured: false,
    badges: ["Clay", "Concrete", "AAC"],
  },
  {
    id: "tiles",
    name: "Tiles & Flooring",
    image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    featured: true,
    badges: ["Ceramic", "Porcelain", "Marble"],
  },
  {
    id: "paint",
    name: "Paints & Finishes",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    featured: false,
    badges: ["Interior", "Exterior", "Primers"],
  },
  {
    id: "wood",
    name: "Wood & Lumber",
    image: "https://images.unsplash.com/photo-1520114878144-6123749ec8ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    featured: true,
    badges: ["Plywood", "Hardwood", "Engineered"],
  },
  {
    id: "steel",
    name: "Steel & Metal",
    image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    featured: false,
    badges: ["TMT", "Structural", "Roofing"],
  },
];

const MaterialsShowcase = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="font-heading text-3xl font-bold mb-2">Quality Building Materials</h2>
            <p className="text-gray-600">Source all your construction materials directly from trusted suppliers</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center">
              View All Categories
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {materialCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Material category image with gradient overlay */}
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 z-10"></div>
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category name and badges */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.badges.map(badge => (
                      <Badge key={badge} variant="outline" className="bg-white/20 text-white border-none backdrop-blur-sm">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Featured tag if applicable */}
                {category.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-accent text-white">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              
              {/* Hover overlay with button */}
              <div className="absolute inset-0 bg-primary bg-opacity-0 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-50 z-30 opacity-0 group-hover:opacity-100">
                <Button className="bg-white text-primary hover:bg-gray-100">
                  Explore {category.name}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialsShowcase;
