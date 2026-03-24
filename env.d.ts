export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NUXT_PUBLIC_APP_ENV: 'local' | 'development' | 'production';
      readonly API_URL: string;
    }
  }
}
