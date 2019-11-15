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
      let newElt;
     
      
      let hit = '';
      hit = this.selector;
     
      if (hit[0] === '.'){
        let cls = '';
        newElt = document.createElement('div');
        for (let i = 1; i < hit.length; i++){
          cls += hit[i];
        };
        newElt.className = cls;
        
      };
      if (hit[0] === '#'){
        let ind = '';
        newElt = document.createElement('p');
        for (let i = 1; i < this.selector.length; i++){
          ind +=  this.selector[i];
        };
        
        newElt.id = ind;
       
      };
      let styleList = 'width: ' + this.width + '; height: ' + this.height + '; background: ' + this.bg + '; font-size: ' + this.fontSize + ';'
      
      newElt.style.cssText = styleList;
      
      return newElt;

    };
  };
  
  let swap = new DomElement('#begin', {width: '300px', height: '100px', bg: 'green', fontSize: '32px'});
  
  let begin = swap.getSelector();
  
  begin.textContent = 'Какой же ты сложный, JS!!! )))';
  
  document.body.append(begin);
  
// });

