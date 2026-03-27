import type { CookieRef } from '#app';

import { useAppConfigStore } from '~~/layers/base/app/stores/app';
import { useAuthStore, type AuthStore } from '~~/layers/auth/app/stores/auth';

const waitForHydration = async (authStore: AuthStore) => {
  if (import.meta.client && !authStore.hasHydrated) {
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
};

const isPublicPage = (path: string) => {
  const publicPages = ['/sign-in'];
  return publicPages.some((p) => path.startsWith(p));
};

const isAuthPage = (path: string) => {
  return path.startsWith('/sign-in');
};

const hasValidSession = (
  isServer: boolean,
  refreshToken: CookieRef<string | null | undefined>,
  authStore: AuthStore,
) => {
  return isServer ? !!refreshToken.value : authStore.checkAuth;
};

const tryRefresh = async (authStore: AuthStore, isAuto: boolean) => {
  const response = await $fetch('/api/auth/refresh', {
    method: 'POST',
    body: { isAuto },
  });

  if (response.code === 'SU') {
    authStore.signIn(response.result);
    return true;
  }

  authStore.signOut();
  return false;
};

export default defineNuxtRouteMiddleware(async (to) => {
  const refreshToken = useCookie('refreshToken');
  const appConfigStore = useAppConfigStore();
  const authStore = useAuthStore();

  const isServer = import.meta.server;

  await waitForHydration(authStore);

  const publicPage = isPublicPage(to.path);
  const authPage = isAuthPage(to.path);

  let validSession = hasValidSession(isServer, refreshToken, authStore);

  if (!isServer && authStore.employeeCode && !validSession) {
    validSession = await tryRefresh(authStore, appConfigStore.isAutoSignIn);
  }

  if (validSession && authPage) {
    return navigateTo('/', { replace: true });
  }

  if (!validSession && !publicPage) {
    const redirectUrl = encodeURIComponent(to.fullPath);
    return navigateTo(`/sign-in?redirect=${redirectUrl}`, {
      replace: true,
    });
  }
});
