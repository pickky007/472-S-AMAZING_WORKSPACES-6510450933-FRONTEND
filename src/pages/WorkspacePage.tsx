import React, { useState } from "react";
import { Section } from "../components/Section";

import { Section as SectionType, Activity } from "../components/types";
import Modal from "../components/Modal";
import { ActivityDetail } from "../components/ActivityDetail";

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
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [isOnAddActivity, setOnAddActivity] = useState<boolean>(false);
  const [isOnAddSection, setOnAddSection] = useState<boolean>(false);

  function handleDragStart(activity: Activity) {
    setDraggedActivity(activity);
  }

  function handleActivityClick(activity: Activity) {
    setSelectedActivity(activity);
  }

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
        <button
          onClick={() => setOnAddSection(true)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center space-x-2"
        >
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
                setOnAddActivity={setOnAddActivity}
                onActivityClick={handleActivityClick}
              />
              {/* Add divider after each section except the last one */}
              {index < Object.values(sections).length - 1 && (
                <div className="w-px bg-gray-200 h-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isOnAddActivity} onClose={() => setOnAddActivity(false)}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Add Activity
        </h2>
        <form>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Activity name
          </label>
          <input
            type="text"
            placeholder="Activity name"
            style={{
              display: "block",
              marginBottom: "1rem",
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ddd",
            }}
          />

          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Description
          </label>
          <input
            type="text"
            placeholder="Description"
            style={{
              display: "block",
              marginBottom: "1rem",
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ddd",
            }}
          />

          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Assign to?
          </label>
          <select
            style={{
              display: "block",
              marginBottom: "1rem",
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ddd",
            }}
          >
            <option>Person</option>
            {/* Add more options as needed */}
          </select>

          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Date range
          </label>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <input
              type="date"
              style={{
                width: "48%",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                border: "1px solid #ddd",
              }}
            />
            <input
              type="date"
              style={{
                width: "48%",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                border: "1px solid #ddd",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#5DA27D",
              color: "white",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </form>
      </Modal>

      <Modal isOpen={isOnAddSection} onClose={() => setOnAddSection(false)}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Add Section
        </h2>
        <form>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            name
          </label>
          <input
            type="text"
            placeholder="Section name"
            style={{
              display: "block",
              marginBottom: "1rem",
              width: "100%",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              border: "1px solid #ddd",
            }}
          />
          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#5DA27D",
              color: "white",
              borderRadius: "0.25rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </form>
      </Modal>

      {selectedActivity && (
        <div className="activity-detail-container fixed right-0 top-0 bottom-0 w-1/3 bg-white shadow-lg p-4">
          <ActivityDetail
            assignee="???"
            description={selectedActivity.description}
            endDate="??"
            startDate="??"
            status={selectedActivity.status}
            title={selectedActivity.title}
            onClose={() => setSelectedActivity(null)}
          />
        </div>
      )}
    </div>
  );
}
