function combine(input1, input2, resultConversion) {
    var result;
    if (typeof input1 === 'number' &&
        typeof input2 === 'number' &&
        resultConversion === 'as-number') {
        result = input1 + input2;
    }
    else {
        (result = input1.toString() + input2.toString()),
            resultConversion === 'as-text';
    }
    return result;
}
var combinedNumbers = combine(6, 30, 'as-number');
console.log(combinedNumbers);
var combinedNames = combine('pitju', 'jaki', 'as-number');
console.log(combinedNames);
