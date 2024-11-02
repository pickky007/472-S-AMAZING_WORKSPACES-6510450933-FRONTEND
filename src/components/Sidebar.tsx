// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse
} from '@mui/material';
import {
  Newspaper,
  Dashboard,
  Folder,
  ExpandMore,
  ExpandLess,
  Logout
} from '@mui/icons-material';
import styles from './Sidebar.module.css';

interface NavigationItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  subitems?: Array<{
    label: string;
    path: string;
  }>;
}

const navigationItems: NavigationItem[] = [
  { 
    label: 'News feed', 
    icon: <Newspaper />, 
    path: '/news-feed' 
  },
  { 
    label: 'Kanbanboard', 
    icon: <Dashboard />, 
    path: '/kanbanboard' 
  },
  { 
    label: 'Projects', 
    icon: <Folder />,
    path: '/projects',
    subitems: [
      { label: 'Project 1', path: '/project-1' },
      { label: 'Project 2', path: '/project-2' },
      { label: 'Project 3', path: '/project-3' }
    ]
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleItemClick = (item: NavigationItem) => {
    if (item.subitems) {
      setExpandedItem(expandedItem === item.label ? null : item.label);
    } else {
      navigate(item.path);
    }
  };

  const handleSubItemClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    // เพิ่ม logic การ logout ที่นี่
    console.log('Logging out...');
    // ตัวอย่างเช่น: 
    // logout().then(() => navigate('/login'));
  };

  return (
    <Box className={styles.sidebarContainer}>
      <Box className={styles.workspaceHeader}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Workspacename
        </Typography>
      </Box>

      <List className={styles.navList}>
        {navigationItems.map((item) => (
          <React.Fragment key={item.label}>
            <ListItem 
              className={styles.navItem} 
              onClick={() => handleItemClick(item)}
              sx={{ cursor: 'pointer' }}
            >
              <ListItemIcon className={styles.navItemIcon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={<span className={styles.navItemText}>{item.label}</span>} 
              />
              {item.subitems && (
                expandedItem === item.label ? <ExpandLess /> : <ExpandMore />
              )}
            </ListItem>

            {item.subitems && (
              <Collapse in={expandedItem === item.label} timeout="auto" unmountOnExit>
                <List disablePadding>
                  {item.subitems.map((subitem) => (
                    <ListItem 
                      key={subitem.label} 
                      className={styles.subNavItem}
                      onClick={() => handleSubItemClick(subitem.path)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <ListItemText primary={subitem.label} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>

      <ListItem 
        className={styles.logoutButton} 
        onClick={handleLogout}
        sx={{ cursor: 'pointer' }}
      >
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Box>
  );
};

export default Sidebar;