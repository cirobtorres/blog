export function cloudinaryOptimizedUrl(url: string, width: number): string {
  if (!url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/c_fill,w_${width},q_auto,f_auto/`);
}
