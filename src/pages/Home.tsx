import { Button } from '@mui/material';
import { WorkSpaceCard } from '../components/WorkSpaceCard';
import Modal from '../components/Modal';
import React, { useEffect, useRef, useState } from 'react';
import { User } from '../models/User';
import { Workspace } from '../models/Workspace';
import { useLocation } from 'react-router-dom';
import { WorkspaceService } from '../services/workspaceService';
import { IWorkspaceCreate } from '../types/workspace.types';

export function Home() {
  const location = useLocation();
  const user: User = location.state?.user;
  const [workspaces, setWorkspace] = useState<Workspace[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);

  const workspaceName = useRef<HTMLInputElement>(null);
  const workspaceCode = useRef<HTMLInputElement>(null);
  const workspaceDescription = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  async function fetchWorkspaces() {
    try {
      const data = await WorkspaceService.getAllWorkspaceByUsername(
        user.username,
      );
      setWorkspace(data);
      console.log('Fetched WorkspacesByID:', data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCreate(event: React.FormEvent) {
    console.log(workspaceName.current?.value);
    console.log(workspaceDescription.current?.value);

    let workspace : IWorkspaceCreate = {
      name: workspaceName.current?.value!,
      description: workspaceDescription.current?.value,
      owner: user.username
    }
    WorkspaceService.createWorkspace(workspace).then((r)=>{
      fetchWorkspaces();
      setIsModalOpen(false);
    });
    
    event.preventDefault();
  }

  function handleJoin(event: React.FormEvent) {
    console.log(workspaceCode.current?.value);

    event.preventDefault();
  }

  return (
    <div className="p-5 flex flex-col">
      <div className="flex justify-end mb-2">
        <Button
          onClick={() => setIsJoinModalOpen(true)}
          sx={{
            backgroundColor: '#448386',
            color: 'white',
            width: '160px',
            '&:hover': { backgroundColor: '#9ABCA9' },
          }}
        >
          Join Workspace
        </Button>
        <div className="w-5"></div>
        <Button
          onClick={() => setIsModalOpen(true)}
          sx={{
            backgroundColor: '#448386',
            color: 'white',
            width: '160px',
            '&:hover': { backgroundColor: '#9ABCA9' },
          }}
        >
          New Workspace
        </Button>
      </div>
      <div className="bg-gray-400 h-px w-full mb-5" />
      <div className="grid grid-cols-3 gap-x-20 gap-y-16 justify-center">
        {isLoading ? (
          <p>Loading workspaces...</p>
        ) : (
          workspaces.map((workspace) => (
            <WorkSpaceCard
              key={workspace.id}
              projectName={workspace.name}
              description={workspace.description || 'No description available'}
              ownerName={workspace.owner}
            />
          ))
        )}
      </div>

      <Modal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)}>
        <h2 className="text-center mb-4">Join workspaces</h2>
        <form onSubmit={handleJoin}>
          <label className="block mb-2">Workspace code</label>

          <input
            type="text"
            ref={workspaceCode}
            placeholder="Enter code"
            className="block mb-4 w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="block w-full p-3 bg-green-600 text-white rounded cursor-pointer"
          >
            Join
          </button>
        </form>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-center mb-4">New Workspace</h2>

        <form onSubmit={handleCreate}>
          <label className="block mb-2">Workspace name</label>
          <input
            type="text"
            ref={workspaceName}
            placeholder="Workspace name"
            className="block mb-4 w-full p-2 border border-gray-300 rounded"
          />

          <label className="block mb-2">Description</label>
          <input
            type="text"
            ref={workspaceDescription}
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
