'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, Paper } from '@mui/material';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleViewTable = () => {
    setLoading(true);
    router.push('/data-table');
  };

  if (!isMounted) return null;

  return (
    <Container maxWidth="md" sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Paper elevation={3} sx={{
        p: 5,
        textAlign: 'center',
        background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)',
      }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome to Glimpse
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Your simple yet powerful data visualization tool
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleViewTable}
          disabled={loading}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1.1rem',
            boxShadow: '0 4px 8px rgba(63, 81, 181, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 12px rgba(63, 81, 181, 0.4)',
            },
          }}
        >
          {loading ? 'Loading...' : 'View Data Table'}
        </Button>
      </Paper>
    </Container>
  );
}