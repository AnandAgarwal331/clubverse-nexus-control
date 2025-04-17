
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
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

// Check if there's user data stored in localStorage
const getUserFromStorage = (): User | null => {
  const storedUser = localStorage.getItem('clubverseUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getUserFromStorage());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);
  const { toast } = useToast();

  // Persist user data to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('clubverseUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('clubverseUser');
    }
  }, [user]);

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
      
      // Mock user credentials for demo
      if (email && password && password.length >= 6) {
        // Check if this is a registered user (simulate from localStorage)
        const storedUsers = localStorage.getItem('clubverseUsers');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        const foundUser = users.find((u: any) => u.email === email);
        if (foundUser && foundUser.password === password) {
          const userObj: User = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            role: "user",
          };
          setUser(userObj);
          setIsAuthenticated(true);
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          return true;
        }
      }
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
      return false;
    } catch (error) {
      console.error("Login error:", error);
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
        // Get existing users from localStorage
        const storedUsers = localStorage.getItem('clubverseUsers');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        // Check if the email is already in use
        if (users.some((u: any) => u.email === email)) {
          toast({
            variant: "destructive",
            title: "Signup failed",
            description: "Email is already in use. Please use a different email.",
          });
          return false;
        }
        
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password, // In a real app, this would be hashed
          role: "user",
        };
        
        // Store the user in localStorage
        users.push(newUser);
        localStorage.setItem('clubverseUsers', JSON.stringify(users));
        
        // Auto-login after signup
        const userForState: User = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: "user",
        };
        
        setUser(userForState);
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
      console.error("Signup error:", error);
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
