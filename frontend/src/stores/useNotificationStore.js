import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  // --- ここが「static変数」みたいなもの ---
  open: false,
  message: '',
  severity: 'info',

  // --- ここが「staticメソッド」みたいなもの ---
  showNotification: (message, severity = 'info') => 
    set({ open: true, message, severity }),

  hideNotification: () => 
    set({ open: false }),
}));
export default useNotificationStore;