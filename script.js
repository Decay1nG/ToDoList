'use strict';

let toDoListDB = [];

const form = document.querySelector('.todolist__form'),
      button = document.querySelector('button'),
      input = form.querySelector('[type="text"]'),
      resetButton = document.querySelector('.reset__btn'),
      toDoListContainer = document.querySelector('.todolist__items');

if (localStorage.getItem('todoData')) {
    toDoListDB = JSON.parse(localStorage.getItem('todoData'));
    toDoListApp();
}
form.addEventListener('submit', event => {
    event.preventDefault();
    let newTodo = {
        todo: input.value,
        checked: false,
    }
    if (input.value) {
        toDoListDB.push(newTodo);
        toDoListApp();
        input.value ='';
        localStorage.setItem('todoData', JSON.stringify(toDoListDB));
    }

    console.log(toDoListDB);

});

function toDoListApp() {
    toDoListContainer.innerHTML = '';
    toDoListDB.reverse();
    toDoListDB.forEach((item, i) => {
        toDoListContainer.innerHTML += `
            <li class="todolist__item--this">
                <input type="checkbox" ${item.checked ? 'checked' : ''}  id="todolist__check${i}" 
                class="checkbox__input" onClick="this.disabled='true'">
                <label class="checkbox__custom" for="todolist__check${i}">${item.todo}</label>
            </li>
        `;

    resetButton.addEventListener('click', (event) => {
        event.preventDefault();
        toDoListDB.forEach((item, i) => {
            toDoListDB.splice(i, 1);
        })
        toDoListApp()
    })
    });

    // onClick="this.disabled='true'"
    const chechbox = document.querySelectorAll('[type="checkbox"]');
    const checkboxMod = document.querySelectorAll('.checkbox__custom');

}

toDoListContainer.addEventListener('change', (event) => {

    const inputId = event.target.getAttribute('id');
    const forLabel = toDoListContainer.querySelector('[for='+ inputId +']');
    const valueLabel = forLabel.innerHTML;
    toDoListDB.forEach((item, i) => {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todoData', JSON.stringify(toDoListDB));
        }
    })
})





