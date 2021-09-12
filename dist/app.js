"use strict";
// const add = (a: number, b: number = 7) => a + b;
// const printOutput = (output: string | number) => console.log(output);
const printOutput = output => console.log(output);
// printOutput(add(5));
const sport = ['foci', 'hoki', 'sí'];
const sportTobb = ['darts', 'teke'];
const [a, b, c, ...others] = [...sport, ...sportTobb];
console.log(a, b, c, others);
const add = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);
//# sourceMappingURL=app.js.map