import { Button } from '@mui/material';
import { WorkSpaceCard } from '../components/workspace-card/WorkSpaceCard';
import styles from './Home.module.css';
import { useState } from 'react';
import Modal from '../components/activity/Modal';

export function Home() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);



    return (
        <div className={styles.container}>
            <div className={styles.buttonBox}>
            <Button onClick={()=> setIsModalOpen(true)} sx={{ backgroundColor: '#448386', color: 'white', width: '130px', '&:hover': { backgroundColor: '#9ABCA9' } }}>
                        New Project
                    </Button>
            </div>
            <div className={styles.line}></div>
            <div className={styles.containerGrid}>
            <WorkSpaceCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <WorkSpaceCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <WorkSpaceCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <WorkSpaceCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <WorkSpaceCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <WorkSpaceCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            </div>
            <Modal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>New Workspace</h2>
                <form>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Workspace name</label>
                    <input type="text" placeholder="Activity name" style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ddd' }} />
                    
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                    <input type="text" placeholder="Description" style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ddd' }} />
                    
                    <button type="submit" style={{ display: 'block', width: '100%', padding: '0.75rem', backgroundColor: '#5DA27D', color: 'white', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}>
                    Create
                    </button>
                </form>
                </Modal>


          
            
        </div>
        
        
    )
  }
  