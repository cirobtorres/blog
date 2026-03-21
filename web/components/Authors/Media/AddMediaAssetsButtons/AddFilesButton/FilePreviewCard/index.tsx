import Image from "next/image";
import React from "react";

const generateVideoThumbnail = (file: File): Promise<string> => {
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
};

const FilePreviewCard = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isAudio = file.type.startsWith("audio/");

  React.useEffect(() => {
    let url = "";
    if (isImage) {
      url = URL.createObjectURL(file);
      setPreview(url);
    } else if (isVideo) {
      generateVideoThumbnail(file).then(setPreview);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [file, isImage, isVideo]);

  return (
    <div className="relative group flex items-center gap-3 p-3 rounded-lg border bg-white dark:bg-stone-900 shadow-sm transition-all hover:shadow-md">
      <div className="size-30 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0 flex items-center justify-center">
        {(isImage || isVideo) && preview ? (
          <div className="relative size-full">
            <Image
              src={preview}
              alt={file.name}
              fill
              className="absolute object-cover"
            />
          </div>
        ) : isVideo ? (
          <div className="animate-pulse bg-stone-300 w-full h-full" />
        ) : isAudio ? (
          <svg
            className="text-emerald-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        ) : (
          <svg
            className="text-stone-400"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate dark:text-stone-200">
          {file.name}
        </p>
        <p className="text-xs text-neutral-500">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
      <button
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-opacity"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export { FilePreviewCard };
