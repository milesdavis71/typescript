"use strict";
<<<<<<< HEAD
window.addEventListener('load', function () {
    const counterContainer = document.querySelector('.count');
    let counter = 0;
    const btn = document.querySelector('button');
    btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function () {
        const text = document.querySelectorAll('p');
        for (let i = 0; i < text.length; i++) {
            text[i].innerHTML = '';
        }
        counter++;
        if (counterContainer) {
            counterContainer.insertAdjacentHTML('beforeend', `<p>${counter}</p>`);
        }
    });
});
// btn?.addEventListener('click', function (event) {
//   console.log(event.type);
// });
=======
const myself = 'pitju';
myself;
const button = document.querySelector('button');
<<<<<<< HEAD
=======
button === null || button === void 0 ? void 0 : button.addEventListener;
>>>>>>> 72451f13009285222964b24aafab662ef659fe99
>>>>>>> 39b77ed04a2f96a35863388ba1079b32c60a1ce7
