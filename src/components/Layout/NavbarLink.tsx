import React from "react";
import { Box, Typography } from "@mui/material";

interface NavbarLinkProps {
  icon: React.ReactNode;    
  label: string;
}

function NavbarLink({ icon, label }: NavbarLinkProps) {
  return (
    <Box width="80px" display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ cursor: "pointer" }}>
      {icon}
      <Typography>{label}</Typography>
    </Box>
  );
}

export default NavbarLink;
