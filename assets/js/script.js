// this assigns the variable buttonEl to the value of the html DOM object 
// this also optimizes performance, because instead of having to search the document and query select, you've assigned the variable at the 
// beginning.

// var buttonEl now represents the same button element from the html. 
// the 'El' suffix identifies this as a DOM element. 
var buttonEl = document.querySelector('#save-task');
console.log(buttonEL);