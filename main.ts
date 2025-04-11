// The differences between arrays and tuples
/* The core difference lies in the type annotation (number[] vs. [number, number]) and what it implies about the structure and intended use of the array. */

// Array
const coord: number[] = [1, 2];
coord[0] = 5; // OK: Changing an existing element to another number
coord.push(3); // OK: Adding another number (coord is now [5, 2, 3])
// coord = [4, 5, 6]; // Error: Cannot assign to 'coord' because it is a constant.
console.log(coord.length); // Can be 2, 3, or any other number after modifications
console.log(coord[2]); // Accessing index 2 is okay now (value is 3)
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
let direction: [number, number] = [1, 2];
direction[0] = 5; // OK: Changing an existing element to another number at a defined position
direction.push(3); // TS Error (or strongly discouraged): Argument of type '3' is not assignable to parameter of type 'undefined'. Property 'push' does not exist on type '[number, number]' (Modern TS might prevent this better). Even if it worked at runtime due to JS arrays, it violates the tuple's fixed-length contract.
direction[2] = 3; // TS Error: Tuple type '[number, number]' of length '2' has no element at index '2'.
direction = [4, 5]; // Error: Cannot assign to 'direction' because it is a constant.
direction = [4, 5, 6]; // Error: Source has 3 element(s) but target allows only 2. Also const error.

console.log(direction.length); // TypeScript knows this is exactly 2
console.log(direction[0]); // Known to be a number
console.log(direction[1]); // Known to be a number
// console.log(direction[2]); // TS Error: Tuple type '[number, number]' of length '2' has no element at index '2'.
/* 
const direction: [number, number] = [1, 2];

    Type: [number, number] signifies a Tuple Type.

    Meaning: This declares direction as an array with a fixed structure: it must have exactly two elements, and both the first and second elements must be numbers.

    Length: The type [number, number] enforces a fixed length of 2. TypeScript knows this precisely.

    Strictness: TypeScript provides stronger guarantees about the elements and length.
    ```typescript
    const direction: [number, number] = [1, 2];
*/

/* 
    Use Case: Best for representing structures where the position of an element has specific meaning and the number of elements is fixed (e.g., coordinates (x, y), RGB color values [r, g, b], key-value pairs [string, number], return values from functions that logically return multiple distinct things).

Summary Table:
Feature	const coord: number[] = [1, 2];	const direction: [number, number] = [1, 2];
-Type -	Array (number[]) ||	Tuple ([number, number])
-Length -	Variable (not fixed by type) ||	Fixed (exactly 2, enforced by type)
-Element Types -	All elements must be number ||	Element at index 0 must be number, Element at index 1 must be number
Strictness	Less strict about length/indices	More strict about length/indices
Compile Check	Allows accessing potentially undefined indices (e.g., coord[2] initially)	Errors if accessing index outside defined range (e.g., direction[2])
-Mutability -	Array contents can be modified (add/remove elements)  ||	Tuple elements can be modified, but adding/removing violates the type contract (may error or be discouraged)
Intention	A list of numbers	A fixed structure of exactly two numbers

In essence: Use number[] for lists of numbers, and [number, number] (or other tuple types) for fixed structures where element position matters. The tuple provides more type safety regarding the array's shape.
*/
