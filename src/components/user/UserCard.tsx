import React from 'react';
import { User } from '../../models/User';
import { Button } from '../common/Button';

interface UserCardProps {
  user: User;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md"> {}
      <div className="flex items-center gap-4"> {}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-12 h-12 rounded-full object-cover" 
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600"> {}
            {user.initials}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold">{user.fullName}</h3> {}
          <p className="text-gray-600">{user.email}</p> {}
        </div>
      </div>
      <div className="mt-4 flex gap-2"> {}
        {onEdit && (
          <Button label="Edit Profile" onClick={onEdit} />
        )}
        {onDelete && (
          <Button variant="secondary" label="Delete User" onClick={onDelete} />
        )}
      </div>
    </div>
  );
}
