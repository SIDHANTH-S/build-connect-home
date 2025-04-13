
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "success" | "error">(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    
    // In a real app, we would send this to an API
    console.log("Subscribing email:", email);
    setStatus("success");
    setEmail("");
    
    // Reset status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
            </div>
            
            <h3 className="font-heading text-2xl font-bold text-center mb-2">
              Stay Updated with BuildConnect
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Get the latest construction trends, material pricing updates, and special offers.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full py-6 ${
                    status === "error" ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
                />
                {status === "error" && (
                  <div className="absolute inset-y-0 right-3 flex items-center text-red-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                )}
              </div>
              <Button type="submit" size="lg" className="py-6">
                Subscribe
              </Button>
            </form>
            
            {status === "error" && (
              <p className="text-red-500 mt-2 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Please enter a valid email address
              </p>
            )}
            
            {status === "success" && (
              <p className="text-secondary mt-2 text-sm flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Thanks for subscribing!
              </p>
            )}
            
            <p className="text-gray-500 text-xs text-center mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from BuildConnect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
