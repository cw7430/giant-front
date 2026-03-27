<script setup lang="ts">
const refreshToken = useCookie('refreshToken');

if (!refreshToken.value) {
  await navigateTo('/sign-in', { replace: true });
}
</script>

<template>
  <div class="bg-light text-dark">
    <DefaultHeader />
    <slot />
    <DefaultFooter />
  </div>
</template>
