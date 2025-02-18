import React from 'react';
import { List, ListItem, ListItemText, Button, Drawer, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <Box p={2} width="250px" role="presentation">
        <Typography variant="h6" gutterBottom>
          Sidebar
        </Typography>
        <List>
          <ListItem button component={Link} to="/students">
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem>
            <Button type="button" onClick={handleLogout} variant="contained" color="secondary">
              Logout
            </Button>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
