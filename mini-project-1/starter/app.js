// Kumpulkan semua UI Element
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const filterInput = document.querySelector('#filter-input');
const todoList = document.querySelector('#todo-list');
const clearButton = document.querySelector('#clear-todos');

todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteTodo);
clearButton.addEventListener('click', clearTodos);
filterInput.addEventListener('keyup', filterTodos);

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

        // membuat reassigment nilai input jadi string kosong
        todoInput.value = '';
    } else {
        alert("Field masih kosong, silahkan masukkan Todo!");
    }
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