"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const saveThemeToCookies = (theme: string) => {
  cookies().set("theme", theme);
  revalidatePath("/", "layout");
};

export default saveThemeToCookies;
