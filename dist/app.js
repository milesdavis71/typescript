"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(logString) {
    console.log('1. Függvényhívást naplózó dekorátor gyár bekapcsolva.');
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function RenderMarkup(markup, hookId) {
    return function (constructor) {
        console.log('2. Renderelő dekorátor gyár bekapcsolva.');
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = markup;
            hookEl.querySelector('h1').textContent = p.name;
        }
    };
}
// @Logger('LOGGING – PERSON')
let Person = class Person {
    constructor() {
        this.name = 'Pitju';
        console.log('3. A Person class konstruktora létrehoz egy person példányt');
    }
};
Person = __decorate([
    Logger('4. A person példány létrejötte naplózva. A logger dekorátorból elérhető az osztály is (ezalatt).'),
    RenderMarkup('<h1>Huhu Pitju<h2>', 'app')
], Person);
const pers = new Person();
console.log(pers);
function Log(target, propertyName) {
    console.log('Property dekorátor lefut.');
    console.log(target, propertyName);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Az ár csak pozitív szám lehet.');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
//# sourceMappingURL=app.js.map