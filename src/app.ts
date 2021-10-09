// const names: Array<string> = []; // string[]
// names[0].split(' ');

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done!');
//   }, 2000);
// });

// promise.then(data => {
//   data.split(' ');
// });

// proba

function merge(objA: object, objB: object): object {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: 'Max' }, { age: 30 });
mergeObj.age;
