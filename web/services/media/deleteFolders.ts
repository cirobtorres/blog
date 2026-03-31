export default async function deleteFolders(
  folders: Folder[],
): Promise<ActionState> {
  console.log(folders);
  return {
    ok: true,
    success: "Pastas excluídas",
    error: null,
    data: null,
  };
}
