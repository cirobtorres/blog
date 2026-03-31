type SelectFolder = {
  id: string;
  parentId: string | null | undefined;
  name: string;
  path: string;
};

type Pagination = {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
};

type Folder = {
  id: string;
  path: string;
  name: string;
  subfolderCount: number;
  fileCount: number;
  createdAt: Date;
};

type SelectionContextType = {
  selectedItems: Folder[];
  toggleItem: (item: Folder) => void;
  selectAll: (items: Folder[]) => void;
  clearSelection: () => void;
};
