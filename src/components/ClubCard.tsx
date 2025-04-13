
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export interface Club {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
}

interface ClubCardProps {
  club: Club;
  onDelete: (id: string) => void;
}

const ClubCard = ({ club, onDelete }: ClubCardProps) => {
  return (
    <Card className="club-card overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{club.name}</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(club.id)}
          >
            <Trash2 size={18} />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">{club.category}</div>
      </CardHeader>
      <CardContent className="flex-1 py-2">
        <p className="text-sm text-gray-600">{club.description}</p>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="text-sm text-muted-foreground">
          {club.members} {club.members === 1 ? "member" : "members"}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ClubCard;
