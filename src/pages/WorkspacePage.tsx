import React, { useState } from "react";
import { Section } from "../components/section/Section";

import { Section as SectionType, Activity} from "../components/types";

const initialSections: Record<string, SectionType> = {
  "section-1": {
    id: "section-1",
    title: "A1",
    activities: [
      {
        id: "activity-1",
        color: "#CC2E2E",
        title: "Activity 1",
        description: "Description",
        status: "🔴 Status",
        assignee: "@P.Num",
        date: "Date Jan 1, 20:00 - Jan 1, 21:00",
      },
      {
        id: "activity-2",
        color: "#3A8C84",
        title: "Activity 2",
        description: "Description",
        status: "🔵 Status",
        assignee: "@P.Num",
        date: "Date Jan 1, 20:00 - Jan 1, 21:00",
      },
    ],
  },
  "section-2": {
    id: "section-2",
    title: "A2",
    activities: [
      {
        id: "activity-3",
        color: "#3A8C84",
        title: "Activity 3",
        description: "Description",
        status: "🔵 Status",
        assignee: "@P.Num",
        date: "Date Jan 1, 20:00 - Jan 1, 21:00",
      },
      {
        id: "activity-4",
        color: "#3A8C84",
        title: "Activity 4",
        description: "Description",
        status: "🔵 Status",
        assignee: "@P.Num",
        date: "Date Jan 1, 20:00 - Jan 1, 21:00",
      },
      {
        id: "activity-5",
        color: "#3A8C84",
        title: "Activity 5",
        description: "Description",
        status: "🔵 Status",
        assignee: "@P.Num",
        date: "Date Jan 1, 20:00 - Jan 1, 21:00",
      },
    ],
  },
  "section-3": {
    id: "section-3",
    title: "A3",
    activities: [],
  },
  "section-4": {
    id: "section-4",
    title: "A4",
    activities: [],
  },
  "section-5": {
    id: "section-5",
    title: "A5",
    activities: [],
  },

  "section-6": {
    id: "section-6",
    title: "A6",
    activities: [],
  },
};

export function WorkspacePage() {
  const [sections, setSections] = useState(initialSections);
  const [draggedActivity, setDraggedActivity] = useState<Activity | null>(null);

  const handleDragStart = (activity: Activity) => {
    setDraggedActivity(activity);
  };

  function handleDrop(
    activity: Activity,
    targetSectionId: string,
    targetIndex: number
  ) {
    if (!draggedActivity) return;

    const sourceSectionId = Object.keys(sections).find((sectionId) =>
      sections[sectionId].activities.some((a) => a.id === activity.id)
    );

    if (!sourceSectionId) return;

    setSections((prevSections) => {
      const newSections = { ...prevSections };

      // Remove from source
      newSections[sourceSectionId].activities = newSections[
        sourceSectionId
      ].activities.filter((a) => a.id !== activity.id);

      // Insert at target position
      const targetActivities = [...newSections[targetSectionId].activities];
      targetActivities.splice(targetIndex, 0, activity);
      newSections[targetSectionId].activities = targetActivities;

      return newSections;
    });

    setDraggedActivity(null);
  }
  return (
    <div className="flex flex-col items-start relative w-full max-w-full px-4">
      {/* Header with Add Section button */}
      <div className="w-full flex items-center mb-4 justify-between">
        <span className="self-start"></span> {/* Optional header text */}
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center space-x-2">
          <span>Add section</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Sections with horizontal scroll */}
      <div className="w-full overflow-x-auto">
        <div className="flex min-w-fit">
          {Object.values(sections).map((section, index) => (
            <div key={section.id} className="flex">
              <Section
                section={section}
                activities={section.activities}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
              />
              {/* Add divider after each section except the last one */}
              {index < Object.values(sections).length - 1 && (
                <div className="w-px bg-gray-200 h-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
