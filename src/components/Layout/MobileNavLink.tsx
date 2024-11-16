import React from "react";
import { Box, Typography } from "@mui/material";

interface NavbarLinkProps {
  icon: React.ReactNode;
  label: string;
}

function MobileNavLink({ icon, label }: NavbarLinkProps) {
  return (
    <Box gap={1} width="80px" display="flex" flexDirection="row" alignItems="center" sx={{ cursor: "pointer" }}>
      {icon}
      <Typography fontSize={14} color="#5B5B5B">
        {label}
      </Typography>
    </Box>
  );
}

export default MobileNavLink;
