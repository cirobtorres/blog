type Cloudinary = {
  api_key: string;
  asset_id: string;
  public_id: string;
  version_id: string;
  url: string;
  secure_url: string;
  etag: string;
  folder: string;
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

type CloudinaryServer = {
  id: string;
  name: string;
  folder: string;
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

type MediaResponsePageable = {
  content: CloudinaryServer[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number; // Current page
  size: number; // Size of the pages
  numberOfElements: number; // Total elements on that page
  totalElements: number; // Total elements on the db (for that query)
  totalPages: number; // Number of pages
  sort: MediaSort; // Sort rules requested by the client
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
    sort: MediaSort; // Sort rules returned from the server
  };
};

type MediaSort = { empty: boolean; sorted: boolean; unsorted: boolean };
