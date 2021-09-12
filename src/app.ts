const add = (a: number, b: number = 7) => a + b;

// const printOutput = (output: string | number) => console.log(output);

const printOutput: (a: string | number) => void = output => console.log(output);

printOutput(add(5));
