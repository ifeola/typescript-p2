// The differences between arrays and tuples
/* The core difference lies in the type annotation (number[] vs. [number, number]) and what it implies about the structure and intended use of the array. */

// Array
const coord: number[] = [1, 2];
coord[0] = 5; // OK: Changing an existing element to another number
coord.push(3); // OK: Adding another number (coord is now [5, 2, 3])
// coord = [4, 5, 6]; // Error: Cannot assign to 'coord' because it is a constant.
// console.log(coord.length); // Can be 2, 3, or any other number after modifications
// console.log(coord[2]); // Accessing index 2 is okay now (value is 3)
// Accessing coord[3] would compile but return 'undefined' at runtime.
/* 
1. const coord: number[] = [1, 2];

    Type: number[] signifies an Array Type.

    Meaning: This declares coord as an array where all elements must be numbers.

    Length: The type number[] does not specify a fixed length. While initialized with two elements, TypeScript only knows it's an array of numbers. You can (in theory, though const prevents reassignment of coord itself) modify its length later.

    Flexibility: You can add more numbers, remove numbers, or change existing ones (as long as they remain numbers).
    ```typescript
*/

// Tuple
let tuple: [number, number] = [1, 2];
tuple[0] = 5; // OK: Changing an existing element to another number at a defined position
tuple.push(3); // TS Error (or strongly discouraged): Argument of type '3' is not assignable to parameter of type 'undefined'. Property 'push' does not exist on type '[number, number]' (Modern TS might prevent this better). Even if it worked at runtime due to JS arrays, it violates the tuple's fixed-length contract.
// tuple[2] = 3; // TS Error: Tuple type '[number, number]' of length '2' has no element at index '2'.
// tuple = [4, 5]; // Error: Cannot assign to 'tuple' because it is a constant.
// tuple = [4, 5, 6]; // Error: Source has 3 element(s) but target allows only 2. Also const error.

// console.log(tuple.length); // TypeScript knows this is exactly 2
// console.log(tuple[0]); // Known to be a number
// console.log(tuple[1]); // Known to be a number
// console.log(tuple[2]); // TS Error: Tuple type '[number, number]' of length '2' has no element at index '2'.
/* 
const tuple: [number, number] = [1, 2];

    Type: [number, number] signifies a Tuple Type.

    Meaning: This declares tuple as an array with a fixed structure: it must have exactly two elements, and both the first and second elements must be numbers.

    Length: The type [number, number] enforces a fixed length of 2. TypeScript knows this precisely.

    Strictness: TypeScript provides stronger guarantees about the elements and length.
    ```typescript
    const tuple: [number, number] = [1, 2];
*/

/* 
    Use Case: Best for representing structures where the position of an element has specific meaning and the number of elements is fixed (e.g., coordinates (x, y), RGB color values [r, g, b], key-value pairs [string, number], return values from functions that logically return multiple distinct things).

Summary Table:
Feature	const coord: number[] = [1, 2];	const tuple: [number, number] = [1, 2];
-Type -	Array (number[]) ||	Tuple ([number, number])
-Length -	Variable (not fixed by type) ||	Fixed (exactly 2, enforced by type)
-Element Types -	All elements must be number ||	Element at index 0 must be number, Element at index 1 must be number
Strictness	Less strict about length/indices	More strict about length/indices
Compile Check	Allows accessing potentially undefined indices (e.g., coord[2] initially)	Errors if accessing index outside defined range (e.g., tuple[2])
-Mutability -	Array contents can be modified (add/remove elements)  ||	Tuple elements can be modified, but adding/removing violates the type contract (may error or be discouraged)
Intention	A list of numbers	A fixed structure of exactly two numbers

In essence: Use number[] for lists of numbers, and [number, number] (or other tuple types) for fixed structures where element position matters. The tuple provides more type safety regarding the array's shape.
*/

// Literals and Enums
// Literals
/* Literal is an instance of a primitive type
"string" - This is a string literal
true - This is a boolean literal
50 - This is a number literal
*/

