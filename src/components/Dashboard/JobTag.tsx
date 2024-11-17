import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import CustomizedSwitches from "../ui/IOSSwitch";
import { JobTagProps } from "@/models/JobTag";

const JobTag: React.FC<JobTagProps> = ({ jobTitle, location, jobsCount }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const containerStyles = {
    background: "#3D8E41",
    borderRadius: "5px",
    marginBottom: "30px",
    marginTop: isMobile ? "-57px" : "0px",
    padding: isMobile ? "5px 20px" : "20px 40px",
    width: isMobile ? "calc(100% - 75px)" : "100%",
  };

  const jobTitleTypography = (
    <Typography fontSize={isMobile ? 14 : 23} fontWeight={700} color="#fff">
      {jobTitle} in {location}
    </Typography>
  );

  return (
    <Box sx={containerStyles}>
      {isMobile && jobTitleTypography}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {!isMobile && jobTitleTypography}
          <Typography fontSize={isMobile ? 11 : 17} color="#fff">
            {jobsCount} job positions
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography fontSize={isMobile ? 11 : 16} color="#fff" marginRight={1}>
            Job Alert
          </Typography>
          <Box sx={{ zoom: isMobile ? "70%" : "100%" }}>
            <CustomizedSwitches />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobTag;
