'use client';

import { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  Box,
  Typography,
  Pagination,
  Stack,
  Chip,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Enhanced Filter component
const Filter = ({ column }) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <TextField
      size="small"
      variant="outlined"
      value={columnFilterValue ?? ''}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search ${column.columnDef.header}...`}
      sx={{ width: '100%', mb: 1 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" color="action" />
          </InputAdornment>
        ),
        endAdornment: columnFilterValue ? (
          <InputAdornment position="end">
            <IconButton
              size="small"
              onClick={() => column.setFilterValue('')}
              edge="end"
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default function DataTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: { 
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  if (!isMounted) return null;

  return (
    <Box sx={{ width: '100%' }}>
      {/* Global Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search in all columns..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: globalFilter ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setGlobalFilter('')}
                  edge="end"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </Box>

      {/* Table Stats */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {table.getFilteredRowModel().rows.length} of {data.length} records
        </Typography>
        
        <Stack direction="row" spacing={1}>
          <Chip 
            label={`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`} 
            variant="outlined" 
            size="small"
          />
        </Stack>
      </Box>

      {/* Main Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3, borderRadius: 2, mb: 3 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <>
                  {/* First Row: Search Boxes */}
                  <TableRow key={`${headerGroup.id}-filters`}>
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        key={`${header.id}-filter`}
                        sx={{ 
                          backgroundColor: '#f5f5f5',
                          padding: '16px 16px 8px 16px',
                          borderBottom: 'none'
                        }}
                      >
                        {!header.isPlaceholder && header.column.getCanFilter() && (
                          <Filter column={header.column} />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  {/* Second Row: Column Headers */}
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        sx={{ 
                          fontWeight: 'bold', 
                          backgroundColor: '#f5f5f5',
                          color: '#333',
                          padding: '8px 16px 16px 16px',
                          borderBottom: '2px solid #ddd'
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <Box
                            onClick={header.column.getToggleSortingHandler()}
                            style={{ cursor: 'pointer' }}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <TableSortLabel
                                active={header.column.getIsSorted() !== false}
                                direction={header.column.getIsSorted() || 'asc'}
                              />
                            )}
                          </Box>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                      '&:hover': { backgroundColor: '#f0f7ff' },
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id}
                        sx={{ 
                          padding: '12px 16px',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell 
                    colSpan={columns.length} 
                    sx={{ textAlign: 'center', py: 4 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      No results found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={table.getPageCount()}
          page={table.getState().pagination.pageIndex + 1}
          onChange={(e, page) => {
            table.setPageIndex(page - 1);
          }}
          color="primary"
          showFirstButton
          showLastButton
          shape="rounded"
          size="large"
        />
      </Box>
    </Box>
  );
}