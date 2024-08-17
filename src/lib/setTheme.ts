"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const setTheme = (theme: string) => {
  cookies().set("theme", theme);
  revalidatePath("/", "layout");
};

export default setTheme;
