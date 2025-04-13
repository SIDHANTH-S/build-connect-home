
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Homeowner",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    quote: "BuildConnect made our home renovation process so much easier. We found a fantastic interior designer and contractor all in one place. The project tracking tools helped us stay on budget and on schedule.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Civil Engineer",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    quote: "As a professional engineer, joining BuildConnect has significantly expanded my client base. The platform makes it easy to showcase my portfolio and connect with serious clients looking for quality work.",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah Rodriguez",
    role: "Interior Designer",
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
    quote: "The BuildConnect platform has transformed how I find clients and manage projects. The booking system and secure payments make running my business much smoother, allowing me to focus on creative design work.",
    rating: 4
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how BuildConnect has helped homeowners and professionals connect and create amazing spaces together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-8 relative"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full border-4 border-white shadow-sm overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                
                <div className="mt-auto">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role} • {testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="/testimonials" className="text-primary font-medium hover:underline">
            Read more success stories &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
