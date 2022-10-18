// Protegiendo el codigo para que el usuario no puede acceder a el
(() => {

    const templateTask = document.getElementById('templateTask').content;
    const inputTask = document.querySelector('.inputForm');
    const listContainer = document.querySelector('.cardsList');
    const btnCreate = document.querySelector('[data-form-btn]');

    const createTask = () => {
        templateTask.querySelector('.task').textContent = inputTask.value;
        const templateClone = templateTask.cloneNode(true);
        listContainer.appendChild(templateClone);
    }

    const checkTask = (element) => {
        // Si existe la clase la desactiva, si no, la activa
        element.classList.toggle('far');
        element.classList.toggle('fas');
    }

    const deleteTask = (element) => {
        element.remove();
    }

    btnCreate.addEventListener('click', e => {
        e.preventDefault(); // Previene que se recargue la pagina cuando se estan recibiendo datos de un formulario
        if (inputTask.value !== '') {
            createTask();
        } else {
            alert('¡Te faltó el nombre de la tarea!');
        }
        inputTask.value = '';
    });

    listContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-check-square')) {
            checkTask(e.target);
        } else if (e.target.classList.contains('trashIcon')) {
            if(confirm("¿Quieres borrar esta tarea?")){
                deleteTask(e.target.parentElement);
            }
        }
        e.stopPropagation();
    });

})();