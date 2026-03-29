type SelectFolder = {
  id: string;
  parentId: string | null | undefined;
  name: string;
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
