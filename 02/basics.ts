function add(n1: number, n2: number, showResult: boolean, phase: string) {
  const result = n1 + n2;
  if (showResult) {
    console.log(phase + result);
  } else {
    return result;
  }
}

let number1: number;
number1 = "6";
const number2 = 5.8;
const printResult = true;
const resultPhrease = "Result is: ";
add(number1, number2, printResult, resultPhrease);
