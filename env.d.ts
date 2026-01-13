declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'local' | 'development' | 'production';
    readonly API_URL: string;
  }
}
