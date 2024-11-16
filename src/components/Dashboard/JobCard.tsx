import React from "react";
import { Box, Card, CardContent, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import Image from "next/image";
import LocationIcon from "@/icons/LocationIcon";
import CalendarIcon from "@/icons/CalendarIcon";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  posted: string;
  experience: string;
  jobType: string;
  workType: string;
  category: string;
  focused?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ title, company, location, posted, experience, jobType, workType, category, focused }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box style={{ border: focused ? "1px solid #48A74C" : "none" }} sx={{ mb: 2, borderRadius: "5px", background: focused ? "#F3FDF3" : "#fff" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: isMobile ? "5px 10px" : "10px 20px",
          }}
        >
          <Box>
            <Box display="flex" gap={2}>
              <Image src="/images/company-1.png" alt="company-logo" width={70} height={70} />
              <Box>
                <Typography fontSize={isMobile ? 14 : 25} fontWeight={500}>
                  {title}
                </Typography>
                <Typography fontSize={isMobile ? 11 : 17} fontWeight={700} color="#14A077">
                  {company}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="textSecondary" fontSize={isMobile ? 11 : 17} display="flex" marginTop={3} alignItems="center">
              <LocationIcon /> {location}{" "}
              <span style={{ marginLeft: 12, display: "flex", alignItems: "center" }}>
                <CalendarIcon /> {posted}
              </span>
            </Typography>
            <Typography variant="body2" fontSize={isMobile ? 11 : 17} marginTop={3}>
              <span className="job-type">{experience}</span> <span className="job-type">{jobType}</span> <span className="job-type">{workType}</span>
            </Typography>
            <Typography fontSize={isMobile ? 11 : 17} marginTop={5} variant="body2" color="textSecondary">
              {category}
            </Typography>
          </Box>
          <IconButton
            sx={{
              borderRadius: "50%",
              height: isMobile ? "27.5px" : "55px", // Half the size on mobile
              width: isMobile ? "27.5px" : "55px",
              borderColor: "#C4C3C3",
              borderWidth: "1px",
              background: "#fff",
            }}
          >
            <Favorite sx={{ color: "#C4C3C3", fontSize: isMobile ? "14px" : "inherit" }} />
          </IconButton>
        </Box>
      </CardContent>
    </Box>
  );
};

export default JobCard;
