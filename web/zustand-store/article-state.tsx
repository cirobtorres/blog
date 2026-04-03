import { create } from "zustand";

interface ArticleState {
  title: string;
  subtitle: string;
  bannerUrl: string | null;
  blocks: Blocks[];
  activeMediaTarget: "banner" | string | null;

  // Actions
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  // setBanner: (url: string) => void;
  // updateBlockData: (id: string, data: UpdateBlocks) => void;
  openMediaLibrary: (target: "banner" | null) => void;
  selectImage: (url: string) => void;
}

export const useArticleStore = create<ArticleState>((set) => ({
  title: "",
  subtitle: "",
  bannerUrl: null,
  blocks: [],
  activeMediaTarget: null,

  setTitle: (title) => set({ title }),
  setSubtitle: (subtitle) => set({ subtitle }),
  openMediaLibrary: (target) => set({ activeMediaTarget: target }),
  selectImage: (url) =>
    set((state) => {
      if (state.activeMediaTarget === "banner") {
        return { bannerUrl: url, activeMediaTarget: null };
      }
      // Se o alvo for um bloco (ex: image-1)
      const newBlocks = state.blocks.map((b) =>
        b.id === state.activeMediaTarget
          ? { ...b, data: { ...b.data, url } }
          : b,
      );
      return { blocks: newBlocks, activeMediaTarget: null };
    }),
  // updateBlockData: (val) => set({body: val})
  // setBanner: (val) => set()
}));
