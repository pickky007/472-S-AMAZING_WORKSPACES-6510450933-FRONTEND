import { useNavigate } from 'react-router-dom';
import styles from './ProjectCard.module.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';

interface ProjectCardProps{
    projectName: String;
    description: String;
    owenerName: String
}

export function ProjectCard({ projectName, description, owenerName }:ProjectCardProps) {
    
    const handleClick = () => {
        console.log("Component clicked!");
      };

    return(
        <div onClick={handleClick} className={styles.projectCard}>
            <div className={styles.header}>
                <div className={styles.projectHeaderInner}>
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