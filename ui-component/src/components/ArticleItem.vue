<script setup lang="ts">
export type ItemProps = {
  id: string;
  title: string;
  body: string;
};

defineProps<ItemProps>();
</script>

<template>
  <li>
    <h3>{{ title }}</h3>
    <p>{{ body }}</p>
    <a :href="`/articles/${id}`">もっと見る</a>
  </li>
</template>