// Where to use literals
let coordinates: string;
coordinates = "south";

// Rather than allowing the value to be any "string" value, we can write the code like this
// Example 1
let direction: "north" | "south" | "east" | "west";
// direction = "hello"; //Type '"hello"' is not assignable to type '"north" | "south" | "east" | "west"'.
// but we can say,
// Prompt user for direction and validate input
const input = "north";
if (
	input === "north" ||
	input === "south" ||
	input === "east" ||
	input === "west"
) {
	direction = input;
} else {
	console.error("Invalid direction entered.");
}

// Example 1
let responseCode: 200 | 404 | 201;
responseCode = 200;

// Enums - This enables developers to establish a collection of named constants (enumerators), each linked with an integer value.
enum Numbers {
	Zero,
	One,
	Two,
	Three,
}
let number: Numbers = Numbers.One;
console.log(number); //Outputs 1

enum Size {
	Small = 100,
	Medium,
	Large,
}
let size: Size = Size.Medium;
console.log(size); //Outputs 101

// Enums are treated as data types, and you can use them to create sets of constants for use with variables and properties.
// string Enums
enum Size {
	Up = "UP",
	Down = "DOWN",
	Left = "LEFT",
	Right = "RIGHT",
}

// Any Type, Unknown Type and Type cast
// ------------------------------ Any type
/* 
What it is: any is TypeScript's "escape hatch." It essentially tells the compiler to turn off type checking for a particular variable.

Behavior:
    - You can assign any value (string, number, object, etc.) to a variable of type any.
    - You can assign a value of type any to a variable of almost any other type (this is generally unsafe).
    - You can access any property or call any method on a variable of type any, even if it doesn't exist at runtime. TypeScript won't complain at compile time.

		Pros:
    - Useful when migrating existing JavaScript code to TypeScript.
    - Can be a temporary solution when dealing with complex third-party libraries without proper typings (though this is less common now).
    - Allows for very dynamic code structures if absolutely necessary.

		Cons:
    - Completely undermines the benefits of TypeScript. You lose compile-time type safety.
    - Errors that would be caught at compile time (like typos in property names or incorrect method calls) are deferred until runtime, leading to crashes or unexpected behavior.
    - Makes code harder to understand and refactor because the compiler provides no guarantees about the shape or behavior of any variables.
*/

// Example of any type
let looselyTyped: any;

looselyTyped = 5; // OK
looselyTyped = "hello"; // OK
looselyTyped = { id: 1 }; // OK

console.log(looselyTyped.toUpperCase()); // Compiles OK, but will CRASH if looselyTyped is not a string at runtime

let myNum: number;
myNum = looselyTyped; // Compiles OK (Dangerous!), will cause runtime error if looselyTyped is not a number

looselyTyped.someNonExistentMethod(); // Compiles OK, but CRASHES at runtime
console.log(looselyTyped.someNonExistentProperty); // Compiles OK, but results in `undefined` at runtime

//     Recommendation: Avoid any whenever possible. Use it only as a last resort.

// ------------------------------ Unknown Type
/* What it is: unknown is the type-safe counterpart to any. It represents a value whose type is not known at compile time, but unlike any, TypeScript forces you to perform type checks before you can operate on the value.

Behavior:
    - You can assign any value (string, number, object, etc.) to a variable of type unknown.
    - You cannot assign a value of type unknown to a variable of any other type (except any or unknown itself) without first narrowing its type (using type guards like typeof, instanceof) or using a type assertion.
    - You cannot access properties or call methods on a variable of type unknown without first narrowing its type or using a type assertion.

Pros:
    - Provides type safety for values whose types are genuinely unknown at compile time (e.g., data from APIs, user input, JSON.parse).
    - Forces developers to handle potential type errors explicitly.

Cons:
    - Requires extra code (type checks or assertions) to work with the value.
*/

