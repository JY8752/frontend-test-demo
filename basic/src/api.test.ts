import { expect, test, vi } from "vitest";
import { getGreet, getMyArticleLinksByCategory } from "./api";
import * as Fetchers from "./fetcher";
import { getMyArticlesData, httpError } from "./fetcher/fixtures";

function mockGetMyArticles(status = 200) {
	if (status > 299) {
		return vi.spyOn(Fetchers, "getMyArticles").mockRejectedValueOnce(httpError);
	}
	return vi
		.spyOn(Fetchers, "getMyArticles")
		.mockResolvedValueOnce(getMyArticlesData);
}

/**
 * spyOnを使ったAPIをモックにしたテスト
 */

test("データ取得成功時: ユーザー名がないとき", async () => {
	vi.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
		id: "xxxxxxx-123456",
		email: "test@test.com",
	});
	await expect(getGreet()).resolves.toBe("Hello, anonymous user!");
});

test("データ取得成功時: ユーザー名があるとき", async () => {
	vi.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
		id: "xxxxxxx-123456",
		email: "test@test.com",
		name: "yamanaka",
	});
	await expect(getGreet()).resolves.toBe("Hello, yamanaka!");
});

test("データ取得失敗時", async () => {
	vi.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
	await expect(getGreet()).rejects.toMatchObject({
		err: { message: "internal server error" },
	});
});

/**
 * モック生成関数を使ったテスト
 */
test("記事一覧取得: success", async () => {
	mockGetMyArticles();
	const act = await getMyArticleLinksByCategory("nextjs");
	expect(act?.length).toBe(1);
});

test("記事一覧取得: failed", async () => {
	mockGetMyArticles(500);
	await getMyArticleLinksByCategory("testing").catch((err) => {
		expect(err).toMatchObject({
			err: { message: "internal server error" },
		});
	});
});
