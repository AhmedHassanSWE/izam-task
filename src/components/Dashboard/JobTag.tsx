import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import CustomizedSwitches from "../ui/IOSSwitch";

interface JobTagProps {
  jobTitle: string;
  location: string;
  jobsCount: number;
}

function JobTag({ jobTitle, location, jobsCount }: JobTagProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      padding={isMobile ? "5px 20px" : "20px 40px"}
      sx={{
        background: "#3D8E41",
        borderRadius: "5px",
        marginBottom: "30px",
        width: isMobile ? "calc(100% - 75px)" : "100%",
        marginTop: isMobile ? "-57px" : "0px",
      }}
    >
      {isMobile && (
        <Typography fontSize={isMobile ? 14 : 23} fontWeight={700} color="#fff">
          {jobTitle} in {location}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {!isMobile && (
            <Typography fontSize={isMobile ? 14 : 23} fontWeight={700} color="#fff">
              {jobTitle} in {location}
            </Typography>
          )}
          <Typography fontSize={isMobile ? 11 : 17} color="#fff">
            {jobsCount} job positions
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" >
          <Typography fontSize={isMobile ? 11 : 16} color="#fff" marginRight={1}>
            Job Alert
          </Typography>
          <Box sx={{zoom: isMobile? "70%" : "100%"}}>
            <CustomizedSwitches />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default JobTag;
