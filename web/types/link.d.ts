type LinkVariant = VariantProps<typeof linkVariants>["variant"];

type ExternalLinkProps = Omit<
  ComponentPropsWithRef<typeof NextLink>,
  "href"
> & {
  children: React.ReactNode;
  href: string;
  variant?: LinkVariant;
  className?: string;
};
