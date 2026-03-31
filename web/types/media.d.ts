// Comes from Cloudinary
type Cloudinary = {
  api_key: string;
  asset_id: string;
  public_id: string;
  version_id: string;
  url: string;
  secure_url: string;
  etag: string;
  folder: { path: string };
  format: string;
  bytes: number;
  width: number;
  height: number;
  original_filename: string;
  placeholder: false;
  resource_type: string;
  signature: string;
  tags: [];
  type: string;
  version: number;
  duration: number | null;
  created_at: string;
};

type CloudinarySave = Cloudinary & {
  custom_alt: string;
  custom_caption: string;
  custom_folder: string;
  custom_name: string;
};

// Comes from server
type Media = {
  id: string;
  name: string;
  folder: { path: string };
  publicId: string;
  url: string;
  extension: string;
  type: "IMAGE" | "VIDEO" | "AUDIO" | "RAW";
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
type MediaResponsePageable = {
  content: Media[];
  page: Pagination;
};

type FileContextType = {
  selectedItems: Media[];
  toggleItem: (item: Media) => void;
  selectAll: (items: Media[]) => void;
  clearSelection: () => void;
};
