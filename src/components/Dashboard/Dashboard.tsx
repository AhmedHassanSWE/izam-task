import React from "react";
import { Box, MenuItem, Select, Typography, useMediaQuery, useTheme } from "@mui/material";
import JobCard from "./JobCard";
import JobTag from "./JobTag";
import SortingDropdown from "../ui/CustomSelect";
import Pagination from "./Pagination";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      <Box sx={{ display: isMobile ? "none" : "flex", alignItems: "center", justifyContent: "flex-end", mt: 4, mb: 3 }}>
        <SortingDropdown />
      </Box>
      <JobTag jobTitle="UI Designer" jobsCount={70} location="Egypt" />

      <Box>
        <JobCard
          focused
          title="Gaming UI Designer"
          company="Rockstar Games"
          location="El Mansoura, Egypt"
          posted="10 days ago"
          experience="0 - 3y of exp"
          jobType="Full time"
          workType="Remote"
          category="Gaming"
        />
        <JobCard
          title="Senior UX UI Designer"
          company="Egabi"
          location="Cairo, Egypt"
          posted="1 month ago"
          experience="0 - 3y of exp"
          jobType="Full time"
          workType="Hybrid"
          category="IT / Software development"
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Pagination />
      </Box>
    </Box>
  );
};

export default Dashboard;
