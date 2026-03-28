<script setup lang="ts">
const fields = ['first_name', 'last_name', 'age'];
const items = [
  { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
];
</script>

<template>
  <BContainer>
    <BRow>
      <BCol>
        <BTable bordered hover :items="items" :fields="fields" />
      </BCol>
    </BRow>
  </BContainer>
</template>
