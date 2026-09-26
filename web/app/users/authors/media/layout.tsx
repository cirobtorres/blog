import AddFilesButton from "../../../../components/Users/Authors/Media/Files/Add/AddFilesButton";
import FolderBreadcrumbURL from "../../../../components/Users/Authors/Media/FolderBreadcrumbURL";
import AddFolderButton from "../../../../components/Users/Authors/Media/Folders/Add";
import { ArticleStoreProvider } from "../../../../providers/ArticleStoreProvider";
import { FileProvider } from "../../../../providers/FileProvider";

export default async function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ArticleStoreProvider>
      <FileProvider>
        <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col gap-2 px-2 my-6">
          <div className="flex md:flex-row flex-col justify-between md:items-center gap-2 mb-6">
            <h1 className="text-3xl font-extrabold">Biblioteca de Mídia</h1>
            <div className="flex-1 flex flex-row max-[500px]:flex-col md:justify-end max-[500px]:items-start items-center gap-2">
              <AddFolderButton />
              <AddFilesButton />
            </div>
          </div>
          <FolderBreadcrumbURL />
          {children}
        </div>
      </FileProvider>
    </ArticleStoreProvider>
  );
}
