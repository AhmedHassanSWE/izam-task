import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import JobCard from "./JobCard";
import JobTag from "./JobTag";
import SortingDropdown from "../ui/CustomSelect";
import PaginationRounded from "./Pagination";

const jobList = Array.from({ length: 20 }, (_, i) => ({
  title: `Job Title ${i + 1}`,
  company: `Company ${i + 1}`,
  location: `City ${i + 1}`,
  posted: `${i + 1} days ago`,
  experience: `${i % 3} - ${i % 5}y of exp`,
  jobType: "Full time",
  workType: i % 2 === 0 ? "Remote" : "Hybrid",
  category: "Category",
}));

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
    <Box>
      <Box sx={{ display: isMobile ? "none" : "flex", alignItems: "center", justifyContent: "flex-end", mt: 4, mb: 3 }}>
        <SortingDropdown />
      </Box>
      <JobTag jobTitle="UI Designer" jobsCount={jobList.length} location="Egypt" />

      <Box>
        {visibleJobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
        <PaginationRounded
          count={Math.ceil(jobList.length / ITEMS_PER_PAGE)}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
