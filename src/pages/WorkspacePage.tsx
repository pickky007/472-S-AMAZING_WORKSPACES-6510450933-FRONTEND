import React, { useEffect, useRef, useState } from 'react';
import { SectionCard } from '../components/SectionCard';
import { SectionService } from '../services/sectionService';
import { ActivityService } from '../services/activityService';
import {
  ISectionCard as SectionType,
  IActivityCard,
} from '../components/types';
import Modal from '../components/Modal';
import { ActivityDetail } from '../components/ActivityDetail';
import { Section } from '../models/Section';
import { Activity } from '../models/Activity';
import { Workspace } from '../models/Workspace';
import { WorkspaceService } from '../services/workspaceService';
import { ISectionCreate } from '../types/section.types';
import { User } from '../models/User';
import { IUserLogin } from '../types/user.types';
import { IActivityCreate } from '../types/activity.types';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

type ActivityType = {
  id: string;
  rawId: number; // เพิ่ม rawId เพื่อเก็บ ID จริงจาก backend
  color: string;
  title: string;
  description: string;
  owner: string;
  date: string;
  sectionId: string; // เพิ่ม sectionId เพื่อติดตามว่า activity อยู่ใน section ไหน
};

type SectionType2 = {
  id: string;
  rawId: number; // เพิ่ม rawId เพื่อเก็บ ID จริงจาก backend
  title: string;
  activities: ActivityType[];
};

