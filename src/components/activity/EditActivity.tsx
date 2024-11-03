import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './EditActivity.module.css';
type EditActivityProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (activityData: { activityName: string; description: string; assignee: string; startDate: string; endDate: string; }) => void;
};

export function EditActivity({ isOpen=true, onClose=()=>{}, onSave=()=>{} }:EditActivityProps){
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSave = () => {
    onSave({ activityName, description, assignee, startDate, endDate });
    onClose(); // Close the modal after saving
  };

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Activity"
      className={styles.content}
      overlayClassName={styles.overlay}
    >

      <h2>Activity name</h2>
      <input 
        type="text" 
        value={activityName} 
        onChange={(e) => setActivityName(e.target.value)} 
        placeholder="Activity name"
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      
      <h3>Description</h3>
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description"
        style={{ width: '100%', marginBottom: '1rem' }}
      />

      <h3>Assign to?</h3>
      <select 
        value={assignee} 
        onChange={(e) => setAssignee(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      >
        <option value="">Select a person</option>
        <option value="Person 1">Person 1</option>
        <option value="Person 2">Person 2</option>
      </select>

      <h3>Date</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          style={{ flex: 1 }}
        />
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          style={{ flex: 1 }}
        />
      </div>

      <button 
        onClick={handleSave} 
        style={{
          width: '100%', 
          padding: '0.75rem', 
          backgroundColor: '#4CAF50', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '0.5rem',
          fontSize: '1rem'
        }}
      >
        Save
      </button>
    </Modal>
  );
};