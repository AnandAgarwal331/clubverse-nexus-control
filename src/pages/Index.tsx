
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            Welcome to ClubVerse
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The ultimate platform for managing and discovering clubs.
            Streamline your organization and keep everyone connected.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto"
            >
              Admin Login
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto"
            >
              View Dashboard
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium mb-2">Add Clubs</h3>
            <p className="text-gray-600">
              Easily create and manage club entries with detailed information.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium mb-2">Search Functionality</h3>
            <p className="text-gray-600">
              Find exactly what you're looking for with powerful search features.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium mb-2">Admin Control</h3>
            <p className="text-gray-600">
              Maintain full control with administrative privileges and tools.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 ClubVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
