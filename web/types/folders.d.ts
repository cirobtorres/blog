type SelectFolder = {
  id: string;
  padding: number;
  name: string;
  parentId: string | null | undefined;
  path: string;
};

type FolderPagination = {
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
