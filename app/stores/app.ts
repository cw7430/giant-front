import { defineStore } from 'pinia';

export const useAppConfigStore = defineStore('appConfig', {
  state: () => ({
    isAutoSignIn: false as boolean,
  }),

  actions: {
    setAutoSignIn(isAutoSignIn: boolean) {
      this.isAutoSignIn = isAutoSignIn;
    },
  },

  persist: {
    key: 'app-config-storage',
    storage: import.meta.client ? localStorage : undefined,
  },
});
