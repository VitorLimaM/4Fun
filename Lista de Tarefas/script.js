// Seleção de elementos
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const clearAllButton = document.getElementById('clearAllButton');
const allFilter = document.getElementById('allFilter');
const activeFilter = document.getElementById('activeFilter');
const completedFilter = document.getElementById('completedFilter');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput');
const fileInput = document.getElementById('fileInput');
const themeToggle = document.getElementById('themeToggle');

// Função para adicionar tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;
    const file = fileInput.files[0];

    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${taskText} - Vencimento: ${dueDate || "Sem data"}`;

        if (file) {
            const fileIcon = document.createElement('span');
            fileIcon.textContent = '📎';
            taskItem.appendChild(fileIcon);
        }

        taskItem.classList.add(priority);

        // Marcar tarefa como concluída
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        // Remover tarefa
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', () => {
            taskItem.remove();
        });

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        taskInput.value = '';
        dueDateInput.value = '';
        fileInput.value = '';

        // Notificação
        if (Notification.permission === "granted") {
            new Notification("Tarefa adicionada", {
                body: taskText
            });
        }
    }
}

// Adicionar tarefa ao clicar no botão
addTaskButton.addEventListener('click', addTask);

// Adicionar tarefa ao pressionar Enter
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Limpar todas as tarefas
clearAllButton.addEventListener('click', () => {
    taskList.innerHTML = '';
});

// Filtros
function filterTasks(filter) {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');
        if (filter === 'all') {
            task.style.display = 'block';
        } else if (filter === 'active' && !isCompleted) {
            task.style.display = 'block';
        } else if (filter === 'completed' && isCompleted) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

allFilter.addEventListener('click', () => filterTasks('all'));
activeFilter.addEventListener('click', () => filterTasks('active'));
completedFilter.addEventListener('click', () => filterTasks('completed'));

// Alternar tema
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Verificar tema salvo
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Armazenamento e Sincronização Local
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('li');
    taskItems.forEach(item => {
        tasks.push({ 
            text: item.textContent, 
            completed: item.classList.contains('completed'),
            priority: item.classList[0],
            dueDate: item.textContent.match(/Vencimento: (\S+)/)?.[1] || null
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.textContent = `${task.text} - Vencimento: ${task.dueDate || "Sem data"}`;
            taskItem.classList.add(task.priority);
            if (task.completed) taskItem.classList.add('completed');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.addEventListener('click', () => {
                taskItem.remove();
            });

            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
        });
    }
}

loadTasks();
setInterval(saveTasks, 1000);
