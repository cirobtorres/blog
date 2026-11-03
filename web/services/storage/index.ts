import { cloudinaryUploader } from "./cloudinary/uploader";
import { cloudinaryOptimizedUrl } from "./cloudinary/urls";
import type { MediaUploader } from "./types";

export { MediaAlreadyExistsError } from "./types";
export { createMediaKey } from "./keys";
export type { MediaUploader, UploadOptions } from "./types";

type StorageProvider = {
  uploader: MediaUploader;
  optimizedUrl: (url: string, width: number) => string;
};

const providers: Record<string, StorageProvider> = {
  cloudinary: {
    uploader: cloudinaryUploader,
    optimizedUrl: cloudinaryOptimizedUrl,
  },
};

const providerName =
  process.env.NEXT_PUBLIC_MEDIA_STORAGE_PROVIDER ?? "cloudinary";
const provider = providers[providerName];

if (!provider) {
  throw new Error(`Unknown media storage provider: ${providerName}`);
}

export const mediaUploader: MediaUploader = provider.uploader;

/** Provider-specific resize/format hints; providers without URL transformations return the URL untouched. */
export function getOptimizedMediaUrl(url: string, width: number): string {
  return provider.optimizedUrl(url, width);
}
