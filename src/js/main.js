'use strict'

// Находим элементы
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const submitBtn = document.querySelector('.btn')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(task => renderTask(task))
}

checkEmptyList()

form.addEventListener('submit', addTask)
    
tasksList.addEventListener('click', deleteTask)

tasksList.addEventListener('click', doneTask)


// функции
function addTask(event) {
    event.preventDefault()

    const taskText = taskInput.value

    //Описание задачи в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    // добавление задачи в массив задач
    tasks.push(newTask)

    // Сохранение в localStorage
    saveHTMLtoLS()

    renderTask(newTask)

    // Очистка поля ввода, возвращение фокуса
    taskInput.value = ""
    taskInput.focus()

    checkEmptyList()
}

function deleteTask(event) {

    // Проверяем, если клик был НЕ по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') return 

    // Проверяем, если клик был по кнопке "удалить задачу"
    const parentNode = event.target.closest('.list-group-item')

    // Определяем ID задачи
    const id = Number(parentNode.id)

    // Удаление задачи через фильтрацию массива
    tasks = tasks.filter(task => task.id !== id)

    // Сохранение в localStorage
    saveHTMLtoLS()

    // Удаляем задачу
    parentNode.remove()

    checkEmptyList()
}

function doneTask(event) {

    // Проверяем, если клик был НЕ по кнопке "задача выполнена"
    if (event.target.dataset.action !== 'done') return 

    // Проверяем, если клик был по кнопке "задача выполнена"
    const parentNode = event.target.closest('.list-group-item')
    const id = Number(parentNode.id)
    const task = tasks.find(task => task.id === id)
    task.done = !task.done

    // Сохранение в localStorage
    saveHTMLtoLS()

    const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')

} 

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
                    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                    <div class="empty-list__title">Список дел пуст</div>
                </li>`

        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null
    }

}

function saveHTMLtoLS() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title"
    const taskHtml = `
        <li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>`
    // добавление задачи на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHtml)
}

submitBtn.style.backgroundColor = '#f77f00'
submitBtn.style.borderColor = '#f77f00'
































