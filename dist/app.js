'use strict';
var e1 = {
  name: 'Max',
  privileges: ['create server'],
  startDate: new Date(),
};
function add(a, b) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
var result = add('Max', 'Schwarz');
result.split(' ');
console.log(result);
console.log(typeof result);
function moveAnimal(animal) {
  var speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed + ' km/h');
}
moveAnimal({ type: 'bird', flyingSpeed: 100 });
var userInputElement = document.getElementById('huhu');
if (userInputElement) userInputElement.value = 'Helló belló';
var errorBag = {
  email: 'Not a valid email',
  username: 'Must start with a capital character',
};
//# sourceMappingURL=app.js.map
// proba
