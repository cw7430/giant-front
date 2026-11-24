import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/_guest/layout.tsx', [
    route('login', 'routes/_guest/login.tsx'),
  ]),
  layout('routes/_user/layout.tsx', [index('routes/_user/home.tsx')]),
  route('logout', 'routes/_api/logout.ts'),
] satisfies RouteConfig;
