<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <main
    class="d-flex align-items-center justify-content-center min-vh-100 bg-background p-4"
  >
    <div class="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
      <div class="position-absolute glow-primary" />
      <div class="position-absolute glow-accent" />
    </div>
    <BCard
      class="w-100 position-relative shadow-lg border-0 text-center glass-card"
    >
      <BCardBody class="text-center pb-2">
        <BCardTitle>로그인</BCardTitle>
        <BCardSubtitle>Giant</BCardSubtitle>
      </BCardBody>
      <BCardBody class="text-start pb-2">
        <SignInForm />
      </BCardBody>
    </BCard>
  </main>
</template>

<style>
.glow-primary {
  top: -10rem;
  right: -10rem;
  width: 20rem;
  height: 20rem;
  background-color: rgba(13, 110, 253, 0.05);
  border-radius: 50%;
  filter: blur(64px);
}

.glow-accent {
  bottom: -10rem;
  left: -10rem;
  width: 20rem;
  height: 20rem;
  background-color: rgba(255, 193, 7, 0.05);
  border-radius: 50%;
  filter: blur(64px);
}

.glass-card {
  max-width: 448px;
  z-index: 10;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>
