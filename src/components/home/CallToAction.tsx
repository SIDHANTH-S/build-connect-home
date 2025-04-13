
import { Button } from "@/components/ui/button";
import { HardHat, Users, Building } from "lucide-react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Construction Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of homeowners who have successfully built their dream homes using BuildConnect.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="default" className="bg-white text-primary hover:bg-gray-100">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Success Stories
              </Button>
            </div>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <HardHat className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2,500+</div>
                  <div className="text-sm opacity-80">Projects Completed</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">1,200+</div>
                  <div className="text-sm opacity-80">Verified Professionals</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-80">Cities Covered</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-xl font-semibold mb-4">Join as a Professional</div>
              <p className="opacity-90 mb-6">
                Are you an engineer, designer, contractor, or material supplier? Join our network and grow your business.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-sm">Create a professional profile</div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-sm">Get verified and showcase your work</div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-sm">Receive job requests directly</div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-sm">Manage projects and get paid securely</div>
                </div>
              </div>
              
              <Button size="lg" className="w-full mt-6 bg-white text-primary hover:bg-gray-100">
                Register as a Professional
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
