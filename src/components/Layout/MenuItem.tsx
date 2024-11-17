import React, { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragIndicator, EditOutlined, ExpandLess, ExpandMore, RemoveRedEyeOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Box, Collapse, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, useMediaQuery, useTheme } from "@mui/material";
import { MenuItemProps } from "@/models/MenuItems";
import Link from "next/link";

export interface MenuItemType {
  id: string;
  title: string;
  children?: MenuItemType[];
  target?: string;
}

export interface DropdownState {
  [key: string]: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, index, moveItem, isEditMode, editedItems, setEditedItems, toggleDropdown, isOpen, parentId }) => {
  const [localTitle, setLocalTitle] = useState(item.title);
  const [inEditing, setInEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [, drag] = useDrag({
    type: "menu-item",
    item: { index, parentId },
  });

  const [, drop] = useDrop({
    accept: "menu-item",
    hover: (draggedItem: { index: number; parentId?: string }) => {
      if (draggedItem.parentId === parentId && draggedItem.index !== index) {
        moveItem(draggedItem.index, index, parentId);
        draggedItem.index = index;
      }
    },
  });

  const boxRef = useRef(null);
  drag(drop(boxRef));

  useEffect(() => {
    // Retrieve visibility state from localStorage
    const storedVisibility = localStorage.getItem(`menu-item-visibility-${item.id}`);
    if (storedVisibility !== null) {
      setIsVisible(storedVisibility === "true");
    }
  }, [item.id]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
  };

  const toggleEditMode = () => {
    setInEditing((prev) => !prev);
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => {
      const newVisibility = !prev;
      // Save visibility state to localStorage
      localStorage.setItem(`menu-item-visibility-${item.id}`, newVisibility.toString());
      return newVisibility;
    });
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
          width: isMobile ? "100%" : "280px",
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
        ) : item.children ? (
          <ListItemButton sx={{ height: "65px", width: "280px" }} onClick={() => toggleDropdown(item.title)}>
            <ListItemText primary={localTitle} />
            {item.children && (isOpen[item.title] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
        ) : (
          <Link href={item.target || "/"}>
            <ListItemButton sx={{ height: "65px", width: "280px" }}>
              <ListItemText primary={localTitle} />
              {item.children && (isOpen[item.title] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </Link>
        )}
      </ListItem>

      {/* Nested Items */}
      {item.children && (
        <div className="sidebar-collapse">
          <Collapse in={isOpen[item.title] || isEditMode} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child, childIndex) => (
                <MenuItem
                  key={child.id}
                  item={child}
                  index={childIndex}
                  moveItem={moveItem}
                  isEditMode={isEditMode}
                  toggleDropdown={toggleDropdown}
                  isOpen={isOpen}
                  parentId={item.id}
                  editedItems={editedItems}
                  setEditedItems={setEditedItems}
                />
              ))}
            </List>
          </Collapse>
        </div>
      )}
    </Box>
  );
};

export default MenuItem;
