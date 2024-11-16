import { Box, Drawer} from "@mui/material";
import React, { useState } from "react";
import DrawerContent from "./DrawerContent";
import LargeMenuIcon from "@/icons/LargeMenuIcon";
import { LayoutProps } from "./Layout";

function MobileSidebar({navData} : LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <Box sx={{ marginTop: "120px", marginRight: '20px' }} display="flex" alignItems="center" justifyContent="flex-end">
        <Box
          onClick={() => toggleDrawer()}
          sx={{ height: "57px", width: "57px", border: "1px solid #ddd", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <LargeMenuIcon />
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: "100%",
          height: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "100%",
            height: "100%",
            backgroundColor: "#f4f4f4",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10000,
          },
        }}
      >
        {/* Drawer Content */}
        <Box sx={{ width: "100%", height: "100%", p: 2 }}>
          <DrawerContent serverMenuItems={navData} closeDrawer={toggleDrawer} isMobile />
        </Box>
      </Drawer>
    </div>
  );
}

export default MobileSidebar;
