'use strict'
let book = document.querySelectorAll('.book'),
  books = document.querySelectorAll('.books'),
  body = document.querySelector('body'),
  adv = document.querySelectorAll('.adv'),
  ul = document.querySelectorAll('ul'),
  a = document.querySelectorAll('a'),
  threeBook = a[4].setAttribute('id','three_book'),
  twoBook = ul[0].setAttribute('id','two_book'),
  sixBook = ul[2].setAttribute('id','six_book'),
  fiveBook = ul[5].setAttribute('id','five_book'),
  eightChapter = document.createElement('li');

threeBook = document.querySelector('#three_book');
twoBook = document.querySelector('#two_book');
fiveBook = document.querySelector('#five_book');
sixBook = document.querySelector('#six_book');
let twoElem = document.querySelectorAll('#two_book > li'),
  fiveElem = document.querySelectorAll('#five_book > li'),
  sixElem = document.querySelectorAll('#six_book > li' );

body.setAttribute('style','background-image: url(./image/you-dont-know-js.jpg')
body.removeChild(adv[0]);
books[0].appendChild(book[1]);
books[0].appendChild(book[0]);
books[0].appendChild(book[4]);
books[0].appendChild(book[3]);
books[0].appendChild(book[5]);
books[0].appendChild(book[2]);
twoBook.appendChild(twoElem[0]);
twoBook.appendChild(twoElem[1]);
twoBook.appendChild(twoElem[3]);
twoBook.appendChild(twoElem[6]);
twoBook.appendChild(twoElem[8]);
twoBook.appendChild(twoElem[4]);
twoBook.appendChild(twoElem[5]);
twoBook.appendChild(twoElem[7]);
twoBook.appendChild(twoElem[9]);
twoBook.appendChild(twoElem[2]);
twoBook.appendChild(twoElem[10]);
fiveBook.appendChild(fiveElem[0]);
fiveBook.appendChild(fiveElem[1]);
fiveBook.appendChild(fiveElem[9]);
fiveBook.appendChild(fiveElem[3]);
fiveBook.appendChild(fiveElem[4]);
fiveBook.appendChild(fiveElem[2]);
fiveBook.appendChild(fiveElem[6]);
fiveBook.appendChild(fiveElem[7]);
fiveBook.appendChild(fiveElem[5]);
fiveBook.appendChild(fiveElem[8]);
fiveBook.appendChild(fiveElem[10]);
sixBook.insertBefore(eightChapter, sixElem[9]);
eightChapter.textContent = 'Глава 8: За пределами ES6';

threeBook.textContent = 'Книга 3. this и Прототипы Объектов';

