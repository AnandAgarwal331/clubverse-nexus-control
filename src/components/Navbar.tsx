
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-primary">ClubVerse</span>
        </a>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <User size={16} />
                <span>{user?.name || "Admin"}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex items-center space-x-1"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              size="sm"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
