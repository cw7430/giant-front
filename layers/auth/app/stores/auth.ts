import { defineStore } from 'pinia';

import type {
  AuthStateData,
  SignInAndRefreshResponseDtoForClient,
} from '~~/layers/auth/contract/schema/shared';

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
        accountRole: data.authRole,
        employeeRole: data.employeeRole,
        department: data.department,
        team: data.team,
        position: data.position,
      });
    },

    signOut() {
      this.$patch({ ...initialState });
    },
  },

  persist: {
    key: 'auth-storage',
    storage: typeof window !== 'undefined' ? localStorage : undefined,

    pick: [
      'accessTokenExpiresAtMs',
      'employeeCode',
      'employeeName',
      'accountRole',
      'employeeRole',
      'department',
      'team',
      'position',
    ],

    afterHydrate: (ctx) => {
      ctx.store.setHasHydrated(true);
    },
  },
});
