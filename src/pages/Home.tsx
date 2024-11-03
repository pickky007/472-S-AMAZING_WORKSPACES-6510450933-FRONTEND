import { Button } from '@mui/material';
import { WorkSpaceCard } from '../components/workspace-card/WorkSpaceCard';
import styles from './Home.module.css';

export function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.buttonBox}>
            <Button sx={{ backgroundColor: '#448386', color: 'white', width: '130px', '&:hover': { backgroundColor: '#9ABCA9' } }}>
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
        </div>
       
        
    )
  }
  