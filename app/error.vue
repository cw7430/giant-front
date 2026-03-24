<script setup lang="ts">
import type { NuxtError } from '#app';

const _props = defineProps<{ error: NuxtError }>();
</script>

<template>
  <main>
    <h1>{{ error.status }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </main>
</template>
