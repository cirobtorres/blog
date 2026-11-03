// Storage keys are immutable and independent from the file name (the name lives on the database).
// Same convention the Spring side lists by (MEDIA_KEY_PREFIX in MediaService).
export const MEDIA_KEY_PREFIX = "media/";

export const MEDIA_KEY_REGEX =
  /^media\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function createMediaKey(): string {
  return `${MEDIA_KEY_PREFIX}${crypto.randomUUID()}`;
}
