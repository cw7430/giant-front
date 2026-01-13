declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'local' | 'development' | 'production';
    readonly NEXT_PUBLIC_API_URL: string;
  }
}
