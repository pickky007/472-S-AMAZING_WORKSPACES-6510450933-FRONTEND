import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IActivityCard } from './types';

interface ActivityCardProps {
  activity: IActivityCard;
  onDragStart: (activity: IActivityCard) => void;
  onClick: (activity: IActivityCard) => void;
}

export function ActivityCard({
  activity,
  onDragStart,
  onClick,
}: ActivityCardProps) {
  return (
    <div
      onClick={() => onClick(activity)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/json', JSON.stringify(activity));
        onDragStart(activity);
      }}
      className="flex items-stretch p-4 bg-white rounded-2xl shadow-md mb-4
        transition-all duration-100 ease-in-out 
        active:scale-[0.98] active:shadow-sm
        has-[button:active]:scale-100 has-[button:active]:shadow-md"
    >
      <div
        className="w-2 rounded-md mr-4"
        style={{ backgroundColor: activity.color }}
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold mb-2">{activity.title}</h3>
        <p className="text-gray-600 mb-3">{activity.description}</p>
        <div className="flex flex-col gap-1">
          <span className="flex items-center text-sm text-gray-600">
            Assign to{' '}
            <span className="text-emerald-700 ml-1">{activity.owner}</span>
          </span>
          <span className="flex items-center text-sm text-gray-600">
            {activity.date}
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <Tooltip title="More options">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              console.log('options clicked');
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
