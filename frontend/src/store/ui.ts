import { create } from "zustand";

interface UIState {
  searchQuery: string;
  currentPage: number;
  currentDashboardPage: number;
  sortBy: "newest" | "oldest" | "title";
  isLoading: boolean;
  setSearchQuery: (query: string) => void;
  setCurrentDashboardPage: (page: number) => void;
  setCurrentPage: (page: number) => void;
  setSortBy: (sort: "newest" | "oldest" | "title") => void;
  setIsLoading: (loading: boolean) => void;
  resetFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchQuery: "",
  currentPage: 1,
  currentDashboardPage: 1,
  sortBy: "newest",
  isLoading: false,

  setSearchQuery: (query: string) =>
    set({ searchQuery: query, currentPage: 1 }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setCurrentDashboardPage: (page: number) =>
    set({ currentDashboardPage: page }),
  setSortBy: (sort: "newest" | "oldest" | "title") =>
    set({ sortBy: sort, currentPage: 1 }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  resetFilters: () =>
    set({ searchQuery: "", currentPage: 1, sortBy: "newest" }),
}));
