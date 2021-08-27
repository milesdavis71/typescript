function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Az eredmény' + num);
    return;
}
function addAndHandle(n1, n2, cb) {
    var result = n1 + n2;
    cb(result);
}
printResult(add(5, 12));
var combineValues;
combineValues = add;
console.log('huhu' + combineValues(8, 8));
addAndHandle(10, 20, function (result) {
    console.log('huhu' + result);
});
