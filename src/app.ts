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

function Autobind(
  _: any,
  _2: string | Symbol | number,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const bindFn = originalMethod.bind(this);
      return bindFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = 'Működik';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
const printer = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', printer.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validateTableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};
function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    // javítva a külöm megadott hibajavítás alapján
    [propName]: [
      ...registeredValidators[target.constructor.name][propName],
      'reuqired',
    ],
  };
}
function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    // javítva a külöm megadott hibajavítás alapján
    [propName]: [
      ...registeredValidators[target.constructor.name][propName],
      'reuqired',
    ],
  };
}
function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          return !!obj[prop];
        case 'positive':
          return obj[prop] > 0;
      }
    }
  }
  return true;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}
const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value;
  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Helytelen beviteli adat, próbálja újra.');
  }

  console.log(createdCourse);
});
