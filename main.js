// Lägga till anteckningar.
// Ta bort anteckningar.
// Markera anteckningar som färdiga
// Se hur många ofärdiga anteckningar som återstår ("X items left").
// Markera alla anteckningar som färdiga/ofärdiga (nedåtpilen till vänster om textfältet).
// Ta bort alla färdiga anteckningar ("Clear completed").
// Visa upp antingen alla anteckningar ("All"), alla ofärdiga anteckningar ("Active") eller alla färdiga anteckningar ("Completed").

// 

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input');

    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            // Prevent the form from being submitted if this input is part of a form.
            event.preventDefault();

            const todoText = input.value.trim();
            if (todoText) { // Check if the input is not empty
                createTodo({ id: Date.now(), text: todoText, completed: false });
                input.value = ''; // Clear the input field
            } else {
                alert("Please enter a valid task");
            }
        }
    });
});

function createTodo(todo) {
    if (!todo.text) {
        console.error("Todo text is empty");
        return;
    }

    const li = document.createElement("li");
    li.textContent = todo.text;
    li.dataset.id = todo.id;

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    // Pass the li element to deleteTodo
    deleteBtn.onclick = function() { deleteTodo(li); };
    li.appendChild(deleteBtn);


    if (todo.completed) {
        li.classList.add("completed");
    }

    const list = document.getElementById('todoList');
    list.appendChild(li);

    document.querySelector('.main').style.display = '';
    document.querySelector('.footer').style.display = '';
}

function deleteTodo(li) {
    //remove the li we created
    li.remove();

    const list = document.getElementById('todoList');
    if (list.children.length === 0) {
        document.querySelector('.main').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
    }
}




