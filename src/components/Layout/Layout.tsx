import { useMediaQuery, useTheme } from "@mui/material";
import React, { PropsWithChildren } from "react";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import { MenuItemType } from "./DrawerContent";

export interface LayoutProps {
  navData: MenuItemType[];
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children, navData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return isMobile ? <MobileLayout navData={navData}>{children}</MobileLayout> : <DesktopLayout navData={navData}>{children}</DesktopLayout>;
};

export default Layout;
