
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, Building } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup with:", { email, password });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="font-heading text-2xl font-bold">Welcome to BuildConnect</h1>
                <p className="text-gray-600 mt-2">Your one-stop construction platform</p>
              </div>
              
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 w-full mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me
                        </label>
                      </div>
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" type="button" className="w-full">
                        Google
                      </Button>
                      <Button variant="outline" type="button" className="w-full">
                        Facebook
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="First Name"
                            className="pl-10"
                            required
                          />
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="text"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                      
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Email address"
                          className="pl-10"
                          required
                        />
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      </div>
                      
                      <div className="relative">
                        <Input
                          type="password"
                          placeholder="Password"
                          className="pl-10"
                          required
                        />
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">I am a:</label>
                        <div className="grid grid-cols-2 gap-4">
                          <Button type="button" variant="outline" className="justify-start">
                            <User className="h-4 w-4 mr-2" />
                            Homeowner
                          </Button>
                          <Button type="button" variant="outline" className="justify-start">
                            <Building className="h-4 w-4 mr-2" />
                            Professional
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <label
                          htmlFor="terms"
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        </label>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
