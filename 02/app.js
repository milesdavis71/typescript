function add(n1, n2, showResult, phase) {
    var result = n1 + n2;
    if (showResult) {
        console.log(phase + result);
    }
    else {
        return result;
    }
}
var number1 = 6;
var number2 = 5.8;
var printResult = true;
var resultPhrease = "Result is: ";
var text1 = "huhu";
var text2 = "haha";
var text3 = "hihi";
console.log(text1 + text2 + text3);
add(number1, number2, printResult, resultPhrease);
