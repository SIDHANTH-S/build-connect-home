
import { Building, Users, Paintbrush, HardHat, Ruler, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    id: "civil-engineers",
    title: "Civil Engineers",
    icon: <Building className="h-10 w-10 mb-4 text-primary" />,
    description: "Find certified engineers for structural plans and approvals",
    link: "/professionals?category=engineers",
    color: "bg-blue-50"
  },
  {
    id: "interior-designers",
    title: "Interior Designers",
    icon: <Paintbrush className="h-10 w-10 mb-4 text-secondary" />,
    description: "Connect with creative designers for beautiful interiors",
    link: "/professionals?category=designers",
    color: "bg-green-50"
  },
  {
    id: "contractors",
    title: "Contractors",
    icon: <Ruler className="h-10 w-10 mb-4 text-accent" />,
    description: "Hire experienced contractors to manage your project",
    link: "/professionals?category=contractors",
    color: "bg-amber-50"
  },
  {
    id: "construction-workers",
    title: "Construction Workers",
    icon: <HardHat className="h-10 w-10 mb-4 text-orange-500" />,
    description: "Skilled labor for all your construction needs",
    link: "/professionals?category=workers",
    color: "bg-orange-50"
  },
  {
    id: "material-suppliers",
    title: "Material Suppliers",
    icon: <ShoppingBag className="h-10 w-10 mb-4 text-indigo-500" />,
    description: "Quality construction materials at competitive prices",
    link: "/materials",
    color: "bg-indigo-50"
  },
  {
    id: "teams",
    title: "Ready Teams",
    icon: <Users className="h-10 w-10 mb-4 text-purple-500" />,
    description: "Complete teams that can handle your entire project",
    link: "/professionals?category=teams",
    color: "bg-purple-50"
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-4">Your Dream Home, Our Categories</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            BuildConnect brings together all the professionals and resources you need
            throughout your construction journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={category.link} className="block">
                <div className={`h-full rounded-xl p-8 ${category.color} hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group`}>
                  <div className="mb-1 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <span className="text-primary font-medium group-hover:underline">Explore &rarr;</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
