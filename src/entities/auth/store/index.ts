import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type AuthState } from '@/entities/auth/types';

const initialState = {
  accessTokenExpiresAt: null,
  employeeCode: null,
  employeeName: null,
  accountRole: null,
  employeeRole: null,
  department: null,
  team: null,
  position: null,
};

const validateAuthIntegrity = (state: AuthState): boolean => {
  const {
    accessTokenExpiresAt,
    employeeCode,
    employeeName,
    accountRole,
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
    accessTokenExpiresAt &&
    Date.now() + 30 * 1000 < accessTokenExpiresAt
  );
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      signIn: (
        accessTokenExpiresAt: number,
        employeeCode: string,
        employeeName: string,
        accountRole: string,
        employeeRole: string,
        department: string,
        team: string,
        position: string,
      ) =>
        set({
          accessTokenExpiresAt,
          employeeCode,
          employeeName,
          accountRole,
          employeeRole,
          department,
          team,
          position,
        }),

      checkAuth: () => validateAuthIntegrity(get()),

      signOut: () => set(initialState),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export const useIsAuthenticated = () => {
  return useAuthStore((state) => validateAuthIntegrity(state));
};
