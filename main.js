// Lägga till anteckningar.
// Ta bort anteckningar.
// Markera anteckningar som färdiga
// Se hur många ofärdiga anteckningar som återstår ("X items left").
// Markera alla anteckningar som färdiga/ofärdiga (nedåtpilen till vänster om textfältet).
// Ta bort alla färdiga anteckningar ("Clear completed").
// Visa upp antingen alla anteckningar ("All"), alla ofärdiga anteckningar ("Active") eller alla färdiga anteckningar ("Completed").

const newTodo = document.getElementById("new-todo");
const listContainer = document.getElementById("list-container");

function createTodo() {

    if (Input.value === ''){
        alert("Please enter a valid task");
    }
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    if (todo.completed) {
        li.classList.add("completed");
    }

}

