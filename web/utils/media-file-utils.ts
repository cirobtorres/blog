export function VideoThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(file);
    video.muted = true;
    video.playsInline = true;

    video.onloadeddata = () => {
      video.currentTime = 1; // Frame of second === 1
    };

    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageUrl = canvas.toDataURL("image/jpeg");
      URL.revokeObjectURL(video.src);
      resolve(imageUrl);
    };
  });
}

export async function fetchFileFromUrl(url: string): Promise<File> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Falha ao baixar a imagem da URL");

  const blob = await response.blob();
  const fileName = url.split("/").pop()?.split("?")[0] || "downloaded-file";
  const contentType = blob.type || "image/jpeg";

  return new File([blob], fileName, { type: contentType });
}
