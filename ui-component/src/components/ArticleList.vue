<script setup lang="ts">
import ArticleItem, { ItemProps } from './ArticleItem.vue';

const { items } = defineProps<{ items: ItemProps[] }>();
</script>

<template>
  <h2>記事一覧</h2>
  <ul v-if="items.length">
    <ArticleItem v-for="item in items" v-bind="item" :key="item.id" />
  </ul>
  <p v-else>投稿記事がありません</p>
</template>
