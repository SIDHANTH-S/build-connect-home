
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">BuildConnect</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop platform for home construction and design services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/professionals?category=engineers" className="text-gray-400 hover:text-white transition-colors">Civil Engineers</Link></li>
              <li><Link to="/professionals?category=designers" className="text-gray-400 hover:text-white transition-colors">Interior Designers</Link></li>
              <li><Link to="/professionals?category=workers" className="text-gray-400 hover:text-white transition-colors">Construction Workers</Link></li>
              <li><Link to="/materials" className="text-gray-400 hover:text-white transition-colors">Building Materials</Link></li>
              <li><Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Project Management</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/safety" className="text-gray-400 hover:text-white transition-colors">Safety Center</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-white transition-colors">Community Guidelines</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/ip" className="text-gray-400 hover:text-white transition-colors">Intellectual Property</Link></li>
              <li><Link to="/licenses" className="text-gray-400 hover:text-white transition-colors">Licenses</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} BuildConnect. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <select className="bg-gray-800 text-gray-400 px-4 py-2 rounded-md text-sm">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
