const myself = 'pitju';
myself;
const button = document.querySelector('button');

function clickHandler(message: string) {
  console.log('Clicked' + message);
  button?.addEventListener('click', clickHandler.bind(null, 'Welcome'));
}
