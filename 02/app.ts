// BASICS

// function add(n1: number, n2: number, showResult: boolean, phase: string) {
//   const result = n1 + n2;
//   if (showResult) {
//     console.log(phase + result);
//   } else {
//     return result;
//   }
// }

// const number1 = 6;
// const number2 = 5.8;
// const printResult = true;
// const resultPhrease = "Result is: ";
// add(number1, number2, printResult, resultPhrease);

// UNION, ALIASES
// type Combinable = number | string;
// type ConversionDescriptor = 'as-number' | 'as-text';

// function combine(
//   input1: Combinable,
//   input2: Combinable,
//   resultConversion: ConversionDescriptor
// ) {
//   let result;
//   if (
//     typeof input1 === 'number' &&
//     typeof input2 === 'number' &&
//     resultConversion === 'as-number'
//   ) {
//     result = input1 + input2;
//   } else {
//     result = input1.toString() + input2.toString();
//   }
//   return result;
// }

// const combinedNumbers = combine(6, 30, 'as-number');
// console.log(combinedNumbers);

// const combinedNames = combine('pitju', 'jaki', 'as-text');
// console.log(combinedNames);

// ENUMS
// enum Role {
//   ADMIN,
//   READ_ONLY,
//   AUTHOR,
// }
// const person = {
//   name: 'pitju',
//   age: 50,
//   hobbies: ['basketball', 'skateboard'],
//   role: Role.ADMIN,
// };
// let favoriteActivities: string[];
// favoriteActivities = ['basketball', 'skateboard'];
// console.log(person.name);
// for (const hobby of person.hobbies) {
//   // console.log(hobby.map()); ERROR
// }
// console.log(Role.ADMIN);

function add2(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): undefined {
  console.log('Az eredmény' + num);
  return;
}
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printResult(add2(5, 12));
let combineValues: (a: number, b: number) => number;

combineValues = add2;
console.log('huhu' + combineValues(8, 8));

addAndHandle(10, 20, result => {
  console.log('huhu' + result);
  return result;
});
