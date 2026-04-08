import { create } from "zustand";

interface ArticleState {
  title: string;
  subtitle: string;
  bannerUrl: string | null;
  blocks: Blocks[];
  activeMediaTarget: "banner" | string | null;
  currentModalFolder: string; // Folder navigation

  // Actions
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  // setBanner: (url: string) => void;
  // updateBlockData: (id: string, data: UpdateBlocks) => void;
  openMediaLibrary: (target: "banner" | null) => void;
  selectImage: (url: string) => void;
  setCurrentModalFolder: (path: string) => void; // Folder navigation
}

export const useArticleStore = create<ArticleState>((set) => ({
  title: "",
  subtitle: "",
  bannerUrl: null,
  blocks: [],
  activeMediaTarget: null,
  currentModalFolder: "/",

  setTitle: (title) => set({ title }),
  setSubtitle: (subtitle) => set({ subtitle }),
  openMediaLibrary: (target) => set({ activeMediaTarget: target }),
  setCurrentModalFolder: (path) => set({ currentModalFolder: path }),
  selectImage: (url) =>
    set((state) => {
      if (state.activeMediaTarget === "banner") {
        return { bannerUrl: url, activeMediaTarget: null };
      }
      const newBlocks = state.blocks.map((b) =>
        b.id === state.activeMediaTarget
          ? { ...b, data: { ...b.data, url } }
          : b,
      );
      return { blocks: newBlocks, activeMediaTarget: null };
    }),
}));
