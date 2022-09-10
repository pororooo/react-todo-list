const addTaskBtn = document.getElementById('add-task-btn'); //button add
const descTaskInput = document.getElementById('description-task'); //input
const toDosWrapper = document.querySelector('.todos-wrapper'); //all tasks

//example of task as an object
// const task = {
//     description: 'work out',
//     completed: false
// }

let tasks;
//if tasks in localstorage is empty => tasks = []
//else => 
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks')); // checks if locaal storage is empty or not

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}
// template for tasks
const createTemplate = (task, index) => {
    return `
    <div class="todo-item ${task.completed ? 'checked' : ''}">
        <div class="description">${task.description}</div>
        <div class="buttons">
            <input onclick="completeTask(${index})" type="checkbox" class="btn-complete" ${task.completed ? 'checked' : ''}>
            <button onclick="deleteTask(${index})" class="btn-delete">delete</button>
    </div>
</div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks]
}

//form sdynamic list with function createTemplate
const fillHtmlList = () => {
    toDosWrapper.innerHTML = ""; //clean wrap before
    if(tasks.length > 0){//checkout if array is empty or not
        filterTasks(); 
        tasks.forEach((item, index) => {
            toDosWrapper.innerHTML += createTemplate(item, index); 
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

//update localStorage
const updatelocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed; //changes taks value to an opposite
    if(tasks[index].completed){
        todoItemElems[index].classList.add('checked');
    }else{
        todoItemElems[index].classList.remove('checked');
    }
    updatelocal();
    fillHtmlList();
}

const deleteTask = (index) => {
    todoItemElems[index].classList.add('delition')
     setTimeout(() => {
        tasks.splice(index, 1);
        updatelocal();
        fillHtmlList();
     }, 500)

}

//using eventListener and button we're creatin object
addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(descTaskInput.value));
    updatelocal();
    fillHtmlList();
    descTaskInput.value = '';
})