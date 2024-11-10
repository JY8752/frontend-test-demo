<script setup lang="ts">
defineProps<{ name: string; onSubmit?: (e: Event) => void }>();
</script>

<template>
  <form @submit="onSubmit">
    <h2>アカウント情報</h2>
    <p>{{ name }}</p>
    <div>
      <button>編集する</button>
    </div>
  </form>
</template>
