function Logger(logString: string) {
  console.log('1. Függvényhívást naplózó dekorátor gyár bekapcsolva.');
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function RenderMarkup(markup: string, hookId: string) {
  console.log('2. Renderelő dekorátor gyár bekapcsolva.');
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = markup;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
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

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('Method decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
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

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}
