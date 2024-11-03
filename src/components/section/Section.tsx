import React, { useState, useRef } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ActivityCard } from "../activity/ActivityCard";
import { Section as SectionType, Activity } from "../types";


interface SectionProps {
  section: SectionType;
  activities: Activity[];
  onDrop: (
    activity: Activity,
    targetSectionId: string,
    targetIndex: number
  ) => void;
  onDragStart: (activity: Activity) => void;
  setOnAddActivity: (b : boolean) => void;
}

export function Section({
  section,
  activities,
  onDrop,
  onDragStart,
  setOnAddActivity
}: SectionProps) {
  const [isOver, setIsOver] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const activitiesRef = useRef<(HTMLDivElement | null)[]>([]);

  function handleOnAddOptionClick() {
    setOnAddActivity(true);
  }

  function getDragOverIndex(
    e: React.DragEvent<HTMLDivElement>,
    currentIndex: number
  ) {
    const activityElement = activitiesRef.current[currentIndex];
    if (!activityElement) return currentIndex;

    const rect = activityElement.getBoundingClientRect();
    const mouseY = e.clientY;
    const threshold = rect.top + rect.height / 2;

    return mouseY < threshold ? currentIndex : currentIndex + 1;
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, index?: number) {
    const hasActivityData = e.dataTransfer.types.includes("application/json");
    if (!hasActivityData) {
      e.dataTransfer.dropEffect = "none";
      return;
    }

    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (!isOver) setIsOver(true);

    if (typeof index === "number") {
      const newDragOverIndex = getDragOverIndex(e, index);
      setDragOverIndex(newDragOverIndex);
    }
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeavingContainer =
      e.clientY < rect.top ||
      e.clientY >= rect.bottom ||
      e.clientX < rect.left ||
      e.clientX >= rect.right;

    if (isLeavingContainer) {
      setIsOver(false);
      setDragOverIndex(null);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    try {
      const jsonData = e.dataTransfer.getData("application/json");
      if (!jsonData) {
        throw new Error("No activity data found");
      }

      const activityData = JSON.parse(jsonData);

      if (!activityData.id || !activityData.title) {
        throw new Error("Invalid activity data");
      }

      if (activities.length === 0) {
        onDrop(activityData, section.id, 0);
      } else if (dragOverIndex !== null) {
        onDrop(activityData, section.id, dragOverIndex);
      } else {
        onDrop(activityData, section.id, activities.length);
      }
    } catch (error) {
      console.log("Invalid drop:", error);
    } finally {
      setIsOver(false);
      setDragOverIndex(null);
    }
  }

  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-50 rounded-lg mx-2 min-h-[700px] "
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-4">
        <div className="flex flex-col items-start relative">
          <div className="self-end mb-2 flex space-x-2">
            <Tooltip title="Add options">
              <IconButton size="small" onClick={handleOnAddOptionClick}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </div>
          <div className="self-start text-2xl font-bold mb-4">
            {section.title}
          </div>
        </div>
      </div>
      <div
        className={`p-4 transition-colors duration-200 rounded-lg
          ${isOver ? "bg-gray-100 ring-2 ring-blue-400" : ""}
          ${activities.length === 0 ? "flex items-center justify-center" : ""}
          max-h-[calc(100vh-200px)] overflow-y-auto`} // Added max height and overflow for scrollbar
      >
        {activities.length > 0 ? (
          <>
            {dragOverIndex === 0 && <div className="h-2 bg-blue-200 mb-2" />}
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                ref={(el) => (activitiesRef.current[index] = el)}
                className="relative"
                onDragOver={(e) => handleDragOver(e, index)}
              >
                <ActivityCard activity={activity} onDragStart={onDragStart} />
                {dragOverIndex === index + 1 && (
                  <div className="h-2 bg-blue-200 my-2" />
                )}
              </div>
            ))}
          </>
        ) : (
          <div
            className={`text-gray-400 text-center w-full ${
              isOver ? "hidden" : ""
            }`}
          >
            Drop activity here
          </div>
        )}
      </div>
    </div>
  );
}
