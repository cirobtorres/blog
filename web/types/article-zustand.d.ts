type ArticleStateAttr = ArticleStateAttrContent & ArticleStateAttrUtils;

type ArticleStateAttrContent = {
  title: string;
  subtitle: string;
  slug: string;
  bannerMediaId: string | null;
  bannerUrl: string | null;
  bannerAlt: string | null;
  blocks: Blocks[];
};

type ArticleStateAttrUtils = {
  loading: boolean;
  isSlugTaken: "valid" | "invalid" | "empty";
  activeMediaTarget: "banner" | string | null;
  currentModalFolder: string;
  currentModalPage: number;
};

type ArticleStateFuncContent = {
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  setSlug: (slug: string) => void;
  selectBanner: (data: ImageEditor) => void;
  selectImages: (images: ImageEditor[]) => void;
  setBlocks: (blocks: Blocks[]) => void;
  updateBlock: (id: string, data: UpdateBlocks) => void;
  reset: () => void;
};

type ArticleStateFuncUtils = {
  // Accordion related
  deleteBlock: (id: string) => void;
  toggleBlockLock: (id: string) => void;
  moveBlockDownward: (id: string) => void;
  // Modals, validations, transitions
  setLoading: (loading: boolean) => void;
  setIsSlugTaken: (isSlugTaken: "valid" | "invalid" | "empty") => void;
  openMediaLibrary: (target: string | null) => void;
  setCurrentModalFolder: (path: string) => void;
  setModalPage: (page: number) => void;
};

type ArticleState = ArticleStateAttrContent &
  ArticleStateAttrUtils &
  ArticleStateFuncContent &
  ArticleStateFuncUtils;

type ArticleStoreApi = ReturnType<typeof createArticleStore>;
