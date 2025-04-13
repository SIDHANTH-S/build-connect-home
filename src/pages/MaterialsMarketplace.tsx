
import { useState, useEffect } from "react";
import { Star, ShoppingCart, Heart, BarChart3, Search, Filter, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

// Mock data for materials
const mockMaterials = [
  {
    id: 1,
    name: "Premium Portland Cement",
    brand: "BuilderPro",
    category: "Cement",
    price: 12.99,
    rating: 4.7,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    tags: ["High-strength", "Eco-friendly"],
    unit: "Bag (50kg)",
    inStock: true,
    description: "Premium quality Portland cement for all construction needs. High early strength and durability."
  },
  {
    id: 2,
    name: "Ceramic Floor Tiles",
    brand: "TileWorld",
    category: "Tiles",
    price: 3.49,
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    tags: ["Stain-resistant", "Easy-clean"],
    unit: "Per sq ft",
    inStock: true,
    description: "High-quality ceramic floor tiles suitable for kitchens and bathrooms. Stain-resistant and easy to clean."
  },
  {
    id: 3,
    name: "Acrylic Emulsion Paint",
    brand: "ColorTech",
    category: "Paint",
    price: 24.99,
    rating: 4.8,
    reviews: 205,
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    tags: ["Water-based", "Low-VOC"],
    unit: "Gallon",
    inStock: true,
    description: "Premium acrylic emulsion paint with excellent coverage and durability. Low VOC content."
  },
  {
    id: 4,
    name: "Red Clay Bricks",
    brand: "MasonryPlus",
    category: "Bricks",
    price: 0.75,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1597484662317-c493406708f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    tags: ["Standard-size", "Uniform"],
    unit: "Per piece",
    inStock: true,
    description: "Standard size red clay bricks for construction. Consistent quality and uniform dimensions."
  },
  {
    id: 5,
    name: "Pine Wood Planks",
    brand: "WoodCraft",
    category: "Wood",
    price: 8.99,
    rating: 4.4,
    reviews: 72,
    image: "https://images.unsplash.com/photo-1520970519539-8c67e5ba3b5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    tags: ["Kiln-dried", "Grade A"],
    unit: "Per 8ft board",
    inStock: true,
    description: "Kiln-dried pine wood planks for various carpentry projects. Grade A quality with minimal knots."
  },
  {
    id: 6,
    name: "TMT Steel Bars",
    brand: "SteelTech",
    category: "Steel",
    price: 6.99,
    rating: 4.9,
    reviews: 190,
    image: "https://images.unsplash.com/photo-1536341110529-360f080fe488?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    tags: ["Corrosion-resistant", "High-strength"],
    unit: "Per kg",
    inStock: true,
    description: "High-strength TMT steel bars for reinforced concrete structures. Excellent corrosion resistance."
  },
  {
    id: 7,
    name: "Laminate Flooring",
    brand: "FloorKing",
    category: "Flooring",
    price: 2.29,
    rating: 4.6,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    tags: ["Water-resistant", "Easy-install"],
    unit: "Per sq ft",
    inStock: true,
    description: "Premium laminate flooring with waterproof technology. Easy click-lock installation system."
  },
  {
    id: 8,
    name: "Insulation Foam Sheets",
    brand: "ThermalGuard",
    category: "Insulation",
    price: 18.99,
    rating: 4.7,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1620466302181-dce9e0c5aab7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    tags: ["High R-value", "Fire-resistant"],
    unit: "Per sheet",
    inStock: true,
    description: "High R-value insulation foam sheets for walls and ceilings. Fire resistant and energy efficient."
  },
  {
    id: 9,
    name: "Weatherproof Roofing Shingles",
    brand: "RoofMaster",
    category: "Roofing",
    price: 29.99,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    tags: ["UV-resistant", "Wind-resistant"],
    unit: "Per bundle",
    inStock: true,
    description: "Premium weatherproof roofing shingles with UV and wind resistance. Long-lasting protection."
  }
];

// Material categories
const categories = [
  "All",
  "Cement",
  "Tiles",
  "Paint",
  "Bricks",
  "Wood",
  "Steel",
  "Flooring",
  "Insulation",
  "Roofing"
];

const MaterialsMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredMaterials, setFilteredMaterials] = useState(mockMaterials);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extract all brands for filter
  const allBrands = [...new Set(mockMaterials.map(material => material.brand))];

  // Filter materials based on search, category, price range, and brands
  useEffect(() => {
    const results = mockMaterials.filter((material) => {
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        || material.brand.toLowerCase().includes(searchTerm.toLowerCase())
        || material.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === "All" || material.category === activeCategory;
      
      const matchesPrice = material.price >= priceRange[0] && material.price <= priceRange[1];
      
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(material.brand);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
    });
    
    setFilteredMaterials(results);
  }, [searchTerm, activeCategory, priceRange, selectedBrands]);

  const handleAddToCart = (material: any) => {
    toast({
      title: "Added to cart",
      description: `${material.name} has been added to your cart.`,
    });
  };

  const handleCompare = (material: any) => {
    toast({
      description: `${material.name} has been added to comparison list.`,
    });
  };

  const toggleBrandSelection = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Materials Marketplace</h1>
            <p className="text-gray-500 max-w-2xl">
              Browse high-quality construction materials from trusted suppliers for your building projects.
            </p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="relative w-full md:w-auto flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search materials..."
                className="pl-10 pr-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 w-full md:w-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Materials</SheetTitle>
                    <SheetDescription>
                      Refine your search with specific filters
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="py-4 space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Price Range ($)</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[0, 50]}
                          max={50}
                          step={1}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium">Brands</h3>
                      <div className="space-y-2">
                        {allBrands.map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox 
                              id={brand} 
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={() => toggleBrandSelection(brand)}
                            />
                            <Label htmlFor={brand}>{brand}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-medium">Features</h3>
                      <div className="space-y-2">
                        {["Eco-friendly", "High-strength", "Water-resistant", "Fire-resistant"].map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox id={feature} />
                            <Label htmlFor={feature}>{feature}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button variant="outline" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Compare</span>
              </Button>
            </div>
          </div>
          
          {/* Category Tabs */}
          <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="flex overflow-x-auto pb-2 mb-2 hide-scrollbar">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-500">
              Showing {filteredMaterials.length} materials
            </p>
          </div>
          
          {/* Materials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMaterials.map((material) => (
              <Card key={material.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={material.image}
                    alt={material.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100">
                    <Heart className="h-5 w-5 text-gray-500 hover:text-red-500 transition-colors" />
                  </button>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-primary font-medium">{material.brand}</p>
                      <h3 className="font-heading font-semibold">{material.name}</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {material.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium text-sm">{material.rating}</span>
                      <span className="ml-1 text-gray-500 text-xs">({material.reviews})</span>
                    </div>
                    {material.inStock ? (
                      <span className="ml-auto text-xs text-green-600 flex items-center">
                        <Check className="h-3 w-3 mr-0.5" /> In Stock
                      </span>
                    ) : (
                      <span className="ml-auto text-xs text-red-500">Out of Stock</span>
                    )}
                  </div>
                  
                  <div className="flex items-end justify-between mt-3">
                    <div>
                      <p className="text-gray-500 text-xs">{material.unit}</p>
                      <p className="font-semibold text-lg">${material.price.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 gap-2">
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={() => handleAddToCart(material)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleCompare(material)}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MaterialsMarketplace;
