
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HardHat, Home, LayoutDashboard, Users, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <HardHat className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-heading font-bold text-gray-900">404 - Page Not Found</h2>
          <p className="mt-2 text-sm text-gray-600">
            This page is under construction – we're building it just like your dream home.
          </p>
        </div>
        
        <div className="bg-white shadow rounded-xl p-6 mt-8">
          <p className="text-gray-700 mb-6">
            We couldn't find the page you were looking for. Meanwhile, you might want to check out these sections:
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Link to="/" className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Home className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            
            <Link to="/professionals" className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">Professionals</span>
            </Link>
            
            <Link to="/materials" className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <ShoppingBag className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">Materials</span>
            </Link>
            
            <Link to="/projects" className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <LayoutDashboard className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">Projects</span>
            </Link>
          </div>
        </div>
        
        <div className="mt-6">
          <Button asChild className="w-full">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
