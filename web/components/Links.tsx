import NextLink from "next/link";
import { cn, focusRing, linkVariants } from "../utils/variants";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./HoverCard";
import { apiClientUrls } from "../routing/routes";

export function Link({
  children,
  href,
  variant = "internal",
  className,
  ...props
}: ExternalLinkProps) {
  const isHrefExternal = href.startsWith("https");

  if (isHrefExternal)
    return (
      <HoverCard>
        <HoverCardTrigger asChild className="inline-flex">
          <NextLink
            {...props}
            href={href}
            data-variant="external"
            target="_blank"
            className={cn(linkVariants({ variant }), className)}
          >
            {children}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </NextLink>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {href}
          </p>
        </HoverCardContent>
      </HoverCard>
    );

  return (
    <NextLink
      {...props}
      href={href}
      data-variant={variant}
      className={cn(linkVariants({ variant }), className)}
    >
      {children}
    </NextLink>
  );
}

Link.displayName = "Link";

export function LoginProviders() {
  return (
    <>
      <GoogleLink />
      <GitHubLink />
    </>
  );
}

export function GitHubLink({
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & {
  className?: string;
}) {
  return (
    <a
      {...props}
      href={apiClientUrls.github}
      target="_self"
      className={cn(
        "w-full h-10.5 flex justify-center items-center gap-2 rounded border cursor-pointer text-base shadow font-medium transition-shadow duration-300 bg-stone-200 dark:bg-stone-800",
        focusRing,
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={18}
        height={18}
        viewBox="0 0 20 20"
        version="1.1"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            transform="translate(-140.000000, -7559.000000)"
            className="fill-black dark:fill-white"
          >
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" />
            </g>
          </g>
        </g>
      </svg>
      GitHub
    </a>
  );
}

export function GoogleLink({
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & {
  className?: string;
}) {
  return (
    <a
      {...props}
      href={apiClientUrls.google}
      target="_self"
      className={cn(
        "w-full h-10.5 flex justify-center items-center gap-2 rounded border cursor-pointer text-base shadow font-medium transition-shadow duration-300 bg-stone-200 dark:bg-stone-800",
        focusRing,
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="-3 0 262 262"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
          fill="#4285F4"
        />
        <path
          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
          fill="#34A853"
        />
        <path
          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
          fill="#FBBC05"
        />
        <path
          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
          fill="#EB4335"
        />
      </svg>
      Google
    </a>
  );
}

export function MicrosoftLink({
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & {
  className?: string;
}) {
  return (
    <a
      {...props}
      href={apiClientUrls.microsoft}
      target="_self"
      className={cn(
        "w-full h-10.5 flex justify-center items-center gap-2 rounded border cursor-pointer text-base shadow font-medium transition-shadow duration-300 bg-stone-200 dark:bg-stone-800",
        focusRing,
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
        fill="none"
      >
        <path fill="#F35325" d="M1 1h6.5v6.5H1V1z" />
        <path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z" />
        <path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z" />
        <path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z" />
      </svg>
      Microsoft
    </a>
  );
}

export function LinkedInLink({
  className,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & {
  className?: string;
}) {
  return (
    <a
      {...props}
      href={apiClientUrls.linkedin}
      target="_self"
      className={cn(
        "w-full h-10.5 flex justify-center items-center gap-2 rounded border cursor-pointer text-base shadow font-medium transition-shadow duration-300 bg-stone-200 dark:bg-stone-800",
        focusRing,
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 48 48"
        fill="none"
      >
        <circle cx="24" cy="24" r="20" fill="#0077B5" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.7747 14.2839C18.7747 15.529 17.8267 16.5366 16.3442 16.5366C14.9194 16.5366 13.9713 15.529 14.0007 14.2839C13.9713 12.9783 14.9193 12 16.3726 12C17.8267 12 18.7463 12.9783 18.7747 14.2839ZM14.1199 32.8191V18.3162H18.6271V32.8181H14.1199V32.8191Z"
          fill="white"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.2393 22.9446C22.2393 21.1357 22.1797 19.5935 22.1201 18.3182H26.0351L26.2432 20.305H26.3322C26.9254 19.3854 28.4079 17.9927 30.8101 17.9927C33.7752 17.9927 35.9995 19.9502 35.9995 24.219V32.821H31.4922V24.7838C31.4922 22.9144 30.8404 21.6399 29.2093 21.6399C27.9633 21.6399 27.2224 22.4999 26.9263 23.3297C26.8071 23.6268 26.7484 24.0412 26.7484 24.4574V32.821H22.2411V22.9446H22.2393Z"
          fill="white"
        />
      </svg>
      LinkedIn
    </a>
  );
}
