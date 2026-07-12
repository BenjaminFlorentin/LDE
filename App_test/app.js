// ============================================================
// Ma To-do - logique de l'app
// Stockage : localStorage (persistant, propre au navigateur)
// ============================================================

const STORAGE_KEY = 'todo.tasks.v1';

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');

let tasks = loadTasks();

function loadTasks() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
    list.innerHTML = '';

    if (tasks.length === 0) {
        emptyState.hidden = false;
        return;
    }
    emptyState.hidden = true;

    for (const task of tasks) {
        const li = document.createElement('li');
        li.className = 'task' + (task.done ? ' done' : '');
        li.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.setAttribute('aria-label', 'Marquer comme fait');
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const text = document.createElement('span');
        text.className = 'text';
        text.textContent = task.text;

        const del = document.createElement('button');
        del.className = 'delete';
        del.setAttribute('aria-label', 'Supprimer la tâche');
        del.textContent = '×';
        del.addEventListener('click', () => deleteTask(task.id));

        li.append(checkbox, text, del);
        list.append(li);
    }
}

function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    tasks.unshift({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        text: trimmed,
        done: false,
        createdAt: Date.now()
    });
    saveTasks();
    render();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.done = !task.done;
    saveTasks();
    render();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(input.value);
    input.value = '';
    input.focus();
});

render();
