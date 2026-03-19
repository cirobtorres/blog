import {
  AddFilesButton,
  AddFolderButton,
} from "../../../../components/Authors/Media/AddMediaAssetsButtons";

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col gap-2 p-2">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-3xl font-extrabold my-6">Biblioteca de Media</h1>
        <div className="flex-1 flex justify-end items-center gap-2">
          <AddFolderButton />
          <AddFilesButton />
        </div>
      </div>
      {children}
    </div>
  );
}
