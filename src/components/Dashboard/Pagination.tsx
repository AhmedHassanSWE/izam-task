import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";

const CustomPagination = styled(Pagination)(() => ({
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "#48A74C",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#48A74C",
    },
  },
}));

interface PaginationRoundedProps {
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationRounded: React.FC<PaginationRoundedProps> = ({ count, onChange }) => {
  return (
    <Stack spacing={2}>
      <CustomPagination size="large" count={count} variant="outlined" shape="rounded" onChange={onChange} />
    </Stack>
  );
};

export default PaginationRounded;
