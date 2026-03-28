<script setup lang="ts">
import type { PageResponseMetaDto } from '~~/layers/base/shared/schema/page';

const props = defineProps<{
  data: PageResponseMetaDto;
}>();

const {
  size,
  // totalElements,
  totalPages,
  currentPage,
  // startPage,
  // endPage,
  // hasNext,
  // hasPrevious,
} = props.data;
</script>

<template>
  <BPagination
    v-model="currentPage"
    :total-rows="totalPages"
    :per-page="size"
    first-text="First"
    prev-text="Prev"
    next-text="Next"
    last-text="Last"
  />
</template>
