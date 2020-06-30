// Kumpulkan semua UI Element
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const filterInput = document.querySelector('#filter-input');
const todoList = document.querySelector('#todo-list');
const clearButton = document.querySelector('#clear-todos');

immediateLoadEventListener();

// kumpulan event listener
function immediateLoadEventListener() {
    // mengambil data dari localStorage dan render ke browser
    document.addEventListener('DOMContentLoaded', getTodos);

    // event untuk menambahkan todo
    todoForm.addEventListener('submit', addTodo);

    // event untuk menghapus 1 todo
    todoList.addEventListener('click', deleteTodo);

    // event untuk mengapus semua todos
    clearButton.addEventListener('click', clearTodos);

    // event untuk mencari todo
    filterInput.addEventListener('keyup', filterTodos);
}

// DOM function

function getTodos() {
    let todos;

    // mengecek kondisi local storage apakah gadak?
    if (localStorage.getItem('todos') == null) {
        // jika key nya kosong, reassigment variabel todos jadi array kosong
        todos = [];
    } else {
        // jika ada akan memasukkan value ke dalam variable todos atau reassigment lagi
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // mengambil data todo dari localStorage
    todos.forEach((todo) => {
        // Membuat li element
        const li = document.createElement('li');

        // menambahkan properti class pada element li
        li.className = 'todo-item list-group-item d-flex justify-content-between align-items-center mb-1';

        // menambahkan childern kedalam element li
        li.appendChild(document.createTextNode(todo));

        // membuat delete button
        const a = document.createElement('a');

        // memberi properti untuk a element
        a.href = '#';
        a.className = 'badge badge-danger delete-todo'

        // memasukkan textnya ke child dengan cara ke 2
        a.innerHTML = 'Delete';

        // insert element a ke dalam childern li
        li.appendChild(a);

        // memasukkan element li yang telah dibuat js ke dalam element todo-list
        todoList.appendChild(li);
    });
}

function addTodo(e) {
    e.preventDefault();

    if (todoInput.value) {
        // Membuat li element
        const li = document.createElement('li');

        // menambahkan properti class pada element li
        li.className = 'todo-item list-group-item d-flex justify-content-between align-items-center mb-1';

        // menambahkan childern kedalam element li
        li.appendChild(document.createTextNode(todoInput.value));

        // membuat delete button
        const a = document.createElement('a');

        // memberi properti untuk a element
        a.href = '#';
        a.className = 'badge badge-danger delete-todo'

        // memasukkan textnya ke child dengan cara ke 2
        a.innerHTML = 'Delete';

        // insert element a ke dalam childern li
        li.appendChild(a);

        // memasukkan element li yang telah dibuat js ke dalam element todo-list
        todoList.appendChild(li);

        // menambahkan todo ke dalam localStorage
        addTodoLocalStorage(todoInput.value);

        // membuat reassigment nilai input jadi string kosong
        todoInput.value = '';
    } else {
        alert("Field masih kosong, silahkan masukkan Todo!");
    }
}

function addTodoLocalStorage(todoInputValue){
    let todos;

    // mengecek kondisi local storage apakah gadak?
    if (localStorage.getItem('todos') == null) {
        // jika key nya kosong, reassigment variabel todos jadi array kosong
        todos = [];
    } else {
        // jika ada akan memasukkan value ke dalam variable todos atau reassigment lagi
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // mengpush value dari input todo ke dalam variable todos
    todos.push(todoInputValue);

    // memasukkan value dari input ke dalam local storage dan buat value harus sebuah string dengan menggukan json.stringify
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodo(e) {
    e.preventDefault();

    if (e.target.classList.contains('delete-todo')) {
        // membuat confirm delete item
        if (confirm('Apakah anda yakin menghapus data ini ?')) {
            const todoItem = e.target.parentElement;
            todoItem.remove();
        }
    }
}

function clearTodos() {
    if (confirm('Apakah anda yakin ingin menghapus semua data sekaligus ?')) {
        todoList.innerHTML = '';
    }
}

function filterTodos(e) {
    const filterText = e.target.value.toLowerCase();
    const todoItems = document.querySelectorAll('.todo-item');

    todoItems.forEach((item) => {
        // mengambil text dari masing-masing item todo
        const itemText = item.firstChild.textContent.toLowerCase();

        // 
        if (itemText.indexOf(filterText) !== -1) {
            // muncul ketika item ada salah satu huruf yg dicari
            item.setAttribute('style', 'display: block;');
        } else {
            // selainnya akan tidak menampilkan text yang dicari
            item.setAttribute('style', 'display:none !important;')
        }
    });

    // console.log(filterText);
}