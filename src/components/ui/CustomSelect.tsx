import React, { useState } from "react";
import { Menu, MenuItem, Button, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SortingDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>("Top match");

  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option?: string) => {
    if (option) setSelectedOption(option);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{
          color: "green",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "16px",
          width: "fit-content", 
        }}
        endIcon={<ArrowDropDownIcon />}
      >
        <Typography color="#000">
          Sorting by :
        </Typography>
        <Typography
          variant="body1"
          component="span"
          sx={{
            marginLeft: "4px",
            color: "green",
          }}
        >
          {selectedOption}
        </Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => handleClose()}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: "10px",
            overflow: "hidden",
            width: anchorEl?.offsetWidth, // Matches the button width
            "& .MuiMenuItem-root": {
              fontSize: "14px",
              padding: "10px 20px",
            },
          },
        }}
      >
        {["Top match", "Newest", "Latest"].map((option) => (
          <MenuItem
            key={option}
            selected={option === selectedOption}
            onClick={() => handleClose(option)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SortingDropdown;