// Example
let definitelyNotAny: unknown;

definitelyNotAny = 10; // OK
definitelyNotAny = "world"; // OK
definitelyNotAny = { name: "TS" }; // OK

// ---- Errors - Cannot use directly ----
// console.log(definitelyNotAny.toUpperCase()); // Error: Object is of type 'unknown'.
// let myStr: string = definitelyNotAny;        // Error: Type 'unknown' is not assignable to type 'string'.
// definitelyNotAny.someMethod();               // Error: Object is of type 'unknown'.

// ---- Safe usage with type checking ----
if (typeof definitelyNotAny === "string") {
	// Inside this block, TS knows definitelyNotAny is a string
	console.log(definitelyNotAny.toUpperCase()); // OK
	let myStr: string = definitelyNotAny; // OK
} else if (typeof definitelyNotAny === "number") {
	console.log(definitelyNotAny.toFixed(2)); // OK
} else if (definitelyNotAny instanceof Error) {
	console.error(definitelyNotAny.message); // OK
}

/* Recommendation: Prefer unknown over any when dealing with values of uncertain types. It maintains type safety by forcing you to check the type before use. */

// ------------------------------ Type Casting / Type Assertion
/* 
What it is: Type Assertion (often called Type Casting in other languages, though the mechanism is slightly different) is a way to tell the TypeScript compiler that you know the type of a variable better than it does. It doesn't perform any special runtime conversion or checking (usually); it's purely a compile-time instruction.
*/
// Syntax: There are two syntaxes:
// 1. as keyword (preferred, especially in .tsx files):
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// 2. Angle bracket syntax:
let someOtherValue: unknown = "this is a string";
let stringLength: number = (<string>someOtherValue).length;
// (Note: Angle bracket syntax clashes with JSX/TSX syntax, so as is generally recommended.)

/* 
Purpose:
    - To use properties or methods on a variable typed as unknown or any when you are certain about its actual runtime type.
    - To handle types from external sources (like DOM elements) where TypeScript might infer a broader type (e.g., HTMLElement) but you know it's a more specific one (e.g., HTMLInputElement).

Risks:
    - It's unsafe if you're wrong. If you assert a type that the value doesn't actually have at runtime, your code will likely crash or behave unexpectedly later on. The compiler trusts your assertion and won't prevent runtime errors resulting from incorrect assertions. 
*/

// Examples
// Example 1: Working with unknown
let dataFromApi: unknown = JSON.parse('{ "userId": 1, "title": "Learn TS" }');

// Assuming we KNOW the shape of the data
interface Todo {
	userId: number;
	title: string;
}

// Assert that dataFromApi is a Todo
let todoItem = dataFromApi as Todo;
console.log(todoItem.userId); // OK (if the assertion was correct)
console.log(todoItem.title); // OK (if the assertion was correct)

// Example 2: Working with the DOM
// const myInput = document.getElementById("myInput"); // Type is HTMLElement | null
const myInput = document.getElementById("myInput") as HTMLInputElement | null; // Assert specific type

if (myInput) {
	console.log(myInput.value); // OK, .value exists on HTMLInputElement
}

// Example 3: Incorrect Assertion (Leads to Runtime Error)
let val: unknown = 5;
// console.log((val as string).toUpperCase()); // Compiles OK, but CRASHES at runtime because 5 is not a string

/* 
  Recommendation: Use type assertions cautiously. Prefer type guards (typeof, instanceof, custom type guards) when possible, as they perform actual runtime checks. Use assertions only when you are absolutely certain about the type and type guards are impractical or impossible.

In Summary:
	- any: Opts out of type checking. Avoid it. Unsafe.
	- unknown: Represents an unknown type safely. Forces type checks or assertions before use. Prefer this over any. Safe.
	- Type Assertion (as / <>): Tells the compiler "trust me, I know the type." Bypasses compile-time checks for that specific operation. Use with caution, only when you're sure. Can be unsafe if misused.
*/
