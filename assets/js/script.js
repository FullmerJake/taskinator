//creates a new element in the HTML in browser when the eventListener is triggered.

var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');



var createTaskHandler = function (){

    //stops the browser from refreashing immediately after the form is submitted. 
    event.preventDefault();

    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent = 'This is a new task';
    tasksToDoEl.appendChild(listItemEl);

};

// listens for a click on the button DOM element, executes the createTaskHandler function. 
formEl.addEventListener('submit', createTaskHandler);

var createTaskHandler = function (){
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent = 'This is a new task';
    tasksToDoEl.appendChild(listItemEl);
};