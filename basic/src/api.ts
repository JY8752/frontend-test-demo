import { getMyArticles, getMyProfile } from "./fetcher";

export async function getGreet() {
	const data = await getMyProfile();
	if (!data.name) {
		return "Hello, anonymous user!";
	}

	return `Hello, ${data.name}!`;
}

export async function getMyArticleLinksByCategory(category: string) {
	// データを取得する関数（Web APIクライアント）
	const data = await getMyArticles();
	// 取得したデータのうち、指定したタグが含まれる記事に絞り込む
	const articles = data.articles.filter((article) =>
		article.tags.includes(category),
	);
	if (!articles.length) {
		// 該当記事がない場合、nullを返す
		return null;
	}
	// 該当記事がある場合、一覧向けに加工したデータを返す
	return articles.map((article) => ({
		title: article.title,
		link: `/articles/${article.id}`,
	}));
}
