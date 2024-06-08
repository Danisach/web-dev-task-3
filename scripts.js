document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('task-form').addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    
    const task = {
        text: taskInput.value,
        priority: prioritySelect.value,
        status: 'pending'
    };
  
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    displayTasks(); 
}

$(function() {
    $("#task-list").sortable();
  });

function displayTasks() {
    const tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
          li.setAttribute("class", "draggable");
        li.innerHTML = `
            <span><img src="./Icons/drag.png" /></span>
            <span>${task.text} (${task.priority})</span>
            <span>
                <button class="edit" onclick="editTask(${index})">Edit</button> 
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
                <button class="complete" onclick="completeTask(${index})">${task.status === 'completed' ? 'Completed' : 'Pending'}</button>
            </span>
        `;
        taskList.appendChild(li);
       
    });
}

function editTask(index) {
    let tasks = getTasksFromLocalStorage();
    const newTaskText = prompt('Edit the task:', tasks[index].text);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        tasks[index].text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

function deleteTask(index) {
    let tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function completeTask(index) {
    let tasks = getTasksFromLocalStorage();
    tasks[index].status = tasks[index].status === 'completed' ? 'pending' : 'completed';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function loadTasks() {
    displayTasks();
}

function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}