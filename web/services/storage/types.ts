export type UploadOptions = {
  /** Storage key of the new object (Cloudinary: public_id). */
  key: string;
};

/**
 * Client-side direct upload (bypasses the Server Action body limit).
 * Each provider implements this; nothing outside services/storage/<provider> may import a provider SDK or payload.
 */
export interface MediaUploader {
  upload(file: File, options: UploadOptions): Promise<UploadedObject>;
}

export class MediaAlreadyExistsError extends Error {
  constructor(public readonly key: string) {
    super(`Já existe um arquivo com o nome "${key}"`);
    this.name = "MediaAlreadyExistsError";
  }
}
