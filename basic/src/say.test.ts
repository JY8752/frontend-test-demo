import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import { sayBye, sayHello } from "./say";

vi.mock("./say", async (importOriginal) => {
	return {
		...(await importOriginal<typeof import("./say")>()),
		sayHello: () => "Hello!!",
	};
});

// test("success sayHello", () => {
// 	expect(sayHello()).toBe("Hello");
// });

// it("mock method is undefined", () => {
// 	expect(sayHello()).toBeUndefined();
// });

it("stub", () => {
	expect(sayHello()).toBe("Hello!!");
	expect(sayBye()).toBe("Bye");
});
