import { ProjectCard } from "../components/project-card/ProjectCard";
import { Workspace } from "../models/Workspace";
import { WorkspaceService } from "../services/workspaceService";
import React, { useEffect, useState } from "react";

export function AllProject() {
  const [workspaces, setWorkspace] = useState<Workspace[]>([]);
  
  useEffect(() => {
    fetchWorkspace();
  }, []);

  async function fetchWorkspace() {
    try {
      const data = await WorkspaceService.getAllWorkspaceByUsername('user1');
      setWorkspace(data);
      console.log("Fetched Users:", data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      <ProjectCard
        projectName="projectA"
        description="This is Project A"
        ownerName="Cat 1"
      />
      <ProjectCard
        projectName="projectA"
        description="This is Project A"
        ownerName="Cat 1"
      />
      <ProjectCard
        projectName="projectA"
        description="This is Project A"
        ownerName="Cat 1"
      />
      <ProjectCard
        projectName="projectA"
        description="This is Project A"
        ownerName="Cat 1"
      />
      <ProjectCard
        projectName="projectA"
        description="This is Project A"
        ownerName="Cat 1"
      />
      <ProjectCard
        projectName="projectA"
        description="This is Project A"
        ownerName="Cat 1"
      />
      <ProjectCard
        projectName="projectA"
        description="This is Project A"
        ownerName="Cat 1"
      />
      <ProjectCard
        projectName="projectA"
        description="This is Project A"
        ownerName="Cat 1"
      />
    </div>
  );
}
