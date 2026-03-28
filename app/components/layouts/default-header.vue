<script setup lang="ts">
import SignOutButton from '~~/layers/auth/app/components/ui/sign-out-button.vue';
</script>

<template>
  <header
    class="bg-black text-white py-3 px-4 d-flex justify-content-between align-items-center"
  >
    <BNavbar v-b-color-mode="'dark'" toggleable="lg">
      <BNavbarBrand as="NuxtLink" to="/">Giant</BNavbarBrand>
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav>
          <BNavItem href="#">재고관리</BNavItem>
          <BNavItem href="#">매출관리</BNavItem>
          <BNavItem as="NuxtLink" to="/hr/profiles">인사관리</BNavItem>
        </BNavbarNav>
      </BCollapse>
    </BNavbar>
    <div class="d-flex gap-2">
      <BButton variant="outline-light">내 프로필</BButton>
      <SignOutButton />
    </div>
  </header>
</template>
