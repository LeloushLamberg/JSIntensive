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
      let hit = '';
      hit = this.selector;
     
      if (hit[0] === '.'){
        let cls = '';
        
        for (let i = 1; i < hit.length; i++){
          cls += hit[i];
        };
        newDiv.className = cls;
        
      };
      if (hit[0] === '#'){
        let ind = '';
        for (let i = 1; i < this.selector.length; i++){
          ind +=  this.selector[i];
        };
        
        newDiv.id = ind;
       
      };
      let styleList = 'width: ' + this.width + '; height: ' + this.height + '; background: ' + this.bg + '; font-size: ' + this.fontSize + ';'
      
      newDiv.style.cssText = styleList;
      
      return newDiv;

    };
  };
  
  let swap = new DomElement('.begin', {width: '300px', height: '100px', bg: 'green', fontSize: '32px'});
  
  let begin = swap.getSelector();
  
  begin.textContent = 'Какой же ты сложный, JS!!! )))';
  
  document.body.append(begin);
  
// });

