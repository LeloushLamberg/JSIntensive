// document.addEventListener('DOMContentLoaded', function(){
  'use strict';
  function DomElement(selector, style){
    this.selector = selector; 
    this.style = style || {};

    this.width = style.width;
    this.height = style.height; 
    this.bg = style.bg;
    this.fontSize = style.fontSize;
    this.getSelector = function(){
      if (this.selector.indexOf('.', 0)){
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', this.selector);
        
      };
      if (this.selector.indexOf('#', 0)){
        let newDiv = document.createElement('div');
        newDiv.setAttribute('id', this.selector);
      };
      selector.style.cssText = 'width: ' + this.width + '; height: ' + this.height + '; bacground: ' + this.bg + '; font-size: ' + this.fontSize + ';'
    };
  };
  
  let begin = new DomElement('.begin', {width: '300', height: '100', bg: 'green', fontSize: '16px'});
  begin.textContent = 'да здравствует js!!! )))';
  // this.getSelector;
  document.body.append(begin);
  console.log(begin)
// });

