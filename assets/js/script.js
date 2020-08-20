
//creates a new element in the HTML in browser when the eventListener is triggered.
var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');
var taskIdCounter = 0;

var taskFormHandler = function (){

    //stops the browser from refreashing immediately after the form is submitted. 
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    //the DOM creates an object of the select dropdown menu. when you select one of them, the value becomes that. This pulls that value. 
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //check if input values are empty strings
    // !something checks to see if the variable is empty by asking if it's a falsy value.
    // checks for false values instead of true ones. 
    // "if either one or both of the variables are NOT true, proceed"
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();


    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    //we've created an object and passed it to another function
    createTaskEl(taskDataObj);

};

var createTaskEl = function(taskDataObj){
    //create list item
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    //add task ID as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
  
    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement('div');
    //give it a class name
    taskInfoEl.className = 'task-info';
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    listItemEl.appendChild(taskInfoEl);

    var taskActionEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId){
    //createElement creates a new dynamic element in the DOM. (lets you make new HTML elements outside of the file itself)
    var actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    //create edit button
    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn edit-btn';
    editButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(editButtonEl);

    //create delete button
    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn delete-btn';
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    //add the dropdown element
    var statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);

    //creates an array that the for loop while cycle through in order to add all of the options to the drop down menu. 
    var statusChoices = ['To do', 'In Progress', 'Completed'];
    for(var i= 0; i < statusChoices.length; i++){
        //create option element
        var statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);

        // append to select

        statusSelectEl.appendChild(statusOptionEl);
    };

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

// listens for a click on the button DOM element, executes the taskFormHandler function. 
formEl.addEventListener('submit', taskFormHandler);

var taskFormHandler = function (){
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent = 'This is a new task';
    tasksToDoEl.appendChild(listItemEl);
};