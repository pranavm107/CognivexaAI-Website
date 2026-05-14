import { create } from 'zustand';

const useUIStore = create((set) => ({
  isCommandMenuOpen: false,
  setCommandMenuOpen: (isOpen) => set({ isCommandMenuOpen: isOpen }),
  
  // Sidebar state
  isSidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  // Notification panel
  isNotificationPanelOpen: false,
  setNotificationPanelOpen: (isOpen) => set({ isNotificationPanelOpen: isOpen }),
}));

export default useUIStore;
