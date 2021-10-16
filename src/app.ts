function Logger(logString: string) {
  console.log('1. Függvényhívást naplózó dekorátor gyár bekapcsolva.');
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function RenderMarkup(markup: string, hookId: string) {
  return function (constructor: any) {
    console.log('2. Renderelő dekorátor gyár bekapcsolva.');
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = markup;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}
// @Logger('LOGGING – PERSON')
@Logger(
  '4. A person példány létrejötte naplózva. A logger dekorátorból elérhető az osztály is (ezalatt).'
)
@RenderMarkup('<h1>Huhu Pitju<h2>', 'app')
class Person {
  name = 'Pitju';
  constructor() {
    console.log('3. A Person class konstruktora létrehoz egy person példányt');
  }
}

const pers = new Person();
console.log(pers);

function Log(target: any, propertyName: string | symbol) {
  console.log('Property dekorátor lefut.');
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;

  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Az ár csak pozitív szám lehet.');
    }
  }
  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}
