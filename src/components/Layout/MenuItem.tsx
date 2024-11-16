import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragIndicator, EditOutlined, ExpandLess, ExpandMore, RemoveRedEyeOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Box, Collapse, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, useMediaQuery, useTheme } from "@mui/material";

type MenuItemProps = {
  id: string;
  title: string;
  target?: string;
  children?: MenuItemProps[];
  visible?: boolean;
};

function MenuItem({ item, index, moveItem, isEditMode, toggleDropdown, isOpen, parentId }: any) {
  const [localTitle, setLocalTitle] = useState(item.title);
  const [inEditing, setInEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [, drag] = useDrag({
    type: "menu-item",
    item: { index, parentId }, // Include parentId to ensure it stays within the same parent
  });

  const [, drop] = useDrop({
    accept: "menu-item",
    hover: (draggedItem: any) => {
      // Check if both items have the same parentId to restrict drag-and-drop within siblings
      if (draggedItem.parentId === parentId && draggedItem.index !== index) {
        moveItem(draggedItem.index, index, parentId);
        draggedItem.index = index;
      }
    },
  });

  const boxRef = useRef(null);
  drag(drop(boxRef));

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
  };

  const toggleEditMode = () => {
    setInEditing((prev) => !prev);
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  if (!isEditMode && !isVisible) return null;

  return (
    <Box ref={boxRef}>
      <ListItem
        sx={{
          margin: "10px",
          backgroundColor: "#F7F7F7",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          height: "65px",
          width: isMobile? "100%" : "280px",
        }}
      >
        {isEditMode && (
          <IconButton>
            <DragIndicator />
          </IconButton>
        )}

        {isEditMode ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {inEditing ? (
              <TextField value={localTitle} onChange={handleEditChange} size="small" sx={{ flex: 1 }} />
            ) : (
              <ListItemText sx={{ color: !isVisible ? "#ccc" : "#000" }} primary={localTitle} />
            )}
            <Box sx={{ display: "flex", gap: "5px" }}>
              <EditOutlined onClick={toggleEditMode} sx={{ color: "#848484", cursor: "pointer" }} />
              {isVisible ? (
                <RemoveRedEyeOutlined onClick={toggleVisibility} sx={{ color: "#848484", cursor: "pointer" }} />
              ) : (
                <VisibilityOffOutlined onClick={toggleVisibility} sx={{ color: "#848484", cursor: "pointer" }} />
              )}
            </Box>
          </Box>
        ) : (
          <ListItemButton sx={{ height: "65px", width: "280px" }} onClick={() => item.children && toggleDropdown(item.title)}>
            <ListItemText primary={localTitle} />
            {item.children && (isOpen[item.title] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        )}
      </ListItem>

      {/* Nested Items */}
      {item.children && (
        <div className="sidebar-collapse">
          <Collapse in={isOpen[item.title]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child: any, childIndex: number) => (
                <MenuItem
                  key={child.id}
                  item={child}
                  index={childIndex}
                  moveItem={moveItem}
                  isEditMode={isEditMode}
                  toggleDropdown={toggleDropdown}
                  isOpen={isOpen}
                  parentId={item.id}
                />
              ))}
            </List>
          </Collapse>
        </div>
      )}
    </Box>
  );
}

export default MenuItem;
