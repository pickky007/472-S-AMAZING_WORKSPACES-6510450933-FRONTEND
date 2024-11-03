import { useNavigate } from 'react-router-dom';
import styles from './WorkSpaceCard.module.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';

interface WorkSpaceCardProps{
    projectName: String;
    description: String;
    owenerName: String
}

export function WorkSpaceCard({ projectName, description, owenerName }:WorkSpaceCardProps) {
    
    const handleClick = () => {
        console.log("Component clicked!");
      };

    return(
        <div onClick={handleClick} className={styles.workspaceCard}>
            <div className={styles.header}>
                <div className={styles.workspaceHeaderInner}>
                    <p className={styles.projectName}>{projectName}</p>
                    <button className={styles.moreButton}>
                        <MoreVertIcon />
                    </button>
                    
                </div>
                
                <p className={styles.description}>{description}</p>    
            </div>
                <p className={styles.owner}>by {owenerName}</p>
        </div>

    );
}