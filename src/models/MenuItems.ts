import { MenuItemType } from "@/components/Layout/DrawerContent";
import { DropdownState } from "@/components/Layout/MenuItem";

export interface MenuItemProps {
  item: MenuItemType;
  index: number;
  moveItem: (fromIndex: number, toIndex: number, parentId?: string | null) => Promise<void>;
  isEditMode: boolean;
  editedItems: MenuItemType[];
  setEditedItems: React.Dispatch<React.SetStateAction<MenuItemType[]>>;
  toggleDropdown: (key: string) => void;
  isOpen: DropdownState;
  parentId?: string;
}
