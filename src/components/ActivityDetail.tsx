import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Modal from './Modal';
import { Button } from '@mui/material';
type ActivityProps = {
  title: string;
  description: string;
  status: string;
  assignee: string;
  startDate: string;
  endDate: string;
  onClose?: () => void;
};
export function ActivityDetail({ title, description, status, assignee, startDate, endDate, onClose = () => {} }: ActivityProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal () {
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  };

  return (
    <div style={{
      padding: '0.5rem',
      fontFamily: 'monospace',
      maxWidth: '37.5rem',
      margin: '1rem auto',
      // border: '1px solid #ddd',
      borderRadius: '0.625rem',
      // boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)'
    }}>
      <Button onClick={onClose}>Done</Button>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.25rem'
      }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h2>
        <div>
          <button style={{ marginRight: '0.625rem', fontSize: '1rem' }}><FaTrash /></button>
          <button style={{ fontSize: '1rem' }} onClick={openModal}><FaEdit /></button>
        </div>
      </header>
      <hr />
      <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{description}</h3>
        <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
          <li style={{ display: 'flex', alignItems: 'center', fontSize: '1.125rem', marginBottom: '0.625rem' }}>
            <span style={{ color: 'brown', marginRight: '0.625rem' }}>●</span> {status}
          </li>
          <li style={{ display: 'flex', alignItems: 'center', fontSize: '1.125rem', marginBottom: '0.625rem' }}>
            <span style={{ color: 'brown', marginRight: '0.625rem' }}>●</span> Assign to <a href="/" style={{ color: 'blue' }}>{assignee}</a>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', fontSize: '1.125rem' }}>
            <span style={{ color: 'brown', marginRight: '0.625rem' }}>●</span>Date: {startDate} - {endDate}
          </li>
        </ul>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Edit Activity</h2>
        <form>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Activity name</label>
          <input type="text" placeholder="Activity name" style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ddd' }} />

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
          <input type="text" placeholder="Description" style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ddd' }} />
          
          
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Date range</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <input type="date" style={{ width: '48%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ddd' }} />
            <input type="date" style={{ width: '48%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ddd' }} />
          </div>

          <button type="submit" style={{ display: 'block', width: '100%', padding: '0.75rem', backgroundColor: '#5DA27D', color: 'white', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}>
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

