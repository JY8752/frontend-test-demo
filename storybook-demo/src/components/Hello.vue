<script setup lang="ts">
import { onMounted, ref } from "vue";

type User = {
  name: string;
};

const data = ref<User>({ name: "" });
const loading = ref<boolean>(true);
const error = ref<Error | null>(null);

onMounted(async () => {
  try {
    const res = await fetch("/api/me");
    if (!res.ok) {
      throw new Error(`APIエラー: ${res.status}`);
    }
    data.value = await res.json();
  } catch (err) {
    error.value = err as Error;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 画面の高さいっぱいに広げる */
}
.content {
  background-color: skyblue;
  padding: 20px;
  border-radius: 10px;
  width: 10rem;
  text-align: center;
}
</style>

<template>
  <div class="container">
    <div class="content">
      <p v-if="loading">Loading...</p>
      <p v-else-if="error">{{ error.message }}</p>
      <p v-else>{{ data.name }}</p>
    </div>
  </div>
</template>
