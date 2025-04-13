
import { Search, UserPlus, Calendar, Home } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Search Professionals",
    description: "Browse through our vetted network of engineers, designers, and contractors.",
    icon: <Search className="h-8 w-8 text-white" />,
    color: "bg-primary"
  },
  {
    id: 2,
    title: "Connect & Compare",
    description: "Connect with multiple professionals, compare profiles, and read verified reviews.",
    icon: <UserPlus className="h-8 w-8 text-white" />,
    color: "bg-secondary"
  },
  {
    id: 3,
    title: "Book Services",
    description: "Book services directly through our platform with secure payments and scheduling.",
    icon: <Calendar className="h-8 w-8 text-white" />,
    color: "bg-accent"
  },
  {
    id: 4,
    title: "Build Your Dream",
    description: "Work with professionals and track your project from start to finish.",
    icon: <Home className="h-8 w-8 text-white" />,
    color: "bg-indigo-500"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">How BuildConnect Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to find, connect with, and hire the right professionals for your construction and design needs.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 flex-1 relative"
            >
              <div className={`absolute -top-5 left-6 w-14 h-14 ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                {step.icon}
              </div>
              <div className="pt-10">
                <span className="absolute top-6 right-6 text-gray-200 font-bold text-4xl">
                  {step.id}
                </span>
                <h3 className="font-heading text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rotate-45 border-t border-r border-gray-200 bg-white"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
