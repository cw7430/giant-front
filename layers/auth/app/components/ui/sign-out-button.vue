<script setup lang="ts">
import { useAuthStore } from '~~/layers/auth/app/stores/auth';

const route = useRoute();

const isLoading = ref<boolean>(false);

const authStore = useAuthStore();

const onClick = async () => {
  isLoading.value = true;
  await $fetch('/api/auth/sign-out', {
    method: 'POST',
  });
  authStore.signOut();

  const redirectUrl = encodeURIComponent(route.fullPath);

  isLoading.value = false;
  return await navigateTo(`/sign-in?redirect=${redirectUrl}`, {
    replace: true,
  });
};
</script>

<template>
  <BButton
    variant="outline-light"
    type="button"
    :disabled="isLoading"
    @click="onClick"
    >로그아웃</BButton
  >
</template>
