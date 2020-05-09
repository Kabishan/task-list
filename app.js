const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

eventListeners();

function eventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
  document.addEventListener('DOMContentLoaded', getTasks);
}

function getTasks() {
  let tasks;

  if (localStorage.getItem('tasks') === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    const link = document.createElement('a');

    li.className = 'collection-item blue-grey lighten-5';
    li.appendChild(document.createTextNode(task));
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === '' || isDuplicate(taskInput.value))
    alert('Please add a valid task (no duplicates or empty tasks)');

  const li = document.createElement('li');
  const link = document.createElement('a');

  li.className = 'collection-item blue-grey lighten-5';
  li.appendChild(document.createTextNode(taskInput.value));
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);
  taskList.appendChild(li);
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = '';

  e.preventDefault();
}

function isDuplicate(text) {
  let duplicate = false;

  document.querySelectorAll('.collection-item').forEach(function (task) {
    if (task.firstChild.textContent === text) duplicate = true;
  });

  return duplicate;
}

function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  const deleteItem = e.target.parentElement;
  const task = deleteItem.parentElement;
  const text = task.firstChild.textContent;

  if (
    deleteItem.classList.contains('delete-item') &&
    confirm(`Are you sure you want to delete task "${text}"?`)
  ) {
    task.remove();
    removeTaskFromLocalStorage(text);
  }
}

function removeTaskFromLocalStorage(text) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.forEach(function (task, index) {
    if (task === text) tasks.splice(index, 1);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Using a while loop is faster than taskList.innerHTML = '';
function clearTasks(e) {
  while (taskList.firstChild) taskList.removeChild(taskList.firstChild);

  clearTasksFromLocalStorage();

  e.preventDefault();
}

function clearTasksFromLocalStorage() {
  localStorage.removeItem('tasks');
}

function filterTasks(e) {
  const filter = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(filter) != -1) task.style.display = 'block';
    else task.style.display = 'none';
  });
}
