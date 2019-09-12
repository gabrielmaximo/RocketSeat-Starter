var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input')
var buttonElement = document.getElementById('997');

var todos = JSON.parse(localStorage.getItem('todoList')) || [];

//This code add or remove one Elem of vector 'Todos' to DOM and save date in local server with JSON, Enjoy It! 

function renderTodos() {
    listElement.innerHTML = '';
    for (var i = 0; i < todos.length; i++) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todos[i]);

        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');
        var linkText = document.createTextNode(' -- Excluir');

        linkElement.setAttribute('onclick', `deleteTodo(${i})`);
        linkElement.appendChild(linkText);
        todoElement.appendChild(todoText);

        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
        
    }
}

renderTodos();

function addTodo() {
    var inputText = inputElement.value;
    
    todos.push(inputText);
    inputElement.value = '';
    renderTodos();
    saveStorage();
}

buttonElement.onclick = addTodo;

function deleteTodo(pos) {
    todos.splice(pos,1);

    renderTodos();
    saveStorage();
}

function saveStorage(){
    localStorage.setItem('todoList', JSON.stringify(todos));
}
