import { Menu, Message, NotificationAddOutlined, People } from "@mui/icons-material";
import { AppBar, Avatar, Box, IconButton, Typography, Drawer, Divider } from "@mui/material";
import React, { useState } from "react";
import MobileNavLink from "./MobileNavLink";
import SmallHomeIcon from "@/icons/SmallHomeIcon";
import SmallJobIcon from "@/icons/SmallJobIcon";

function MobileNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <AppBar
        sx={{
          //   zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#161616",
          height: 98,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 40px",
          position: "absolute",
        }}
      >
        <Box onClick={toggleDrawer} display="flex">
          {/* Avatar Box - clicking will trigger the Drawer */}
          <IconButton>
            <Avatar alt="Remy Sharp" src="/images/user.jpeg" sx={{ height: "42px", width: "42px" }} />
          </IconButton>
          <Menu sx={{ marginTop: "25px", marginLeft: "-20px", zIndex: 2, backgroundColor: "#eee", borderRadius: "50%", padding: "3px", color: "#555" }} />
        </Box>
        <Typography fontSize={24} variant="h3">
          i<span style={{ color: "#48A74C" }}>Z</span>AM
        </Typography>
      </AppBar>

      {/* Full-screen Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: "100%", // Full screen width
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "80%", // Full screen width
            height: "100%", // Full screen height
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#f4f4f4", // Customize the background
          },
        }}
      >
        {/* Content for Drawer */}
        <Box sx={{ p: 2 }}>
          <Box>
            <Box display="flex" padding="15px 15px" gap="20px">
              <Avatar alt="Remy Sharp" src="/images/user.jpeg" sx={{ height: "50px", width: "50px" }} />
              <Box>
                <Typography color="#555" fontWeight={700}>
                  Ahmed Hassan
                </Typography>
                <Typography fontWeight={300}>Frontend Developer</Typography>
              </Box>
            </Box>
            <Divider sx={{ margin: "20px 0px" }} />
            <Box padding="10px 15px" display="flex" flexDirection="column" gap={3}>
              <MobileNavLink icon={<SmallHomeIcon />} label="Home" />
              <MobileNavLink icon={<SmallJobIcon />} label="Jobs" />
              <MobileNavLink icon={<People sx={{ fontSize: "19px" }} />} label="Employers" />
              <MobileNavLink icon={<NotificationAddOutlined sx={{ fontSize: "19px" }} />} label="Notifications" />
              <MobileNavLink icon={<Message sx={{ fontSize: "19px" }} />} label="Messaging" />
            </Box>
            <Divider sx={{ margin: "15px 0px" }} />
            <Box padding="10px 15px">
              <Typography color="#555">Settings and privacy</Typography>
              <Typography color="#555">Language</Typography>
              <Typography color="#555">Help</Typography>
            </Box>
            <Divider />
            <Box padding="15px 15px">
              <Typography color="red">Logout</Typography>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}

export default MobileNavbar;
