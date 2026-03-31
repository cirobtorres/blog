export default async function deleteFiles(
  files: Media[],
): Promise<ActionState> {
  console.log(files);
  return {
    ok: true,
    success: "Arquivos excluídos",
    error: null,
    data: null,
  };
}
