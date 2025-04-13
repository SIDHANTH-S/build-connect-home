
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import BrowseProfessionals from "./pages/BrowseProfessionals";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import MaterialsMarketplace from "./pages/MaterialsMarketplace";
import MyProjects from "./pages/MyProjects";
import Messages from "./pages/Messages";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/professionals" element={<BrowseProfessionals />} />
            <Route path="/professionals/:id" element={<ProfessionalProfile />} />
            <Route path="/materials" element={<MaterialsMarketplace />} />
            <Route path="/projects" element={<MyProjects />} />
            <Route path="/messages" element={<Messages />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
