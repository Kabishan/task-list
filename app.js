const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

eventListeners();

function eventListeners() {
  form.addEventListener('submit', addTask);
}

function addTask(e) {
  if (taskInput.value === '') alert('Add a task');
  else {
    const li = document.createElement('li');
    const link = document.createElement('a');

    li.className = 'collection-item blue-grey lighten-5';
    li.appendChild(document.createTextNode(taskInput.value));
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskList.appendChild(li);
  }

  taskInput.value = '';

  e.preventDefault();
}
