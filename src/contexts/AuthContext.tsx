
import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // In a real app, this would verify credentials against a backend
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock admin credentials for demo
      if (email === "admin@clubverse.com" && password === "password123") {
        const adminUser: User = {
          id: "1",
          name: "Admin User",
          email: "admin@clubverse.com",
          role: "admin",
        };
        setUser(adminUser);
        setIsAuthenticated(true);
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard!",
        });
        return true;
      }
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
      return false;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
      });
      return false;
    }
  };

  // Simple mock signup for demo purposes
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would create a user in the database
      if (email && password && name) {
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          role: "user",
        };
        setUser(newUser);
        setIsAuthenticated(true);
        toast({
          title: "Signup successful",
          description: "Your account has been created successfully!",
        });
        return true;
      }
      
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Please fill in all required fields.",
      });
      return false;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup error",
        description: "An unexpected error occurred. Please try again.",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
