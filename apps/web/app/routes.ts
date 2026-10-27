import { type RouteConfig, index, layout } from '@react-router/dev/routes';

export default [
  layout('routes/_user/layout.tsx', [index('routes/_user/home.tsx')]),
] satisfies RouteConfig;
