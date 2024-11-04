import { Button } from '@mui/material';
import { WorkSpaceCard } from '../components/WorkSpaceCard';
import Modal from '../components/Modal';
import React, { useEffect, useState } from 'react';
import { User } from '../models/User';
import { Workspace } from '../models/Workspace';
import { useLocation } from 'react-router-dom';
import { WorkspaceService } from '../services/workspaceService';

export function Home() {
  const location = useLocation();
  const user: User = location.state?.user;
  const [workspaces, setWorkspace] = useState<Workspace[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchWorkspace();
  }, []);

  async function fetchWorkspace() {
    try {
      const data = await WorkspaceService.getAllWorkspaceByUsername(
        user.username,
      );
      console.log(user);
      setWorkspace(data);
      console.log('Fetched WorkspacesByID:', data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-5 flex flex-col">
      <div className="flex justify-end mb-2">
        <Button
          onClick={() => setIsModalOpen(true)}
          sx={{
            backgroundColor: '#448386',
            color: 'white',
            width: '130px',
            '&:hover': { backgroundColor: '#9ABCA9' },
          }}
        >
          New Project
        </Button>
      </div>
      <div className="bg-gray-400 h-px w-full mb-5" />
      <div className="grid grid-cols-3 gap-x-20 gap-y-16 justify-center">
        <WorkSpaceCard
          projectName="projectA"
          description="This is Project A"
          ownerName="Cat 1"
        />
        <WorkSpaceCard
          projectName="projectA"
          description="This is Project A"
          ownerName="Cat 1"
        />
        <WorkSpaceCard
          projectName="projectA"
          description="This is Project A"
          ownerName="Cat 1"
        />
        <WorkSpaceCard
          projectName="projectA"
          description="This is Project A"
          ownerName="Cat 1"
        />
        <WorkSpaceCard
          projectName="projectA"
          description="This is Project A"
          ownerName="Cat 1"
        />
        <WorkSpaceCard
          projectName="projectA"
          description="This is Project A"
          ownerName="Cat 1"
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-center mb-4">New Workspace</h2>
        <form>
          <label className="block mb-2">Workspace name</label>
          <input
            type="text"
            placeholder="Activity name"
            className="block mb-4 w-full p-2 border border-gray-300 rounded"
          />

          <label className="block mb-2">Description</label>
          <input
            type="text"
            placeholder="Description"
            className="block mb-4 w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="block w-full p-3 bg-green-600 text-white rounded cursor-pointer"
          >
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
}
