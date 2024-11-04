export type Operator = "+" | "-" | "*" | "/";

export function calc(
	x: number,
	y: number,
	operator: Operator,
):
	| {
			tag: "success";
			result: number;
	  }
	| {
			tag: "error";
			msg: string;
	  } {
	let result: number;
	switch (operator) {
		case "+":
			result = x + y;
			break;
		case "-":
			result = x - y;
			break;
		case "*":
			result = x * y;
			break;
		case "/":
			if (y === 0) {
				return {
					tag: "error",
					msg: "zero divided",
				};
			}
			result = x / y;
			break;
	}
	return {
		tag: "success",
		result,
	};
}
