<template>
  <div class="article-list">
    <h1>記事一覧</h1>

    <!-- ローディング表示 -->
    <div v-if="loading" class="loading">読み込み中...</div>

    <!-- エラー表示 -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <!-- 記事一覧 -->
    <div v-else class="articles">
      <div v-for="article in articles" :key="article.id" class="article-item">
        <h2>{{ article.title }}</h2>
        <p>{{ article.summary }}</p>
        <div class="article-meta">
          <span>投稿日: {{ formatDate(article.createdAt) }}</span>
          <router-link :to="`/articles/${article.id}`" class="read-more"> 続きを読む </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface Article {
  id: number
  title: string
  summary: string
  createdAt: string
}

const articles = ref<Article[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// 記事一覧を取得する関数
const fetchArticles = async () => {
  try {
    // APIエンドポイントは適宜変更してください
    const response = await fetch('/api/articles')
    if (!response.ok) {
      throw new Error('記事の取得に失敗しました')
    }
    const data = await response.json()
    articles.value = data
  } catch (e) {
    error.value = e instanceof Error ? e.message : '予期せぬエラーが発生しました'
  } finally {
    loading.value = false
  }
}

// 日付のフォーマット関数
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ja-JP')
}

// コンポーネントのマウント時に記事を取得
onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.article-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading,
.error {
  text-align: center;
  padding: 20px;
}

.error {
  color: red;
}

.article-item {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.article-item h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  color: #666;
}

.read-more {
  color: #0066cc;
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}
</style>
