import { useAppConfigStore } from '~~/layers/base/app/stores/app';
import { useAuthStore } from '~~/layers/auth/app/stores/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const refreshToken = useCookie('refreshToken');
  const appConfigStore = useAppConfigStore();
  const authStore = useAuthStore();
  const isServer = import.meta.server;
  const isClient = import.meta.client;

  if (isClient && !authStore.hasHydrated) {
    await new Promise((resolve) => {
      const unwatch = watch(
        () => authStore.hasHydrated,
        (val) => {
          if (val) {
            unwatch();
            resolve(true);
          }
        },
        { immediate: true },
      );
    });
  }

  const publicPages = ['/sign-in'];
  const isPublicPage = publicPages.some((path) => to.path.startsWith(path));
  const isAuthPage = to.path.startsWith('/sign-in');

  const hasValidSession = isServer ? !!refreshToken.value : authStore.checkAuth;

  const refreshBody = {
    isAuto: appConfigStore.isAutoSignIn,
  };

  if (isClient && authStore.employeeCode && !authStore.checkAuth) {
    const response = await $fetch('/api/auth/refresh', {
      method: 'POST',
      body: refreshBody,
    });

    if (response.code === 'SU') {
      authStore.signIn(response.result);
      return;
    }

    authStore.signOut();
  }

  if (hasValidSession && isAuthPage) {
    return navigateTo('/', { replace: true });
  }

  if (!hasValidSession && !isPublicPage) {
    const redirectUrl = encodeURIComponent(to.fullPath);
    return navigateTo(`/sign-in?redirect=${redirectUrl}`, { replace: true });
  }
});
