
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProfessionals from "@/components/home/FeaturedProfessionals";
import HowItWorks from "@/components/home/HowItWorks";
import CallToAction from "@/components/home/CallToAction";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import MaterialsShowcase from "@/components/home/MaterialsShowcase";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CategorySection />
          <HowItWorks />
          <FeaturedProfessionals />
          <MaterialsShowcase />
          <TestimonialsSection />
          <CallToAction />
          <NewsletterSection />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