export function WorkspacePage({
  workspaceTo,
  user,
}: {
  workspaceTo: Workspace;
  user: IUserLogin;
}) {
  const [sections, setSections] = useState<Record<string, SectionType2>>({});
  const [draggedActivity, setDraggedActivity] = useState<ActivityType | null>(
    null,
  );
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(
    null,
  );
  const [actView, setActView] = useState<boolean>(false);

  const [isOnAddActivity, setOnAddActivity] = useState<boolean>(false);
  const [isOnAddSection, setOnAddSection] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const sectionName = useRef<HTMLInputElement>(null);
  const activityName = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const sDate = useRef<HTMLInputElement>(null);
  const eDate = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectSecId, setSelectSecId] = useState(Number);
  
  const fetchData = async () => {
    try {
      const sectionData: Section[] =
        await SectionService.getAllSectionsByWorkspaceId(workspaceTo.id);
      const transformedSections: Record<string, SectionType2> = {};
      const now = new Date();

      for (const section of sectionData) {
        const activities: Activity[] =
          await ActivityService.getActivitiesBySectionAndWorkspace(
            section.id,
            workspaceTo.id,
          );

        console.log(activities);

        const sectionKey = `section-${section.id}`;
        transformedSections[sectionKey] = {
          id: sectionKey,
          rawId: section.id,
          title: section.name,
          activities: activities.map((activity) => {
            const owner = activity.owner;
            const startDate = new Date(activity.startDate);
            const endDate = new Date(activity.endDate);
            const color =
              now > endDate
                ? '#CC2E2E'
                : now >= startDate && now <= endDate
                  ? '#3A8C84'
                  : '#CC2E2E';

            // สร้าง unique key โดยรวม section ID และ activity ID
            const activityKey = `${sectionKey}-activity-${activity.id}`;

            // ฟังก์ชันสำหรับจัดรูปแบบวันที่
            const formatDate = (date: Date): string => {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const hours = String(date.getHours()).padStart(2, '0');
              const minutes = String(date.getMinutes()).padStart(2, '0');
              return `${year}-${month}-${day} ${hours}:${minutes}:00`; // สตริงที่จัดรูปแบบ
            };

            return {
              id: activityKey,
              rawId: activity.id,
              color,
              title: activity.name,
              description: activity.description,
              owner: owner,
              date: `Date ${formatDate(startDate)} - ${formatDate(endDate)}`, // ใช้วันที่ที่จัดรูปแบบ
              sectionId: sectionKey,
            };
          }),
        };
      }
      setSections(transformedSections);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleDragStart(activity: ActivityType) {
    setDraggedActivity(activity);
  }

  function handleToggleView(event: any, newView: string | null) {
    if (newView !== null) {
      setActView(newView === 'list-view');
    }
  }

  function handleActivityClick(activity: ActivityType) {
    setSelectedActivity(activity);
  }

  async function handleDrop(
    activity: ActivityType,
    targetSectionId: string,
    targetIndex: number,
  ) {
    if (!draggedActivity) return;

    const sourceSectionId = draggedActivity.sectionId;

    // ถ้าลากไปที่เดิม ไม่ต้องทำอะไร
    if (
      sourceSectionId === targetSectionId &&
      sections[targetSectionId].activities[targetIndex]?.id ===
        draggedActivity.id
    ) {
      setDraggedActivity(null);
      return;
    }

    try {
      setIsLoading(true);

      const toSectionId = sections[targetSectionId].rawId;

      await ActivityService.moveActivity(
        workspaceTo.id,
        toSectionId,
        draggedActivity.rawId,
      );

      const updatedActivity = {
        ...draggedActivity,
        id: `${targetSectionId}-activity-${draggedActivity.rawId}`,
        sectionId: targetSectionId,
      };

      setSections((prevSections) => {
        const newSections = { ...prevSections };

        newSections[sourceSectionId] = {
          ...newSections[sourceSectionId],
          activities: newSections[sourceSectionId].activities.filter(
            (a) => a.id !== draggedActivity.id,
          ),
        };

        // เพิ่มไปยัง target section
        const targetActivities = [...newSections[targetSectionId].activities];
        targetActivities.splice(targetIndex, 0, updatedActivity);
        newSections[targetSectionId] = {
          ...newSections[targetSectionId],
          activities: targetActivities,
        };

        return newSections;
      });

      // รีเฟรชข้อมูล
      await fetchData();
    } catch (error) {
      console.error('Error moving activity:', error);
      alert('Failed to move activity. Please try again.');
      await fetchData();
    } finally {
      setIsLoading(false);
      setDraggedActivity(null);
    }
  }

  function handleCreateSection(event: React.FormEvent) {
    let sec: ISectionCreate = {
      workspace_id: workspaceTo.id,
      name: sectionName.current?.value!,
    };
    SectionService.createSection(sec)
      .then((r) => {
        fetchData();
        setOnAddSection(false);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });

    event.preventDefault();
  }

  function handleCreateActivity(event: React.FormEvent) {
    let act: IActivityCreate = {
      workspace_id: workspaceTo.id,
      name: activityName.current?.value!,
      description: description.current?.value!,
      start_date: sDate.current?.value!,
      end_date: eDate.current?.value!,
      owner: user.username,
      section_id: selectSecId,
    };

    console.log(act);

    ActivityService.createActivity(act)
      .then((r) => {
        fetchData();
        setOnAddSection(false);
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });

    setOnAddActivity(false);
    event.preventDefault();
  }

  function setModalActivity(sec: number) {
    setSelectSecId(sec);
    setOnAddActivity(true);
  }

  return (
    <div className="flex flex-col items-start relative w-full max-w-full p-8">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">Loading...</div>
        </div>
      )}

      <div className="w-full flex items-center mb-4 justify-between">
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={actView ? 'list-view' : 'normal-view'}
          onChange={handleToggleView}
          aria-label="View Mode"
          sx={{
            '& .MuiToggleButton-root': {
              border: 'none',
              padding: '6px 16px',
              textTransform: 'none',
              fontWeight: 500,
              width: 'full',
              '&.Mui-selected': {
                backgroundColor: '#3A8C84',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#2D7A72',
                }
              },
              '&:hover': {
                backgroundColor: 'rgba(58, 140, 132, 0.08)',
              }
            }
          }}
        >
          <ToggleButton value="normal-view">Normal View</ToggleButton>
          <ToggleButton value="list-view">List View</ToggleButton>
        </ToggleButtonGroup>
        <span className="self-start"></span>
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

      {!actView ? (
        <div className="w-full overflow-x-auto">
          <div className="flex min-w-fit">
            {Object.values(sections).map((section, index) => (
              <div key={section.id} className="flex">
                <SectionCard
                  section={section}
                  activities={section.activities}
                  onDrop={handleDrop}
                  onDragStart={handleDragStart}
                  handleOnAddOptionClick={() => {
                    setModalActivity(section.rawId);
                  }}
                  onActivityClick={handleActivityClick}
                  onEditClick={() => setIsEditModalOpen(true)}
                />
                {index < Object.values(sections).length - 1 && (
                  <div className="w-px bg-gray-200 h-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full">
          {Object.values(sections).map((section) => (
            <div key={section.id} className="mb-4">
              <div className="bg-gray-100 p-3 rounded-t-lg flex justify-between items-center">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <button 
                  className="text-teal-600 hover:text-teal-800"
                  onClick={() => setModalActivity(section.rawId)}
                >
                 
                </button>
              </div>
              <div className="bg-white rounded-b-lg shadow-sm p-2">
                {section.activities.length > 0 ? (
                  section.activities.map((activity) => (
                    <div 
                      key={activity.id}
                      className="p-3 mb-2 border-l-4 hover:bg-gray-50 cursor-pointer rounded transition-colors"
                      style={{ borderLeftColor: activity.color }}
                      onClick={() => handleActivityClick(activity)}
                    >
                      <h4 className="font-medium">{activity.title}</h4>
                      <div className="flex mt-1 text-sm text-gray-600">
                        <div className="mr-4">{activity.owner}</div>
                        <div>Time:  {activity.date.replace('Date ', '')}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-3 px-2 text-gray-500 text-center">
                    No activities in this section
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedActivity && (
        <div className="activity-detail-container fixed right-0 top-0 bottom-0 w-1/3 bg-white shadow-lg p-4">
          <ActivityDetail
            owner={selectedActivity.owner}
            description={selectedActivity.description}
            date={selectedActivity.date}
            title={selectedActivity.title}
            onClose={() => setSelectedActivity(null)}
          />
        </div>
      )}

      {/* Add Activity Modal */}
      <Modal isOpen={isOnAddActivity} onClose={() => setOnAddActivity(false)}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Add Activity
        </h2>
        <form onSubmit={handleCreateActivity}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Activity name
          </label>
          <input
            type="text"
            ref={activityName}
            placeholder="Activity name"
            style={{
              display: 'block',
              marginBottom: '1rem',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ddd',
            }}
          />

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Description
          </label>
          <input
            type="text"
            ref={description}
            placeholder="Description"
            style={{
              display: 'block',
              marginBottom: '1rem',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ddd',
            }}
          />

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Date range
          </label>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <input
              type="date"
              ref={sDate}
              style={{
                width: '48%',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid #ddd',
              }}
            />
            <input
              type="date"
              ref={eDate}
              style={{
                width: '48%',
                padding: '0.5rem',
                borderRadius: '0.25rem',
                border: '1px solid #ddd',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#5DA27D',
              color: 'white',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </form>
      </Modal>

      {/* Add Section Modal */}
      <Modal isOpen={isOnAddSection} onClose={() => setOnAddSection(false)}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Add Section
        </h2>
        <form onSubmit={handleCreateSection}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Section Name
          </label>
          <input
            type="text"
            ref={sectionName}
            placeholder="Section Name"
            style={{
              display: 'block',
              marginBottom: '1rem',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              border: '1px solid #ddd',
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            type="submit"
            style={{
              display: 'block',
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#5DA27D',
              color: 'white',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
        </form>
      </Modal>

      {/* Edit Activity Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        {selectedActivity && (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
              Edit Activity
            </h2>
            <form>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Activity Name
              </label>
              <input
                type="text"
                placeholder="Activity Name"
                defaultValue={selectedActivity.title}
                style={{
                  display: 'block',
                  marginBottom: '1rem',
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ddd',
                }}
              />
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Description
              </label>
              <input
                type="text"
                placeholder="Description"
                defaultValue={selectedActivity.description}
                style={{
                  display: 'block',
                  marginBottom: '1rem',
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #ddd',
                }}
              />
              <button
                type="submit"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#5DA27D',
                  color: 'white',
                  borderRadius: '0.25rem',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Save Changes
              </button>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
} 