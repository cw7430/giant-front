import { defineStore } from 'pinia';

import type {
  AuthStateData,
  SignInAndRefreshResponseDtoForClient,
} from '~~/layers/auth/contract/schema/shared';
import { useAppConfigStore } from '~~/layers/base/app/stores/app';

const initialState: AuthStateData = {
  accessTokenExpiresAtMs: null,
  employeeCode: null,
  employeeName: null,
  authRole: null,
  employeeRole: null,
  department: null,
  team: null,
  position: null,
};

const validateAuthIntegrity = (state: AuthStateData): boolean => {
  const {
    accessTokenExpiresAtMs,
    employeeCode,
    employeeName,
    authRole: accountRole,
    employeeRole,
    department,
    team,
    position,
  } = state;

  return !!(
    employeeCode &&
    employeeName &&
    accountRole &&
    employeeRole &&
    department &&
    team &&
    position &&
    accessTokenExpiresAtMs &&
    Date.now() + 30 * 1000 < accessTokenExpiresAtMs
  );
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    ...initialState,
    hasHydrated: false as boolean,
    refreshTimer: null as ReturnType<typeof setTimeout> | null,
    isRefreshing: false,
  }),

  getters: {
    checkAuth: (state) => validateAuthIntegrity(state),
  },

  actions: {
    setHasHydrated(v: boolean) {
      this.hasHydrated = v;
    },

    signIn(data: SignInAndRefreshResponseDtoForClient) {
      Object.assign(this, {
        accessTokenExpiresAtMs: data.accessTokenExpiresAtMs,
        employeeCode: data.employeeCode,
        employeeName: data.employeeName,
        authRole: data.authRole,
        employeeRole: data.employeeRole,
        department: data.department,
        team: data.team,
        position: data.position,
      });

      this.setupRefreshTimer();
    },

    signOut() {
      if (this.refreshTimer) {
        clearTimeout(this.refreshTimer);
        this.refreshTimer = null;
      }

      this.$patch({ ...initialState });
    },

    async refresh() {
      if (this.isRefreshing) return false;
      this.isRefreshing = true;

      try {
        const response = await $fetch('/api/auth/refresh', {
          method: 'POST',
          body: {
            isAuto: useAppConfigStore().isAutoSignIn,
          },
        });

        if (response.code === 'SU') {
          this.signIn(response.result);
          return true;
        }

        this.signOut();
        return false;
      } catch {
        this.signOut();
        return false;
      } finally {
        this.isRefreshing = false;
      }
    },

    setupRefreshTimer() {
      if (import.meta.server) return;
      if (this.refreshTimer) clearTimeout(this.refreshTimer);
      if (!this.accessTokenExpiresAtMs) return;

      const leadTime = 2 * 60 * 1000;
      const now = Date.now();
      const delay = this.accessTokenExpiresAtMs - now - leadTime;

      if (delay <= 0) {
        this.refresh();
      } else {
        this.refreshTimer = setTimeout(() => {
          this.refresh();
        }, delay);
      }
    },
  },

  persist: {
    key: 'auth-storage',
    storage: typeof window !== 'undefined' ? localStorage : undefined,

    pick: [
      'accessTokenExpiresAtMs',
      'employeeCode',
      'employeeName',
      'authRole',
      'employeeRole',
      'department',
      'team',
      'position',
    ],

    afterHydrate: (ctx) => {
      ctx.store.setHasHydrated(true);

      if (ctx.store.checkAuth) {
        ctx.store.setupRefreshTimer();
      }
    },
  },
});

export type AuthStore = ReturnType<typeof useAuthStore>;
