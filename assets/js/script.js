//creates a new element in the HTML in browser when the eventListener is triggered.

var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector('#tasks-to-do');



var createTaskHandler = function (){
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent = 'This is a new task';
    tasksToDoEl.appendChild(listItemEl);
};

// listens for a click on the button DOM element, executes the createTaskHandler function. 
buttonEl.addEventListener('click', createTaskHandler);

var createTaskHandler = function (){
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent = 'This is a new task';
    tasksToDoEl.appendChild(listItemEl);
};