import React, { useState, useEffect, useRef } from 'react';
import { Workspace } from '../models/Workspace';
import { IUserLogin } from '../types/user.types';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { ActivityService } from '../services/activityService';
import { Activity } from '../models/Activity';
import { Modal } from '@mui/material';
import { IActivityCreate } from '../types/activity.types';
import { Section } from '../models/Section';
import { SectionService } from '../services/sectionService';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import { Margin } from '@mui/icons-material';


interface CalendarProps {
  workspace: Workspace;
  user: IUserLogin;
}

interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  id: string;
}

export const CalendarPage: React.FC<CalendarProps> = ({ workspace, user }) => {
  const [isOnAddActivity, setOnAddActivity] = useState<boolean>(false);
  const description = useRef<HTMLInputElement>(null);
  const activityName = useRef<HTMLInputElement>(null);
  const sDate = useRef<HTMLInputElement>(null);
  const eDate = useRef<HTMLInputElement>(null);
  const [selectSecId, setSelectSecId] = useState<number>(1);
  const [sections, setSections] = useState<Section[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [empty, setEmpty] = useState<boolean>(true);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [sectionName, setSectionName] = useState<String>();
  const fetchData = async () => {
    try {
      setLoading(true);
      const fetchedActivity = await ActivityService.getActivityByWorkspace(workspace.id);
      setActivities(fetchedActivity);
      console.log("available actiivty: ")
      console.log(activities)
      

      const fetchedSection = await SectionService.getAllSectionsByWorkspaceId(workspace.id);
      setSections(fetchedSection);
      console.log("section")
      console.log(sections)

     
      if (fetchedActivity.length > 0) {
        setEmpty(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [workspace.id]);

  useEffect(() => {
    if (activities.length > 0) {
      const mappedEvents = activities.map((activity) => ({
        title: activity.name,
        sectionId: activity.sectionId,
        start: formatDateToCustomFormat(activity.startDate),
        end: formatDateToCustomFormat(activity.endDate),
        id: `${activity.id}${workspace.id}`,
   
        
      }));
    
      setCalendarEvents(mappedEvents);
    }


    console.log(activities)
  }, [activities, workspace.id]);
  

  function formatDateToCustomFormat(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;

   
  }



  const handleCreateActivity = (event: React.FormEvent) => {
    const activityData: IActivityCreate = {
      workspace_id: workspace.id,
      name: activityName.current?.value!,
      description: description.current?.value!,
      start_date: sDate.current?.value!,
      end_date: eDate.current?.value!,
      owner: user.username,
      section_id: selectSecId,
    };

    console.log('Id'+selectSecId)

    ActivityService.createActivity(activityData)
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });

    setOnAddActivity(false);
    event.preventDefault();
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={() => setOnAddActivity(true)}>
        Create new activity
      </button>
      <br />
      <FullCalendar
        plugins={[dayGridPlugin]}
        events={calendarEvents}
        eventColor="#5DA27D"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          meridiem: false,
        }}
        eventClick={function(info) {
          const eventId = info.event.id;
          
          const clickedActivity = activities.find(activity => 
            `${activity.id}${workspace.id}` === eventId
          );
          
          
          if (clickedActivity) {            
           
      
            setSelectedActivity(clickedActivity);
            setEditModalOpen(true);
          }
        }}
      
        />

 

      <Modal open={isOnAddActivity} onClose={() => setOnAddActivity(false)}>
        <div style={styles.modal}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight:'bold', fontSize:'1.4rem' }}>Create Activity</h2>
          <form onSubmit={handleCreateActivity}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Activity name</label>
            <input
              type="text"
              ref={activityName}
              placeholder="Activity name"
              style={inputStyles}
            />
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
            <input
              type="text"
              ref={description}
              placeholder="Description"
              style={inputStyles}
            />
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Date range</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <input
                type="date"
                ref={sDate}
                style={{ width: '48%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ddd' }}
              />
              <input
                type="date"
                ref={eDate}
                style={{ width: '48%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ddd' }}
              />
            </div>

            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Section</label>
            <select
              onChange={(e) => setSelectSecId(Number(e.target.value))}
              style={inputStyles}
            >
              <option value="" disabled selected>
                Select Section
              </option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>

            <button type="submit" style={submitButtonStyles}>
              Create
            </button>
          </form>
        </div>
      </Modal>
      <Modal open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <div style={styles.modal}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight:'bold', fontSize:'1.4rem' }}>
            Activity Details
          </h2>
          {selectedActivity && (
            <div> 
               <p style={{fontWeight: 'bold', fontSize:'20px'}}>Activity name</p>
               <p style={{marginBottom:'5px'}}>{selectedActivity.name}</p>

          
              <p style={{fontWeight: 'bold', fontSize:'20px'}}>Description</p>
              <p style={{marginBottom:'5px'}}>{selectedActivity.description}</p>

              <p style={{fontWeight: 'bold', fontSize:'20px'}}>Start Date</p>
              <p style={{marginBottom:'5px'}}>{new Date(selectedActivity.startDate).toLocaleDateString()}</p>

              <p style={{fontWeight: 'bold', fontSize:'20px'}}>End Date</p>
              <p style={{marginBottom:'5px'}}>{new Date(selectedActivity.startDate).toLocaleDateString()}</p>
      
              <p><strong>Owner:</strong> {selectedActivity.owner}</p>
            
            </div>
          )}
        </div>
    </Modal>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    justifyContent: 'center',
    
    height: '100vh',
  },
  button: {
    display: 'block',
    padding: '0.75rem',
    backgroundColor: '#5DA27D',
    color: 'white',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
    
  },

  modal:{
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '0.25rem',
    width: '40%',              
    position: 'fixed' as 'fixed',         
    top: '50%',                
    left: '50%',              
    transform: 'translate(-50%, -50%)', 
  }
};


const inputStyles = {
  display: 'block',
  marginBottom: '1rem',
  width: '100%',
  padding: '0.5rem',
  borderRadius: '0.25rem',
  border: '1px solid #ddd',
};

const submitButtonStyles = {
  display: 'block',
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#5DA27D',
  color: 'white',
  borderRadius: '0.25rem',
  border: 'none',
  cursor: 'pointer',
};
