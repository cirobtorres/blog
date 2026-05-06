import { create } from "zustand";
import { slugify } from "../utils/strings-transforms";

interface ArticleState {
  title: string;
  subtitle: string;
  slug: string;
  loading: boolean;
  bannerMediaId: string | null;
  bannerUrl: string | null;
  bannerAlt: string | null;
  blocks: Blocks[];
  activeMediaTarget: "banner" | string | null;
  currentModalFolder: string;
  currentModalPage: number;
  setLoading: (loading: boolean) => void;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  setSlug: (slug: string) => void;
  hydrateBanner: (data: ImageEditor) => void;
  openMediaLibrary: (target: string | null) => void;
  selectImages: (images: ImageEditor[]) => void;
  setCurrentModalFolder: (path: string) => void;
  setModalPage: (page: number) => void;
  setBlocks: (blocks: Blocks[]) => void;
  updateBlock: (id: string, data: UpdateBlocks) => void;
  deleteBlock: (id: string) => void;
  toggleBlockLock: (id: string) => void;
  moveBlockDownward: (id: string) => void;
}

export const useArticleStore = create<ArticleState>((set) => ({
  title: "",
  subtitle: "",
  slug: "",
  loading: false,
  bannerMediaId: null,
  bannerUrl: null,
  bannerAlt: null,
  blocks: [],
  activeMediaTarget: null,
  currentModalFolder: "/",
  currentModalPage: 0,
  setLoading: (loading) => set({ loading }),
  setTitle: (title) => set({ title }),
  setSubtitle: (subtitle) => set({ subtitle }),
  setSlug: (slug) => set({ slug: slugify(slug) }),
  openMediaLibrary: (target) => set({ activeMediaTarget: target }),
  hydrateBanner: (data) => {
    set({
      bannerMediaId: data.id,
      bannerUrl: data.url,
      bannerAlt: data.alt,
    });
  },
  setCurrentModalFolder: (path) => set({ currentModalFolder: path }),
  selectImages: (images) => {
    set((state) => {
      // 1. Banner
      if (state.activeMediaTarget === "banner") {
        const img = images[0];
        if (!img) return { activeMediaTarget: null };
        return {
          bannerMediaId: img.id,
          bannerUrl: img.url,
          bannerAlt: img.alt,
          activeMediaTarget: null,
        };
      }
      // 2. Blocks (Editors)
      const newBlocks = state.blocks.map((b) => {
        if (b.id !== state.activeMediaTarget) return b;
        // Multiple
        if (b.type === "images") {
          return {
            ...b,
            data: { ...b.data, images: images },
          };
        }
        // Single
        if (b.type === "image") {
          const img = images[0];
          return {
            ...b,
            data: {
              ...b.data,
              id: img?.id,
              url: img?.url,
              alt: img?.alt,
            },
          };
        }
        return b;
      }) as Blocks[];
      return { blocks: newBlocks, activeMediaTarget: null };
    });
  },
  setModalPage: (page) => set({ currentModalPage: page }),
  setBlocks: (blocks) => set({ blocks }),
  updateBlock: (id, data) =>
    set((state) => ({
      blocks: state.blocks.map((b) => {
        if (b.id !== id) return b;
        return {
          ...b,
          data: b.data ? { ...b.data, ...data } : data,
        } as Blocks;
      }),
    })),
  deleteBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
    })),
  toggleBlockLock: (id) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id ? { ...b, locked: !b.locked } : b,
      ),
    })),
  moveBlockDownward: (id) =>
    set((state) => {
      const index = state.blocks.findIndex((b) => b.id === id);
      if (index === -1 || index === state.blocks.length - 1) return state;
      const newBlocks = [...state.blocks];
      [newBlocks[index], newBlocks[index + 1]] = [
        newBlocks[index + 1],
        newBlocks[index],
      ];
      return { blocks: newBlocks };
    }),
}));
