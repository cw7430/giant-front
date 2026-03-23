<template>
  <main class="d-flex justify-content-center align-items-center vh-100">
    <div class="w-100 px-3 text-center">
      <div class="row row-cols-1 row-cols-md-2 g-4">
        <div class="col d-flex justify-content-end">
          <div
            class="p-4 border border-danger bg-danger-subtle rounded cursor-pointer h-100 d-flex justify-content-center align-items-center"
            :class="$style.minContentsBlock"
          >
            재고관리
          </div>
        </div>
        <div class="col d-flex justify-content-start">
          <div
            class="p-4 border border-warning bg-warning-subtle rounded cursor-pointer h-100 d-flex justify-content-center align-items-center"
            :class="$style.minContentsBlock"
          >
            매출관리
          </div>
        </div>
      </div>
      <div class="row g-4 mt-3">
        <div class="col d-flex justify-content-center">
          <div
            class="p-4 border border-primary bg-primary-subtle rounded cursor-pointer h-100 d-flex justify-content-center align-items-center"
            :class="$style.minContentsBlock"
          >
            인사관리
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style module>
.min-contents-block {
  min-width: 250px;
  min-height: 150px;
}
</style>
