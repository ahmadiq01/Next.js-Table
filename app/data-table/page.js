'use client';

import { useMemo, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataTable from './DataTable';
import { userData, userColumns } from './tableData';

export default function DataTablePage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const data = useMemo(() => userData, []);
  const columns = useMemo(() => userColumns, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/')}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1">
          User Data Table
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mb: 4 }}>
        <DataTable data={data} columns={columns} />
      </Box>
    </Container>
  );
}