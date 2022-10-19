import sortDates from "./modules/sortDates.js";
// Protegiendo el codigo para que el usuario no puede acceder a el
(() => {


    const templateTask = document.getElementById('templateTask').content;
    const inputTask = document.querySelector('[data-form-input-text]');
    const inputDate = document.getElementById('inputDate');
    const listContainer = document.querySelector('.cardsList');
    const btnCreate = document.querySelector('[data-form-btn]');
    let taskIdNumber = 0;

    const createTask = ({ text, date, complete, taskId } = {}) => {
        taskIdNumber++;
        templateTask.querySelector('.card').dataset.id = taskId;
        
        const checkMark = templateTask.querySelector('.fa-check-square');
        complete ? setCheck(checkMark) : deleteCheck(checkMark);
        
        templateTask.querySelector('.task').textContent = text || inputTask.value; // Usando operador OR para agregar valor a una variable
        templateTask.querySelector('.date').textContent = date || moment(inputDate.value).format('DD/MM/YYYY');
        const templateClone = templateTask.cloneNode(true);
        listContainer.appendChild(templateClone);
    }

    const setCheck = (element) => {
        element.classList.remove('far');
        element.classList.add('fas');
    }

    const deleteCheck = (element) => {
        element.classList.remove('fas');
        element.classList.add('far');
    }



    const checkTask = (element) => {
        // Si existe la clase la desactiva, si no, la activa
        const mainElement = element.parentElement.parentElement
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const index = tasks.findIndex((task) => task.taskId == mainElement.dataset.id)
        tasks[index]['complete'] = !tasks[index]['complete']
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const deleteTask = (element) => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const index = tasks.findIndex((task) => task.taskId == element.dataset.id);
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks))
        element.parentElement.innerHTML = '';
        readTasks();
    }

    const createLocalStorage = () => {
        const tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

        const complete = false;

        const objTasks = {
            text: inputTask.value,
            date: moment(inputDate.value).format('DD/MM/YYYY'),
            complete,
            taskId: taskIdNumber
        }

        tasksArray.push(objTasks);
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    const uniqueDates = (tasks) => {
        const uniqueDatesArray = [];
        tasks.forEach((task) => {
            if (!uniqueDatesArray.includes(task.date)) uniqueDatesArray.push(task.date);
        });

        return (sortDates(uniqueDatesArray));

    }

    const readTasks = () => {
        const tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
        const uniqueDatesArray = uniqueDates(tasksArray);

        uniqueDatesArray.forEach((uniqueDate) => {

            const li = document.createElement('li')
            li.classList.add('timeLine');
            li.textContent = uniqueDate;
            listContainer.appendChild(li);

            tasksArray.forEach(task => {
                if (task.date === uniqueDate) {
                    createTask(task);
                }
            })
        });
    }


    document.addEventListener('DOMContentLoaded', () => {
        readTasks();
    })

    btnCreate.addEventListener('click', e => {
        e.preventDefault(); // Previene que se recargue la pagina cuando se estan recibiendo datos de un formulario
        if (inputTask.value !== '' && inputDate.value !== '') {
            createTask();
            createLocalStorage();
            inputTask.value = '';
            inputDate.value = '';
            window.location.reload();
        } else {
            alert('¡Rellena todos los campos!');
        }
    });

    listContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-check-square')) {
            checkTask(e.target);
            e.target.classList.contains('far') ? setCheck(e.target) : deleteCheck(e.target);
        } else if (e.target.classList.contains('trashIcon')) {
            if (confirm("¿Quieres borrar esta tarea?")) {
                deleteTask(e.target.parentElement);
            }
        }
        e.stopPropagation();
    });

})();