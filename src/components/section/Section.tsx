import React from 'react';
import Tooltip from "@mui/material/Tooltip";
import { ActivityCard } from "../activity/ActivityCard";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

const activities = [
  {
    color: "#CC2E2E", // Red
    title: "Activity",
    description: "Description",
    status: "🔴 Status",
    assignee: "@P.Num",
    date: "Date Jan 1, 20:00 - Jan 1, 21:00",
  },
  {
    color: "#3A8C84", // Teal
    title: "Activity",
    description: "Description",
    status: "🔵 Status",
    assignee: "@P.Num",
    date: "Date Jan 1, 20:00 - Jan 1, 21:00",
  },
  {
    color: "#3A8C84", // Teal
    title: "Activity",
    description: "Description",
    status: "🔵 Status",
    assignee: "@P.Num",
    date: "Date Jan 1, 20:00 - Jan 1, 21:00",
  },
];

export function Section() {
  return (
    <div className="p-8">
      <div className="flex flex-col items-start relative">
        <div className="self-end mb-2">
          <Tooltip title="Add options" arrow>
            <IconButton aria-label="add options" size="large">
              <AddIcon className="text-gray-600" />
            </IconButton>
          </Tooltip>
          <IconButton aria-label="more options" size="large">
            <MoreVertIcon className="text-gray-600" />
          </IconButton>
        </div>
        <div className="self-start text-2xl font-bold">A1</div>
      </div>
      <div className="p-8">
        <div>
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              {...activity}
              onClick={() => {
                console.log("hello");
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
