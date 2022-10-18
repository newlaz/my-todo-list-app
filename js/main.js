const templateTask = document.getElementById('templateTask').content;
const inputTask = document.querySelector('.inputForm');
const listContainer = document.querySelector('.cardsList');
const btnCreate = document.querySelector('[data-form-btn]');

const createTask = () => {
    templateTask.querySelector('.task').textContent = inputTask.value;
    const templateClone = templateTask.cloneNode(true);
    listContainer.appendChild(templateClone);
}

btnCreate.addEventListener('click', e => {
    e.preventDefault(); // Previene que se recargue la pagina cuando se estan recibiendo datos de un formulario
    if(inputTask.value !== ''){
        createTask();
    }else {
        alert('¡Te faltó el nombre de la tarea!');
    }
    inputTask.value = '';
});
