import { LinkProtocolOptions } from "@tiptap/extension-link";

export const validateAllowedUri = (
  url: string,
  ctx: {
    defaultValidate: (url: string) => boolean;
    protocols: Array<LinkProtocolOptions | string>;
    defaultProtocol: string;
  },
) => {
  try {
    const parsedUrl = url.includes(":")
      ? new URL(url)
      : new URL(`${ctx.defaultProtocol}://${url}`);

    // Tiptap general validation
    if (!ctx.defaultValidate(parsedUrl.href)) {
      return false; // Invalid URL
    }

    const disallowedDomains = [""];
    const domain = parsedUrl.hostname;

    const disallowedProtocols = ["ftp", "file", "mailto"];
    const protocol = parsedUrl.protocol.replace(":", "");

    const allowedProtocols = ctx.protocols.map((p) =>
      typeof p === "string" ? p : p.scheme,
    );

    if (disallowedProtocols.includes(protocol)) {
      return false; // Not allowed
    }
    if (!allowedProtocols.includes(protocol)) {
      return false; // Not allowed
    }
    if (disallowedDomains.includes(domain)) {
      return false; // Not allowed
    }

    return true; // all checks have passed
  } catch {
    return false;
  }
};

export const validateAllowedAutoLink = (url: string) => {
  try {
    const parsedUrl = url.includes(":")
      ? new URL(url)
      : new URL(`https://${url}`);

    const disallowedDomains = [""];
    const domain = parsedUrl.hostname;

    return !disallowedDomains.includes(domain);
  } catch {
    return false;
  }
};

export const btnGroupStyle =
  "w-fit flex [&_button]:border [&_button]:first:rounded-l [&_button]:last:rounded-r [&_button]:focus-visible:z-10";

export const dashedBgStyle =
  "w-1 border-y dark:bg-[repeating-linear-gradient(315deg,#44403b_0,#44403b_1px,transparent_0,transparent_50%)] bg-size-[5px_5px]";

export const btnActive =
  "[&_svg]:stroke-primary bg-stone-400 dark:bg-stone-800 hover:bg-stone-450 dark:hover:bg-stone-750";

export const btnNotActive =
  "[&_svg]:stroke-neutral-400 dark:[&_svg]:stroke-neutral-500 bg-stone-200 dark:bg-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800";
