<script setup lang="ts">
const onClick = async () => {
  await useFetch('/api/auth/sign-out', {
    method: 'POST',
  });
};
</script>

<template>
  <BButton variant="outline-light" type="button" @click="onClick"
    >로그아웃</BButton
  >
</template>
