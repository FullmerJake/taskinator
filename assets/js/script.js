//creates a new element in the HTML in browser when the eventListener is triggered.

var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');



var createTaskHandler = function (){

    //stops the browser from refreashing immediately after the form is submitted. 
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //the DOM creates an object of the select dropdown menu. when you select one of them, the value becomes that. This pulls that value. 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
  
    //create list item
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement('div');
    //give it a class name
    taskInfoEl.className = 'task-info';
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);
    //add entire list item to list
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