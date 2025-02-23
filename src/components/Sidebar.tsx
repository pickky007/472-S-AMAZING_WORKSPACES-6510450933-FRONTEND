import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  Folder,
  ExpandMore,
  ExpandLess,
  Logout,
  Home,
  Chat,
  Book,
  CalendarMonth,
} from '@mui/icons-material';
import { IUserLogin } from '../types/user.types';

interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  subitems?: Array<{
    label: string;
    path: string;
  }> | null;
}

interface SidebarProps {
  user: IUserLogin | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  showHiddenMenu: boolean;
  onHomeClick: () => void;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    icon: <Home className="text-white" />,
    path: '/home',
  },
  {
    label: 'Chat',
    icon: <Chat className="text-white" />,
    path: '/chat',
  },
  {
    label: 'Kanbanboard',
    icon: <Book className="text-white" />,
    path: '/kanbanboard',
  },
  {
    label: 'Calendar',
    icon: <CalendarMonth className="text-white" />,
    path: '/calendar',
  },
];

function Sidebar({ user, setIsAuthenticated, showHiddenMenu, onHomeClick }: SidebarProps) {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  function handleItemClick(item: NavigationItem) {
    if (item.subitems) {
      setExpandedItem(expandedItem === item.label ? null : item.label);
    } else {
      navigate(item.path);
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    navigate('/');
  }

  return (
    <div className="flex">
      <Box
        className="w-64 bg-foreground text-white flex flex-col"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
        }}
      >
        <Box className="p-5 border-b border-gray-700">
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Workspacename
          </Typography>
        </Box>
        
        <List className="flex-1 py-2">
          {navigationItems
            .filter(item => !item.label || showHiddenMenu || item.label === 'Home')
            .map((item) => (
              <React.Fragment key={item.label}>
                <ListItem
                  className="p-2 hover:bg-gray-500 cursor-pointer"
                  onClick={() => {
                    if (item.label === 'Home') {
                      onHomeClick();
                    }
                    handleItemClick(item);
                  }}
                >
                  <ListItemIcon className="min-w-10 text-white">
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={<span className="text-sm font-normal">{item.label}</span>}
                  />
                </ListItem>
              </React.Fragment>
            ))}
        </List>

        <ListItem
          className="border-t border-gray-700 mt-auto cursor-pointer"
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>

      {/* Add a spacer div to offset the fixed sidebar */}
      <div className="w-64" />
      
      {/* Main content will be rendered next to this component */}
    </div>
  );
}

export default Sidebar;