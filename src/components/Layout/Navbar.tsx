import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { ArrowDropDown, Search } from "@mui/icons-material";
import { Divider, OutlinedInput } from "@mui/material";
import NavbarLink from "./NavbarLink";
import HomeIcon from "@/icons/HomeIcon";
import JobIcon from "@/icons/JobIcon";
import EmployeesIcon from "@/icons/EmployeesIcon";
import NotificationIcon from "@/icons/NotificationIcon";
import MessagingIcon from "@/icons/MessagingIcon";

function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#161616",
        height: 98,
      }}
    >
      <Toolbar sx={{ height: 95, justifyContent: "space-between", margin: "0px 50px" }}>
        <Box display="flex">
          <Typography variant="h3">
            i<span style={{ color: "#48A74C" }}>Z</span>AM
          </Typography>
          <Box display="flex" alignItems="center" marginLeft="50px">
            <Search sx={{ backgroundColor: "green", zIndex: 100, height: "47px", width: "47px", borderRadius: "50%", padding: "10px" }} />
            <OutlinedInput
              size="small"
              sx={{ marginLeft: "-55px", background: "#fff", borderRadius: "47px", height: 61, width: "350px", paddingLeft: "55px", fontSize: "20px" }}
              placeholder="Search by name, job title, ..."
            />
          </Box>
        </Box>
        <Box display="flex" gap="40px">
          <NavbarLink icon={<HomeIcon />} label="Home" />
          <NavbarLink icon={<JobIcon />} label="Jobs" />
          <NavbarLink icon={<EmployeesIcon />} label="Employers" />
          <Box height="55px" width="2px" sx={{ background: `rgba(214, 214, 214, 0.60)` }} />
          <NavbarLink icon={<NotificationIcon />} label="Notifications" />
          <NavbarLink icon={<MessagingIcon />} label="Messaging" />
          <Box sx={{ flexGrow: 0, cursor: "pointer" }}>
            <Box onClick={handleOpenUserMenu} display="flex" flexDirection="column" alignItems="center">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, height: "38px", width: "38px" }}>
                <Avatar alt="Remy Sharp" src="/images/user.jpeg" />
              </IconButton>
              <Typography display="flex" alignItems="center">
                Profile <ArrowDropDown />{" "}
              </Typography>
            </Box>
            <Menu
              sx={{ mt: "60px", borderRadius: "8px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box>
                <Box display="flex" padding="15px 30px" gap="20px">
                  <Avatar alt="Remy Sharp" src="/images/user.jpeg" sx={{ height: "50px", width: "50px" }} />
                  <Box>
                    <Typography color="#555" fontWeight={700}>
                      Ahmed Hassan
                    </Typography>
                    <Typography fontWeight={300}>Frontend Developer</Typography>
                  </Box>
                </Box>
                <Divider />
                <Box padding="10px 30px">
                  <Typography color="#555">Settings and privacy</Typography>
                  <Typography color="#555">Language</Typography>
                  <Typography color="#555">Help</Typography>
                </Box>
                <Divider />
                <Box padding="15px 30px">
                  <Typography color="red">Logout</Typography>
                </Box>
              </Box>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
