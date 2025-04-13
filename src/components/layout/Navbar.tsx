
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Menu, 
  Home, 
  User, 
  MessageSquare, 
  ShoppingBag, 
  LayoutDashboard
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mr-2">
                <Home className="text-white h-5 w-5" />
              </div>
              <span className="font-heading font-bold text-xl md:text-2xl text-gray-900">BuildConnect</span>
            </div>
          </Link>

          {/* Search input - visible on desktop */}
          <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
            <Input 
              type="text" 
              placeholder="Find engineers, designers, materials..." 
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 border-0 focus-visible:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/professionals" className="text-gray-600 hover:text-primary font-medium">
              Professionals
            </Link>
            <Link to="/materials" className="text-gray-600 hover:text-primary font-medium">
              Materials
            </Link>
            <Link to="/projects" className="text-gray-600 hover:text-primary font-medium">
              Projects
            </Link>
            <Button variant="outline" className="rounded-full">
              Sign In
            </Button>
            <Button className="rounded-full">
              Join Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Input 
                      type="text" 
                      placeholder="Search..." 
                      className="mb-6 pl-10 relative"
                    />
                    <Search className="absolute top-[4.5rem] left-10 h-5 w-5 text-gray-400" />
                    
                    <Link to="/" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      <Home className="mr-2 h-5 w-5 text-primary" />
                      <span>Home</span>
                    </Link>
                    <Link to="/professionals" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      <User className="mr-2 h-5 w-5 text-primary" />
                      <span>Professionals</span>
                    </Link>
                    <Link to="/materials" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                      <span>Materials</span>
                    </Link>
                    <Link to="/projects" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      <LayoutDashboard className="mr-2 h-5 w-5 text-primary" />
                      <span>Projects</span>
                    </Link>
                    <Link to="/messages" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                      <span>Messages</span>
                    </Link>
                    
                    <div className="mt-6 space-y-3">
                      <Button variant="outline" className="w-full">Sign In</Button>
                      <Button className="w-full">Join Now</Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
