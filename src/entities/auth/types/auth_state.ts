interface InitialAuthState {
  accessTokenExpiresAt: number | null;
  employeeCode: string | null;
  employeeName: string | null;
  accountRole: string | null;
  employeeRole: string | null;
  department: string | null;
  team: string | null;
  position: string | null;
}

export default interface AuthState extends InitialAuthState {
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

  checkAuth: () => boolean;

  signOut: () => void;
}
