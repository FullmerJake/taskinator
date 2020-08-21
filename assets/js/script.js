
//creates a new element in the HTML in browser when the eventListener is triggered.
var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');
var taskIdCounter = 0;
var pageContentEl = document.querySelector('#page-content');
var tasksInProgressEl = document.querySelector('#tasks-in-progress');
var tasksCompletedEl = document.querySelector('#tasks-completed');
var tasks = [];

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

    //checks to see if the formEl already has an ID
    var isEdit = formEl.hasAttribute('data-task-id');

    //has data attribute, so get task id and call function to complete edit process
    if(isEdit){
        var taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    //no data attribute, so create object as normal and pass to createTaskEl function
    else {
         //package up data as an object
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: 'to do'
        };

        //send it as an argument to createTaskEl
        //we've created an object and passed it to another function
        createTaskEl(taskDataObj);
    }
};

//called function from taskFormHandler function
var createTaskEl = function(taskDataObj){
    //create list item
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    //add task ID as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    listItemEl.setAttribute('draggable', 'true');
  
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

    //assigns the taskDataObj id property to the value of taskIdCounter
    taskDataObj.id = taskIdCounter;
    //pushes the object to the tasks array.
    tasks.push(taskDataObj);

    saveTasks();

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

var taskButtonHandler = function(event) {
    //get target element from even
    var targetEl = event.target;

    //IF EDIT BUTTON WAS CLICKED
    if (targetEl.matches('.edit-btn')){
        var taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    };
    //IF DELETE BUTTON WAS CLICKED
    //functions excecutes if i click on the element with a class of delete-btn
    if (event.target.matches('.delete-btn')){
        //the taskId variable is equal to the data-task-id attribute of whatever the target of the click is. 
        var taskId = event.target.getAttribute('data-task-id');
        //calls the function deleteTask and pass taskId as the arguement
        deleteTask(taskId);
    };
};

//ran in taskButtonHandler function
var deleteTask = function(taskId){
    //finds an element with the class of task-item and a data-task-id of taskID.
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create new array to hold updated list of tasks
    var updatedTaskArr  = [];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++){
        //if tasks[i].id doesn't match the value of taskId, let's keep that task and push it to the new array
        if (tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    saveTasks();
};

//ran in taskButtonHandler fucntion
var editTask = function(taskId){

    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector('#save-task').textContent = 'Save Task';
    formEl.setAttribute('data-task-id', taskId);

};

var completeEditTask = function(taskName, taskType, taskId){
    //find the matching task list
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector('h3.task-name').textContent = taskName;
    taskSelected.querySelector('span.task-type').textContent = taskType;

    //loop through tasks array and task object with new content
    for(var i = 0; i < tasks.length; i++){
        //each iteration of the loop, we are checking to see if that individual task's id property matches the taskId arguement we passed into the completeEditTask()
        //taskId is a string, and task[i].id is a number, so we have to convert taskId into an int to be able to compare. 
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskName;
            task[i].type = taskType;
        }
    };

    saveTasks();

    alert('Task Updated!');

    //resets the form by removing the task ID and changing the button text back to normal
    formEl.removeAttribute('data-task-id');
    document.querySelector('#save-task').textContent = 'Add Task';
};

var taskStatusChangeHandler = function(event){
    //get the task item's id
    var taskId = event.target.getAttribute('data-task-id');

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    //find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === 'to do'){
        tasksToDoEl.appendChild(taskSelected);
        // console.log(taskSelected);
    }
    else if (statusValue === 'in progress'){
        tasksInProgressEl.appendChild(taskSelected);
        // console.log(taskSelected);
    }
    else if (statusValue === 'completed'){
        tasksCompletedEl.appendChild(taskSelected);
        // console.log(taskSelected);
    }

    //update task's in task array
    for(var i = 0; i < tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
        }
    };

    saveTasks();
};

var dragTaskHandler = function(event){
    var taskId = event.target.getAttribute('data-task-id');
    //setData() takes 2 arguements. 1. data's format and 2. states the data's value. 
    event.dataTransfer.setData('text/plain', taskId);
    var getId = event.dataTransfer.getData('text/plain');
};

var dropZoneDragHandler = function(event){
    var taskListEl = event.target.closest('.task-list');
    if (taskListEl){
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed");
    };
    
};

var dropTaskHandler = function(event){
    var id = event.dataTransfer.getData('text/plain');
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest('.task-list');
    var statusType = dropZoneEl.id;
    //set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    
    if(statusType === 'tasks-to-do'){
        //selectedIndex is a new property tha allows us to set the display option in a list by specifying the option's 0-based position in the list. 
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === 'tasks-in-progress'){
        //by assigning a number to the index, we're selecting an option (from the drop down menu) that we want to display in the <select> element. 
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === 'tasks-completed') {
        statusSelectEl.selectedIndex = 2;
    }
    //removes the hover over styling element when not on top.
    dropZoneEl.removeAttribute("style");

    dropZoneEl.appendChild(draggableElement);
    //loop through tasks array to find and update the updated task's status

    for (var i = 0; i < tasks.length; i++){
         if (tasks[i].id === parseInt(id)){
             tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }

    saveTasks();
};

var dragLeaveHandler = function(event){
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl){
        taskListEl.removeAttribute("style");
    };
};

var saveTasks = function(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


// listens for a submit or enter key on the button DOM element, executes the taskFormHandler function. 
formEl.addEventListener('submit', taskFormHandler);
// listens for a click on the button DOM element, executes the taskButtonHandler function. 
pageContentEl.addEventListener('click', taskButtonHandler);
// listens for a status change, then excecutes taskStatusChangeHandler function.
pageContentEl.addEventListener('change', taskStatusChangeHandler);
//
pageContentEl.addEventListener('dragstart', dragTaskHandler);
//
pageContentEl.addEventListener('dragover', dropZoneDragHandler);
//
pageContentEl.addEventListener('drop', dropTaskHandler);
//
pageContentEl.addEventListener('dragleave', dragLeaveHandler);