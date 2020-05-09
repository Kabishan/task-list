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
}

function addTask(e) {
  if (taskInput.value === '' || isDuplicate(taskInput.value))
    alert('Please add a valid task (no duplicates or empty tasks)');
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

function isDuplicate(text) {
  let duplicate = false;

  document.querySelectorAll('.collection-item').forEach(function (task) {
    if (task.firstChild.textContent === text) duplicate = true;
  });

  return duplicate;
}

function removeTask(e) {
  const deleteItem = e.target.parentElement;
  const task = deleteItem.parentElement;
  const text = task.firstChild.textContent;

  if (
    deleteItem.classList.contains('delete-item') &&
    confirm(`Are you sure you want to delete task "${text}"?`)
  )
    task.remove();
}

// Using a while loop is faster than taskList.innerHTML = '';
function clearTasks(e) {
  while (taskList.firstChild) taskList.removeChild(taskList.firstChild);
  e.preventDefault();
}

function filterTasks(e) {
  const filter = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(filter) != -1) task.style.display = 'block';
    else task.style.display = 'none';
  });
}
