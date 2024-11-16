import React, { useState } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, IconButton, List, Typography } from "@mui/material";
import { ArrowBack, Check, Close, Settings } from "@mui/icons-material";
import MenuItem from "./MenuItem";

type DropdownState = Record<string, boolean>;

export type MenuItemType = {
  id: string;
  title: string;
  target?: string;
  children?: MenuItemType[];
  visible?: boolean;
};

interface DrawerContentProps {
  isMobile?: boolean;
  closeDrawer?: () => void;
  serverMenuItems: MenuItemType[];
}

const DrawerContent: React.FC<DrawerContentProps> = ({ isMobile, closeDrawer, serverMenuItems }) => {
  const [open, setOpen] = useState<DropdownState>({});
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(serverMenuItems);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedItems, setEditedItems] = useState<MenuItemType[]>([]);

  React.useEffect(() => {
    setMenuItems(serverMenuItems);
  }, [serverMenuItems]);

  React.useEffect(() => {
    setEditedItems(serverMenuItems);
  }, [serverMenuItems]);

  const toggleDropdown = (key: string): void => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const moveItem = async (fromIndex: number, toIndex: number, parentId: string | null = null): Promise<void> => {
    const updatedItems = [...menuItems];

    if (parentId === null) {
      const [movedItem] = updatedItems.splice(fromIndex, 1);
      updatedItems.splice(toIndex, 0, movedItem);
    } else {
      const parentIndex = updatedItems.findIndex((item) => item.id === parentId);
      const parent = updatedItems[parentIndex];
      const [movedItem] = parent.children!.splice(fromIndex, 1);
      parent.children!.splice(toIndex, 0, movedItem);
    }

    setMenuItems(updatedItems);
    setEditedItems(updatedItems);
  };

  const handleEditSubmit = async (): Promise<void> => {
    try {
      await axios.post("http://localhost:8081/nav", editedItems);
      setMenuItems(editedItems);
      setIsEditMode(false);
    } catch (error) {
      console.error("Failed to save navigation tree:", error);
    }
  };

  const handleEditCancel = (): void => {
    setEditedItems(menuItems);
    setIsEditMode(false);
  };

  const containerStyle = { marginTop: isMobile ? "0px" : "100px" };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ ...styles.container, ...containerStyle }}>
        {/* Header */}
        <Box sx={styles.header}>
          <Box sx={styles.headerLeft}>
            {isMobile && <ArrowBack onClick={closeDrawer} />}
            <Typography>Menu</Typography>
          </Box>
          <Box sx={styles.headerRight}>
            {isEditMode ? (
              <>
                <IconButton sx={styles.cancelButton} onClick={handleEditCancel}>
                  <Close />
                </IconButton>
                <IconButton sx={styles.saveButton} onClick={handleEditSubmit}>
                  <Check />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={() => setIsEditMode((prev) => !prev)}>
                <Settings />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Menu List */}
        <List>
          {menuItems?.map((item, index) => (
            <MenuItem
              key={item.id}
              item={item}
              index={index}
              moveItem={moveItem}
              isEditMode={isEditMode}
              editedItems={editedItems}
              setEditedItems={setEditedItems}
              toggleDropdown={toggleDropdown}
              isOpen={open}
            />
          ))}
        </List>
      </Box>
    </DndProvider>
  );
};

export default DrawerContent;

// Styling
const styles = {
  container: {},
  header: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    marginTop: "15px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  },
  headerRight: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelButton: {
    color: "#ED1F03",
    borderWidth: "3px",
    borderColor: "#ED1F03",
    borderStyle: "solid",
    height: "40px",
    width: "40px",
  },
  saveButton: {
    color: "#3D8E41",
    borderWidth: "3px",
    borderColor: "#3D8E41",
    borderStyle: "solid",
    height: "40px",
    width: "40px",
  },
};
