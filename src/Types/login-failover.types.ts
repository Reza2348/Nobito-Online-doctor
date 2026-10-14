export type CheckState = "loading" | "success" | "warning" | "error";

export type DatabaseMode = "supabase" | "mongo";

export type FailoverAction =
  | { type: "database"; value: DatabaseMode }
  | { type: "supabase"; value: boolean }
  | { type: "automatic"; value: boolean };

export interface AuthStatus {
  localLoginReady?: boolean;
  resendConfigured?: boolean;
  sessionSecretOk?: boolean;
  simulationAllowed?: boolean;
  usersInMongo?: number;
  pendingLocalCodes?: number;
  pendingSignups?: number;
  message?: string;
}

export interface FailoverStatus {
  databaseMode: DatabaseMode;
  supabaseEnabled: boolean;
  supabaseReachable: boolean;
  mongoReachable: boolean;
  automaticFailover: boolean;
  message?: string;
}
