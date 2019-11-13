// document.addEventListener('DOMContentLoaded', function(){
  'use strict';
  function DomElement(selector, options){
    this.selector = selector; 
    this.options = options || {};

    this.width = options.width;
    this.height = options.height; 
    this.bg = options.bg;
    this.fontSize = options.fontSize;
    this.getSelector = function(){
      let newDiv;
      newDiv = document.createElement('div');
      
      if (this.selector.indexOf('.', 0)){
       
        newDiv.setAttribute('class', this.selector);
        return newDiv;
      };
      if (this.selector.indexOf('#', 0)){
        
        newDiv.setAttribute('id', this.selector);
        return newDiv;
      };
      let styleList = 'width: ' + this.width + '; height: ' + this.height + '; bacground: ' + this.bg + '; font-size: ' + this.fontSize + ';'
      console.log(styleList);
      newDiv.style.cssText = styleList;
      return newDiv;
    };
  };
  
  let swap = new DomElement('.begin', {width: '300px', height: '100px', bg: 'green', fontSize: '16px'});
  
  let begin = swap.getSelector();
  begin.textContent = 'Какой же ты сложный, JS!!! )))';
  
  document.body.append(begin);
  
// });

