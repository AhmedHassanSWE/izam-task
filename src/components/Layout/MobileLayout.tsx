import React, { PropsWithChildren } from "react";
import MobileNavbar from "./MobileNavbar";
import MobileSidebar from "./MobileSidebar";
import { Box } from "@mui/material";
import { LayoutProps } from "./Layout";

const MobileLayout: React.FC<PropsWithChildren<LayoutProps>> = ({ children, navData }) => {
  return (
    <>
      <MobileNavbar />
      <MobileSidebar navData={navData} />
      <Box padding="0px 20px">{children}</Box>
    </>
  );
};

export default MobileLayout;
