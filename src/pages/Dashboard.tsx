
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import ClubCard, { Club } from "@/components/ClubCard";
import AddClubModal from "@/components/AddClubModal";
import { v4 as uuidv4 } from "@/lib/utils";

// Sample clubs data
const sampleClubs: Club[] = [
  {
    id: "1",
    name: "Chess Club",
    description: "Learn and play chess with fellow enthusiasts. All skill levels welcome.",
    members: 15,
    category: "Academic"
  },
  {
    id: "2",
    name: "Hiking Club",
    description: "Explore local trails and mountains together. Monthly group hikes for all fitness levels.",
    members: 28,
    category: "Sports"
  },
  {
    id: "3",
    name: "Book Club",
    description: "Monthly meetings to discuss selected books, from classics to contemporary fiction.",
    members: 12,
    category: "Social"
  }
];

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clubs, setClubs] = useState<Club[]>(sampleClubs);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Filter clubs based on search query
  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddClub = (newClubData: Omit<Club, "id">) => {
    const newClub: Club = {
      ...newClubData,
      id: uuidv4()
    };
    
    setClubs([...clubs, newClub]);
    
    toast({
      title: "Club Added",
      description: `${newClub.name} has been successfully added.`
    });
  };
  
  const handleDeleteClub = (id: string) => {
    const clubToDelete = clubs.find(club => club.id === id);
    setClubs(clubs.filter(club => club.id !== id));
    
    toast({
      title: "Club Deleted",
      description: `${clubToDelete?.name} has been removed.`,
      variant: "destructive"
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Club Management</h1>
            <p className="text-gray-600">Add, search and manage all club entries</p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <AddClubModal onAddClub={handleAddClub} />
          </div>
        </div>
        
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map(club => (
              <ClubCard 
                key={club.id} 
                club={club} 
                onDelete={handleDeleteClub} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            {searchQuery ? (
              <>
                <h3 className="text-lg font-medium text-gray-900">No clubs found</h3>
                <p className="mt-1 text-gray-500">
                  No clubs match your search query "{searchQuery}".
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium text-gray-900">No clubs yet</h3>
                <p className="mt-1 text-gray-500">
                  Get started by adding your first club.
                </p>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
