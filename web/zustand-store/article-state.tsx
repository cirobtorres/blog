import { create } from "zustand";

interface ArticleState {
  title: string;
  subtitle: string;
  bannerUrl: string | null;
  blocks: Blocks[];
  activeMediaTarget: "banner" | string | null;
  currentModalFolder: string; // Folder navigation
  currentModalPage: number;

  // Actions
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  setBanner: (bannerUrl: string) => void;
  // updateBlockData: (id: string, data: UpdateBlocks) => void;
  openMediaLibrary: (target: "banner" | null) => void;
  selectImage: (url: string) => void;
  setCurrentModalFolder: (path: string) => void; // Folder navigation
  setModalPage: (page: number) => void;
}

export const useArticleStore = create<ArticleState>((set) => ({
  title: "",
  subtitle: "",
  bannerUrl: null,
  blocks: [],
  activeMediaTarget: null,
  currentModalFolder: "/",
  currentModalPage: 0,

  setTitle: (title) => set({ title }),
  setSubtitle: (subtitle) => set({ subtitle }),
  setBanner: (bannerUrl) => set({ bannerUrl }),
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
  setModalPage: (page) => set({ currentModalPage: page }),
}));
