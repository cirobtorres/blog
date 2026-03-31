export default async function moveFiles(files: Media[]): Promise<ActionState> {
  console.log(files);
  return {
    ok: true,
    success: "Pastas movidas",
    error: null,
    data: null,
  };
}
