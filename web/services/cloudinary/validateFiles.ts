import * as z from "zod";

const mediaExtensionRegex =
  /\.(jpg|jpeg|png|webp|avif|gif|mp4|mov|wmv|mp3|wav)$/i;

const singleFileSchema = z.object({
  customAlt: z.string().min(1, "Alt text é obrigatório"),
  customCaption: z.string().default(""),
  customName: z
    .string()
    .min(1, "Nome é obrigatório")
    .transform((val) => val.trim().replace(mediaExtensionRegex, "")),
  customFolder: z
    .string()
    .min(1, "Pasta é obrigatória")
    .transform((val) => (val === "/" ? "" : val)),
});

export default function validateFiles(
  formData: FormData,
  fileCount: number,
): ActionState {
  const returnState = {
    ok: false,
    success: null,
    error: null,
    data: null,
  };
  const filesData = [];

  for (let i = 0; i < fileCount; i++) {
    filesData.push({
      customAlt: formData.get(`file_${i}_alt`),
      customCaption: formData.get(`file_${i}_caption`),
      customName: formData.get(`file_${i}_name`),
      customFolder: formData.get(`file_${i}_folder`),
    });
  }

  const result = z.array(singleFileSchema).safeParse(filesData);

  if (!result.success) {
    const error = z.treeifyError(result.error).items;
    return {
      ...returnState,
      error,
    };
  }

  return {
    ...returnState,
    ok: true,
    success: "Validado com sucesso",
    data: result.data,
  };
}
