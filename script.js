const inputBox = document.getElementById('inputBox');
const addButton = document.getElementById('addButton');
const toDoList = document.getElementById('toDoList');

//Global veriable
let editToDo = null;

// Function for Add To Do
const addTodo = () => {
    const inpuText = inputBox.value.trim();
    if (inpuText.length <= 0) {
        alert("You must write somthing in your To-Do.")
        return false;
    }

    if (addButton.value === "Edit") {
        editToDo.target.previousElementSibling.innerHTML = inpuText;
        updateSaveLocalStorageToDo(inpuText);
        addButton.value = "Add";
        inputBox.value = "";
    }
    else {
        // Create a P tag
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inpuText;
        li.appendChild(p);

        //Creating an Edit Button
        const editText = document.createElement("Button");
        editText.classList.add("controlButton", "editButton");
        editText.innerHTML = "Edit";
        li.appendChild(editText);

        // Creating deleteing Button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("controlButton", "deleteButton");
        deleteButton.innerText = "Delete";
        li.appendChild(deleteButton);

        toDoList.appendChild(li);

        //To Clear input Box after clicking on Add Button
        inputBox.value = "";

        // To Save To-Do in Local Storage 
        saveLocalStorageToDo(inpuText);
    }
}

// Function for Update To Do
const updateTodo = (e) => {
    if (e.target.innerHTML === "Delete") {
        toDoList.removeChild(e.target.parentElement);
        deleteSaveLocalStorageToDo(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addButton.value = "Edit";
        editToDo = e;
    }
}

//Function For Storage in Local Storage 
const saveLocalStorageToDo = (todo) => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function for get item from local Storage
const getSaveLocalStorageToDo = () => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {

            // Create a P tag
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            //Creating an Edit Button
            const editText = document.createElement("Button");
            editText.classList.add("controlButton", "editButton");
            editText.innerHTML = "Edit";
            li.appendChild(editText);

            // Creating deleteing Button
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("controlButton", "deleteButton");
            deleteButton.innerText = "Delete";
            li.appendChild(deleteButton);

            toDoList.appendChild(li);
        });
    }
}

// Function for delete item from local Storage 
const deleteSaveLocalStorageToDo = (todo) => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos",JSON.stringify(todos));

}

//Function for update To Do in Local Storage
const updateSaveLocalStorageToDo = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));

}

document.addEventListener('DOMContentLoaded',getSaveLocalStorageToDo);
addButton.addEventListener('click', addTodo);
toDoList.addEventListener('click', updateTodo);