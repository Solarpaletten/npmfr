import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_URL}/api/v1/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => setData(response.data))
        .catch(error => console.error('Dashboard error:', error));
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        {data && (
          <Typography variant="body1">
            {JSON.stringify(data, null, 2)}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Dashboard; 