import { create } from 'zustand';
import type { Stage, Signal } from '@/lib/constants';

export interface ProspectFilters {
  stages: Stage[];
  signals: Signal[];
}

const EMPTY_FILTERS: ProspectFilters = { stages: [], signals: [] };

interface ProspectStore {
  activeTab: 'hunt' | 'activate' | 'inbox';
  activeView: 'contacts' | 'accounts';
  searchQuery: string;
  filters: ProspectFilters;
  currentPage: number;
  selectedRowIds: string[];
  isFilterPanelOpen: boolean;
  activeTeamMemberId: string;

  setActiveTab: (tab: ProspectStore['activeTab']) => void;
  setActiveView: (view: ProspectStore['activeView']) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: ProspectFilters) => void;
  clearFilters: () => void;
  setCurrentPage: (page: number) => void;
  toggleRowSelection: (id: string) => void;
  selectPage: (ids: string[]) => void;
  clearSelection: () => void;
  setFilterPanelOpen: (open: boolean) => void;
  setActiveTeamMember: (id: string) => void;
}

export const useProspectStore = create<ProspectStore>()((set) => ({
  activeTab: 'hunt',
  activeView: 'contacts',
  searchQuery: '',
  filters: EMPTY_FILTERS,
  currentPage: 1,
  selectedRowIds: [],
  isFilterPanelOpen: false,
  activeTeamMemberId: 't2', // Sarah — Outbound Engine is the default active surface

  // Tab and view changes reset page and clear cross-page selection
  setActiveTab: (activeTab) => set({ activeTab, currentPage: 1, selectedRowIds: [] }),
  setActiveView: (activeView) => set({ activeView, currentPage: 1, selectedRowIds: [] }),

  // Search and filter changes reset page; selection survives so multi-page picks work
  setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
  setFilters: (filters) => set({ filters, currentPage: 1 }),
  clearFilters: () => set({ filters: EMPTY_FILTERS, currentPage: 1 }),

  setCurrentPage: (currentPage) => set({ currentPage }),

  toggleRowSelection: (id) =>
    set((s) => ({
      selectedRowIds: s.selectedRowIds.includes(id)
        ? s.selectedRowIds.filter((r) => r !== id)
        : [...s.selectedRowIds, id],
    })),

  selectPage: (ids) =>
    set((s) => {
      const allSelected = ids.every((id) => s.selectedRowIds.includes(id));
      return {
        selectedRowIds: allSelected
          ? s.selectedRowIds.filter((r) => !ids.includes(r))
          : [...new Set([...s.selectedRowIds, ...ids])],
      };
    }),

  clearSelection: () => set({ selectedRowIds: [] }),
  setFilterPanelOpen: (isFilterPanelOpen) => set({ isFilterPanelOpen }),
  setActiveTeamMember: (activeTeamMemberId) => set({ activeTeamMemberId }),
}));
