import { expect, it, test, vi } from "vitest";
import { greet } from "./greet.ts";

it("Hell, World!!", () => {
	expect(greet("World")).toBe("Hello, World!!");
});

test("モック関数は実行された", () => {
	const mockfn = vi.fn();
	mockfn();
	expect(mockfn).toBeCalled();
});

test("モック関数は実行されていない", () => {
	const mockfn = vi.fn();
	expect(mockfn).not.toBeCalled();
});

test("モック関数を使ったアサーション", () => {
	const mockfn = vi.fn();
	mockfn("hello");
	expect(mockfn).toHaveBeenCalledTimes(1);
	expect(mockfn).toHaveBeenCalledWith("hello");
});
