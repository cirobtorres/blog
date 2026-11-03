// Provider-neutral description of a stored file.
// Mirrors the Spring `StoredObjectDTO` record (storage package); the front-end never sees provider payloads.
type MediaType = "IMAGE" | "VIDEO" | "AUDIO" | "RAW";

type StoredObject = {
  key: string;
  url: string;
  size: number | null;
  extension: string | null;
  type: MediaType | null;
  width: number | null;
  height: number | null;
  duration: number | null;
};

// What an uploader returns: the fields that are always known right after an upload
type UploadedObject = StoredObject & {
  size: number;
  extension: string;
  type: MediaType;
};

// An uploaded object plus the metadata the author typed in the form
type UploadedMedia = {
  object: UploadedObject;
  name: string;
  alt: string;
  caption: string;
  folderId: string | null;
};

// Comes from server
type Media = {
  id: string;
  name: string;
  folder: { id: string; path: string };
  publicId: string;
  url: string;
  extension: string;
  type: MediaType;
  size: number;
  width: number;
  height: number;
  duration: number | null;
  caption: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
};

// Comes from server (pagination)
type PageableMedia = {
  content: Media[];
  page: Pagination;
};

type FileContextType = {
  selectedItems: Media[];
  toggleItem: (item: Media) => void;
  selectAll: (items: Media[]) => void;
  clearSelection: () => void;
};
