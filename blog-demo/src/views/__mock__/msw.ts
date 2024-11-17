import { http, HttpResponse } from "msw"
import { articles } from "./fixture"

export function handleGetArticles() {
  return http.get('/api/articles', () => {
    return HttpResponse.json(articles)
  })
}

export const handlers = [handleGetArticles()]
