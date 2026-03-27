export default defineNuxtRouteMiddleware((to) => {
  const refreshToken = useCookie('refreshToken');

  const isServer = import.meta.server;

  if (!isServer) return;

  const publicPages = ['/sign-in'];

  const isPublicPage = publicPages.some((path) => to.path.startsWith(path));

  if (isPublicPage && refreshToken.value) {
    return navigateTo('/', { replace: true });
  }

  if (!isPublicPage && !refreshToken.value) {
    const redirectUrl = encodeURIComponent(to.fullPath);
    return navigateTo(`/sign-in?redirect=${redirectUrl}`, { replace: true });
  }
});
