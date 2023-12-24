function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value !== '') {
        var task = document.createElement('li');
        var taskId = 'task_' + Date.now();

        task.setAttribute('id', taskId);
        task.appendChild(document.createTextNode(taskInput.value));

        var deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('Удалить'));
        deleteButton.setAttribute('onclick', 'deleteTask("' + taskId + '")');

        task.appendChild(deleteButton);
        taskList.appendChild(task);

        // Сохраняем задачу в LocalStorage
        localStorage.setItem(taskId, taskInput.value);

        taskInput.value = '';
    }
}

function deleteTask(taskId) {
    var task = document.getElementById(taskId);

    // Удаляем задачу из LocalStorage
    localStorage.removeItem(taskId);

    // Удаляем задачу из списка на странице
    task.parentNode.removeChild(task);
}

function clearLocalStorage() {
    // Очищаем LocalStorage
    localStorage.clear();

    // Удаляем все задачи из списка на странице
    document.getElementById('taskList').
        innerHTML = '';
}

// Восстановление задач из LocalStorage при загрузке страницы
window.onload = function () {
    var taskList = document.getElementById('taskList');

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);

        if (key.includes('task_')) {
            var task = document.createElement('li');
            var taskId = key;

            task.setAttribute('id', taskId);
            task.appendChild(document.createTextNode(localStorage.getItem(key)));

            var deleteButton = document.createElement('button');
            deleteButton.appendChild(document.createTextNode('Удалить'));
            deleteButton.setAttribute('onclick', 'deleteTask("' + taskId + '")');

            task.appendChild(deleteButton);
            taskList.appendChild(task);
        }
    }
};