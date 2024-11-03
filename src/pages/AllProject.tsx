import { useLocation } from "react-router-dom";
import { ProjectCard } from "../components/project-card/ProjectCard";
import { Workspace } from "../models/Workspace";
import { WorkspaceService } from "../services/workspaceService";
import React, { useEffect, useState } from "react";
import { User } from "../models/User";

export function AllProject() {
  const location = useLocation();
  const user: User = location.state?.user;
  const [workspaces, setWorkspace] = useState<Workspace[]>([]);

  useEffect(() => {
    fetchWorkspace();
  }, []);

  async function fetchWorkspace() {
    try {
      const data = await WorkspaceService.getAllWorkspaceByUsername(user.username);
      console.log(user);
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
