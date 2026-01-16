import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  accessTokenExpiresAt: number | null;
  employeeCode: string | null;
  employeeName: string | null;
  accountRole: string | null;
  employeeRole: string | null;
  department: string | null;
  team: string | null;
  position: string | null;

  signIn: (
    accessTokenExpiresAt: number,
    employeeCode: string,
    employeeName: string,
    accountRole: string,
    employeeRole: string,
    department: string,
    team: string,
    position: string,
  ) => void;

  signOut: () => void;
}

const initialState = {
  isAuthenticated: false,
  accessTokenExpiresAt: null,
  employeeCode: null,
  employeeName: null,
  accountRole: null,
  employeeRole: null,
  department: null,
  team: null,
  position: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
          isAuthenticated: true,
          accessTokenExpiresAt,
          employeeCode,
          employeeName,
          accountRole,
          employeeRole,
          department,
          team,
          position,
        }),

      signOut: () => set(initialState),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
