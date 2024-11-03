import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type ActivityCardProps = {
  color: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  date: string;
  onClick?: () => void;
};

export function ActivityCard({
                        color,
                        title,
                        description,
                        status,
                        assignee,
                        date,
                        onClick,
                      }: ActivityCardProps){
  return (
      <div
          className={`
        flex items-stretch p-4 bg-white rounded-2xl shadow-md mb-4
        transition-all duration-100 ease-in-out 
        active:scale-[0.98] active:shadow-sm
        has-[button:active]:scale-100 has-[button:active]:shadow-md
      `}
          onClick={onClick }
      >
        <div
            className="w-2 rounded-md mr-4"
            style={{ backgroundColor: color }}
        />

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-3">{description}</p>

          <div className="flex flex-col gap-1">
          <span className="flex items-center text-sm text-gray-600">
            {status}
          </span>
            <span className="flex items-center text-sm text-gray-600">
            Assign to <span className="text-emerald-700 ml-1">{assignee}</span>
          </span>
            <span className="flex items-center text-sm text-gray-600">
            {date}
          </span>
          </div>
        </div>

        <div className="flex items-center">
          <Tooltip title="More options" arrow>
            <IconButton
                className="text-gray-500 hover:text-gray-700 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("test");
                }}
                aria-label="more options"
            >
              <MoreVertIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
  );
}