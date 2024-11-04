import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { useNavigate } from "react-router-dom";

interface WorkSpaceCardProps {
  projectName: string;
  description: string;
  ownerName: string;
}

export function WorkSpaceCard({
  projectName,
  description,
  ownerName,
}: WorkSpaceCardProps) {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/kanbanboard`); 
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-100 rounded-2xl p-4 shadow-md  h-52 cursor-pointer transition-transform duration-200 ease-in-out hover:shadow-lg active:scale-95"
    >
      <div className="h-36">
        <div className="flex justify-between">
          <p className="font-bold text-2xl">{projectName}</p>
          <button className="bg-transparent border-none p-2 -mr-2 text-gray-600 flex items-center">
            <MoreVertIcon />
          </button>
        </div>
        <p className="text-lg mb-2">{description}</p>
      </div>
      <p className="text-sm text-gray-600 mt-auto">by {ownerName}</p>
    </div>
  );
}
