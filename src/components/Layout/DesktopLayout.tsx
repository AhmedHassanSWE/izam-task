import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./Navbar";
import { Drawer } from "@mui/material";
import DrawerContent from "./DrawerContent";
import { LayoutProps } from "./Layout";

const drawerWidth = 300;

const DesktopLayout: React.FC<React.PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          <DrawerContent serverMenuItems={props.navData} />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default DesktopLayout;
