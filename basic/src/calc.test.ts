import { describe, expect, it } from "vitest";
import { type Operator, calc } from "./calc";

describe("calc test", () => {
	type TestCase = {
		x: number;
		y: number;
		operator: Operator;
		expected: number;
	};

	const tests: TestCase[] = [
		{ x: 1, y: 1, operator: "+", expected: 2 },
		{ x: 1, y: 1, operator: "-", expected: 0 },
		{ x: 1, y: 5, operator: "-", expected: -4 },
		{ x: 1, y: 5, operator: "*", expected: 5 },
		{ x: 10, y: 5, operator: "/", expected: 2 },
	];

	it.each(tests)(
		"$x $operator $y = $expected",
		({ x, y, operator, expected }) => {
			const act = calc(x, y, operator);
			expect(act).toEqual({ tag: "success", result: expected });
		},
	);

	it("zero divide", () => {
		const act = calc(10, 0, "/");
		expect(act).toEqual({ tag: "error", msg: "zero divided" });
	});
});
