document.getElementById('btn').addEventListener('click', addTasks);
let tasksList = document.getElementById('tasks');
function addTasks(e) {
    let newTask = this.previousElementSibling.value;
    if (newTask == '') {
        alert('Please write a task');
    }
    else {
        let listElement = document.createElement('li');
        listElement.innerText = newTask + " ";
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        listElement.appendChild(link);
        tasksList.appendChild(listElement);
        saveInLocalStorage(newTask);
        this.previousElementSibling.value = '';
    }
    e.preventDefault();
}

document.getElementById('deleteTasks').addEventListener('click', deleteTasks);
function deleteTasks() {
    if (confirm('This will delete all tasks. Are you sure?')) {
        tasksList.innerHTML = '';
        localStorage.clear();
    }
        
}

tasksList.addEventListener('click', deleteTask);
function deleteTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm('Are you sure?')) {
            let parent = e.target.parentElement;
            parent.remove()
            removeFromLocalStorage(parent);
        }
    }
}

document.getElementById('filter').addEventListener('keyup', deleteFiltered);
function deleteFiltered(e) {
    let matcher = e.target.value.toLowerCase();
    let tasksList = document.querySelectorAll('li');
    tasksList.forEach(task => {
        let elem = task.firstChild.textContent;
        if (elem.toLowerCase().indexOf(matcher) == -1) {
            task.style.display = 'none';
        }
        else {
            task.style.display = 'block';
        }
    })
}

function saveInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', getTasks);
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let listElement = document.createElement('li');
        listElement.innerText = task + " ";
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        listElement.appendChild(link);
        tasksList.appendChild(listElement);
    })
}

function removeFromLocalStorage(deleteTask) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    console.log(deleteTask);
    deleteTask.removeChild(deleteTask.lastChild);
    console.log(deleteTask.textContent);
    tasks.forEach((task,index) => {
        if (deleteTask.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}