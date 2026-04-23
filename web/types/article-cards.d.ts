interface ArticleCardLink extends Omit<
  React.ReactElement.ComponentProps<typeof Link>,
  "href"
> {
  href: string;
  className?: string;
  children: React.ReactNode;
}

type BaseProps = Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  id: string;
  src: string;
  alt: string;
  className?: string;
};

type ArticleCardImage =
  | (BaseProps & { fill: true; width?: never; height?: never })
  | (BaseProps & { fill?: false | undefined; width: number; height: number });

interface ArticleCardDate extends React.ComponentProps<"time"> {
  className?: string;
}

interface ArticleCardTitle extends React.ComponentProps<"h2"> {
  className?: string;
}

interface ArticleCardSubtitle extends React.ComponentProps<"p"> {
  className?: string;
}

interface ArticleCard {
  id: string;
  className?: string;
  children: React.ReactNode;
}

interface ArticleCardsProps {
  className?: string;
  children:
    | React.ReactNode<ArticleCard>
    | React.ReactNode<ArticleCardLink>
    | React.ReactNode<ArticleCard>[]
    | React.ReactNode<ArticleCardLink>[];
}

type ArticleCardChild =
  | typeof ArticleCardImage
  | typeof ArticleCardTitle
  | typeof ArticleCardDate
  | typeof ArticleCardSubtitle;

type ArticleCardsChild = typeof ArticleCard | typeof ArticleCardLink;
