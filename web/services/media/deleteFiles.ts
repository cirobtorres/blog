export default async function deleteFiles(
  files: Media[],
): Promise<ActionState> {
  return {
    ok: true,
    success: "Arquivos excluídos",
    error: null,
    data: null,
  };
}
