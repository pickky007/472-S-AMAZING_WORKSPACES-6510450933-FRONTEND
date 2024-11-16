import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface WorkSpaceCardProps {
  projectName: string;
  description: string;
  ownerName: string;
  onClick: () => void;
  id: string;
}

export function WorkSpaceCard({
  projectName,
  description,
  ownerName,
  onClick,
  id,
}: WorkSpaceCardProps) {
  
  const navigate = useNavigate();
  const [isInviteCode, setisInviteCode] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function handleMenuToggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setShowMenu(prevShowMenu => !prevShowMenu);
  }

  function handleInviteCode(event: React.MouseEvent<HTMLButtonElement>){
    event.stopPropagation();
    setisInviteCode(true)

  }

  function closeModal() {
    setisInviteCode(false);
}

  return (
    <div
      onClick={onClick}
      className="bg-gray-100 rounded-2xl p-4 shadow-md  h-52 cursor-pointer transition-transform duration-200 ease-in-out hover:shadow-lg active:scale-95 active:shadow-sm
        has-[button:active]:scale-100 has-[button:active]:shadow-md"
    >
      <div className="h-36 relative">
        <div className="flex justify-between">
          <p className="font-bold text-2xl">{projectName}</p>
          <button onClick={handleMenuToggle} className="bg-transparent p-2 -mr-2 text-gray-600 flex items-center">
            <MoreVertIcon />
          </button>
          {showMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 flex justify-center "
              style={{ marginTop: "2rem" }}
            >
              <p style={{fontWeight:'bold'}}>Invite Code: </p>
              <p>{id}</p>
            </div>
          )}
        </div>
        <p className="text-lg mb-2">{description}</p>
      </div>
      <p className="text-sm text-gray-600 mt-auto">by {ownerName}</p>
    </div>
    
  );
}
