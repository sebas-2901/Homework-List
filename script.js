// Array 
let tasks = [];

//Elementos del DOM
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');

//Cargar tareas desde el localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  tasks = savedTasks ? JSON.parse(savedTasks) : [];
}

//Guardar tareas en el localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Renderizar la lista de tareas
function renderTasks() {
  taskList.innerHTML = tasks
    .map(
      (task, index) => `
      <li class="task-item ${task.completed ? 'completed' : ''}" data-index="${index}">
        <span>${task.name}</span>
        <div class="buttons">
          <button class="toggle-btn">${task.completed ? 'Desmarcar' : 'Completar'}</button>
          <button class="delete-btn">Eliminar</button>
        </div>
      </li>
    `
    )
    .join('');
}

// Agregar una nueva tarea
function addTask(taskName) {
  if (taskName.trim() === '') {
    alert('Por favor, escribe una tarea.');
    return;
  }

  tasks.push({ name: taskName.trim(), completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
}

// Manejo clicks en la lista de tareas (delegación de eventos)
function handleTaskListClick(e) {
  const taskItem = e.target.closest('.task-item');
  if (!taskItem) return;

  const index = taskItem.dataset.index;
  if (e.target.classList.contains('toggle-btn')) {
    // Alternar el estado de completado
    tasks[index].completed = !tasks[index].completed;
  } else if (e.target.classList.contains('delete-btn')) {
    // Eliminar la tarea
    tasks.splice(index, 1);
  }

  saveTasks();
  renderTasks();
}

// Inicializar la aplicación
function init() {
  loadTasks();
  renderTasks();

  addTaskBtn.addEventListener('click', () => addTask(taskInput.value));
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask(taskInput.value);
  });
  taskList.addEventListener('click', handleTaskListClick);
}

// Llamar a la función de inicialización
init();
