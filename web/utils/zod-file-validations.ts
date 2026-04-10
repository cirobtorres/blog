import * as z from "zod";

const mediaExtensionRegex =
  /\.(jpg|jpeg|png|webp|avif|gif|mp4|mov|wmv|mp3|wav)$/i;

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const singleFileSchema = z
  .object({
    customName: z
      .string()
      .min(1, "Nome é obrigatório")
      .transform((val) => val.trim().replace(mediaExtensionRegex, "")),
    customCaption: z.string().default(""),
    customAlt: z.string().min(1, "Alt text é obrigatório"),
    customFolderId: z.uuid("Pasta inválida").min(1, "Pasta é obrigatória"),
    fileSize: z.coerce.number(),
  })
  .superRefine((data, ctx) => {
    if (data.fileSize > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: "custom",
        message: "O arquivo excede o limite de 10MB",
        path: ["form"],
      });
    }

    if (data.fileSize <= 0) {
      ctx.addIssue({
        code: "custom",
        message: "Arquivo inválido ou vazio",
        path: ["form"],
      });
    }
  });

const returnState = {
  ok: false,
  success: null,
  error: null,
  data: null,
};

export const validateFile = (formData: FormData) => {
  const entries = Object.fromEntries(formData.entries());
  const {
    file_0_id: fileId,
    file_0_name: customName,
    file_0_caption: customCaption,
    file_0_alt: customAlt,
    file_0_folder_id: customFolderId,
    file_0_size: fileSize,
  } = entries;

  const result = singleFileSchema.safeParse({
    fileId,
    customName,
    customCaption,
    customAlt,
    customFolderId,
    fileSize,
  });

  if (!result.success) {
    const error = z.treeifyError(result.error).properties;

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
};

export default function validateFiles(
  formData: FormData,
  fileCount: number,
): ActionState {
  const error: Record<
    string,
    z.core.$ZodIssue[] // Any
  > = {};
  const validData = [];

  for (let i = 0; i < fileCount; i++) {
    const fileId = formData.get(`file_${i}_id`) as string;
    const data = {
      customName: formData.get(`file_${i}_name`),
      customCaption: formData.get(`file_${i}_caption`),
      customAlt: formData.get(`file_${i}_alt`),
      customFolderId: formData.get(`file_${i}_folder_id`),
      fileSize: formData.get(`file_${i}_size`),
    };

    const result = singleFileSchema.safeParse(data);

    if (!result.success) {
      error[fileId] = result.error.issues;
    } else {
      validData.push({ ...result.data, fileId });
    }
  }

  if (Object.keys(error).length > 0) {
    return {
      ...returnState,
      error,
    };
  }

  return {
    ...returnState,
    ok: true,
    success: "Validado com sucesso",
    data: validData,
  };
}
