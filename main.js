// Lägga till anteckningar.
// Ta bort anteckningar.
// Markera anteckningar som färdiga
// Se hur många ofärdiga anteckningar som återstår ("X items left").
// Markera alla anteckningar som färdiga/ofärdiga (nedåtpilen till vänster om textfältet).
// Ta bort alla färdiga anteckningar ("Clear completed").
// Visa upp antingen alla anteckningar ("All"), alla ofärdiga anteckningar ("Active") eller alla färdiga anteckningar ("Completed").

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            // Prevent the form from being submitted if this input is part of a form.
            event.preventDefault();

            // Call the function to create a to-do item.
            createTodo(input);

            const todoText = input.value.trim();
            if (todoText) { // Check if the input is not empty
                createTodo({id: Date.now(), text: todoText, completed: false});
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

    if (todo.completed) {
        li.classList.add("completed");
    }

    const list = document.getElementById('todoList');
    list.appendChild(li);

    // Show the main section and footer if hidden
    document.querySelector('.main').style.display = '';
    document.querySelector('.footer').style.display = '';
}




