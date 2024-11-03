import React, { useState } from 'react';


type AddSectionModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (sectionName: string) => void;
  };
  
  export function AddSectionModal({ isOpen, onClose, onSubmit }: AddSectionModalProps) {
    const [sectionName, setSectionName] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (sectionName.trim()) {
        onSubmit(sectionName);
        setSectionName('');
      }
    };
  
    return (
      isOpen ? (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button onClick={onClose} className="close-button">×</button>
            <h2>Section name</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Section name"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ddd' }}
              />
              <button type="submit" className="submit-button">Create</button>
            </form>
          </div>
        </div>
      ): <></>
    );
  }
  