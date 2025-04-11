export const userData = [
  { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', status: 'Active' },
  { id: 4, name: 'Alice Brown', age: 24, email: 'alice@example.com', status: 'Pending' },
  { id: 5, name: 'Charlie Wilson', age: 36, email: 'charlie@example.com', status: 'Active' },
  { id: 6, name: 'Diana Miller', age: 29, email: 'diana@example.com', status: 'Inactive' },
  { id: 7, name: 'Edward Davis', age: 41, email: 'edward@example.com', status: 'Pending' },
];

export const userColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableSorting: true,
    enableFiltering: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    enableSorting: true,
    enableFiltering: true,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    enableSorting: true,
    enableFiltering: false,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableSorting: true,
    enableFiltering: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: true,
    enableFiltering: true,
    cell: (info) => {
      const status = info.getValue();
      let color = '#777';

      if (status === 'Active') color = '#4caf50';
      else if (status === 'Inactive') color = '#f44336';
      else if (status === 'Pending') color = '#ff9800';

      return (
        <span
          style={{
            color: 'white',
            background: color,
            padding: '3px 10px',
            borderRadius: '12px',
            fontSize: '0.85rem',
            display: 'inline-block',
          }}
        >
          {status}
        </span>
      );
    },
  },
];