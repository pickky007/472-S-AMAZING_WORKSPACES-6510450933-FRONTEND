import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ProjectCardProps {
  projectName: string;
  description: string;
  ownerName: string;
}

export function ProjectCard({
  projectName,
  description,
  ownerName,
}: ProjectCardProps) {
  const handleClick = () => {
    console.log("Component clicked!");
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#f8f8f8] rounded-lg p-4 shadow-md h-36 font-sans cursor-pointer transform transition-transform duration-150 active:scale-90"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold text-lg">{projectName}</p>
          <button className="p-2 -my-2 -mx-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            <MoreVertIcon />
          </button>
        </div>
        <p className="text-base mb-2">{description}</p>
        <p className="text-sm text-gray-600 mt-auto">by {ownerName}</p>
      </div>
    </div>
  );
}
