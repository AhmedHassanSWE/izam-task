import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';

const CustomPagination = styled(Pagination)(() => ({
  '& .MuiPaginationItem-root.Mui-selected': {
    backgroundColor: '#48A74C',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#48A74C',
    },
  },
}));

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <CustomPagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}
