import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Dashboard = ({ children }) => {
  const [open, setOpen] = React.useState(true); // для управления открытием/закрытием сайдбара

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Header компонент */}
      <Header open={open} setOpen={setOpen} />
      
      {/* Sidebar компонент */}
      <Sidebar open={open} />
      
      {/* Основной контент */}
      <Box component="main" sx={{
        flexGrow: 1,
        p: 3,
        mt: 8, // отступ под header
        width: { sm: `calc(100% - ${open ? 240 : 64}px)` }
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard; 