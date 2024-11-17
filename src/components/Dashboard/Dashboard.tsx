import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import JobCard from "./JobCard";
import JobTag from "./JobTag";
import SortingDropdown from "../ui/CustomSelect";
import PaginationRounded from "./Pagination";
import { jobList } from "@/models/JobCard";

const ITEMS_PER_PAGE = 5;

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleJobs = jobList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box paddingBottom={4}>
      <Box sx={{ display: isMobile ? "none" : "flex", alignItems: "center", justifyContent: "flex-end", mt: 4, mb: 3 }}>
        <SortingDropdown />
      </Box>
      <JobTag jobTitle="UI Designer" jobsCount={jobList.length} location="Egypt" />

      <Box>
        {visibleJobs.map((job, index) => (
          <JobCard focused={index === 0} key={index} {...job} />
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
        <PaginationRounded count={Math.ceil(jobList.length / ITEMS_PER_PAGE)} onChange={handlePageChange} />
      </Box>
    </Box>
  );
};

export default Dashboard;
