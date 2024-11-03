import { ProjectCard } from '../components/project-card/ProjectCard';
import styles from './AllProject.module.css';

export function AllProject() {
    return (
       
        <div className={styles.container}>
            <ProjectCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <ProjectCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <ProjectCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <ProjectCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <ProjectCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <ProjectCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <ProjectCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            <ProjectCard projectName="projectA" description="This is Project A" owenerName="Cat 1"/>
            
        </div>
    )
  }
  