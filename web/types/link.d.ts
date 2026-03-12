type LinkVariant = VariantProps<typeof linkVariants>["variant"];

type ExternalLinkProps = ComponentPropsWithRef<typeof NextLink> & {
  children: React.ReactNode;
  href: string;
  variant?: LinkVariant;
  className?: string;
};
