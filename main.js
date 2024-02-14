
// Se hur många ofärdiga anteckningar som återstår ("X items left").
// Markera alla anteckningar som färdiga/ofärdiga (nedåtpilen till vänster om textfältet).
// Ta bort alla färdiga anteckningar ("Clear completed").
// Visa upp antingen alla anteckningar ("All"), alla ofärdiga anteckningar ("Active") eller alla färdiga anteckningar ("Completed").

// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Setup all event listeners and initial UI state
    setupInputListener(); // Listen for todo input
    setupClearCompletedListener(); // Listen for clearing completed todos
    setupFilterListeners(); // Setup filters for todos (All, Active, Completed)
    setupToggleAllListener(); // Listen for toggle all checkbox changes
    updateVisibilityOfMainAndFooter(); // Update visibility based on todo count
    updateTodoCount(); // Update the displayed count of active todos
    // Listen for clicks on the todo list to handle delete button clicks using event delegation
    document.getElementById('todoList').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            deleteTodo(event.target.parentNode);
        }
    });
});

function setupInputListener() {
    const input = document.getElementById('input');
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const todoText = input.value.trim();
            if (todoText) {
                createTodo({ id: Date.now(), text: todoText, completed: false });
                input.value = ''; // Clear the input field after creating a todo
                updateVisibilityOfMainAndFooter(); // Check if visibility needs updating
                updateTodoCount(); // Update the count of todos
            } else {
                alert("Please enter a valid task");
            }
        }
    });
}

// Sets up the listener for the clear completed button
function setupClearCompletedListener() {
    const clearCompletedButton = document.querySelector('.clear-completed');
    clearCompletedButton.addEventListener('click', clearCompletedTodos);
}

// Sets up listeners for each filter option (All, Active, Completed)
function setupFilterListeners() {
    const filters = document.querySelectorAll('.filters a');
    filters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault(); 
            applyFilter(this.textContent); // Apply the selected filter
            // Update the filter selection visually
            document.querySelector('.filters .selected').classList.remove('selected');
            this.classList.add('selected');
        });
    });
}

// Sets up the listener for the toggle all checkbox
function setupToggleAllListener() {
    const toggleAllCheckbox = document.getElementById('toggleAll');
    toggleAllCheckbox.addEventListener('change', function() {
        toggleAllTodos(this.checked); // Toggle completion state of all todos
        updateTodoCount(); // Update the count of active todos
    });
}

// Updates the count of todos that are not completed
function updateTodoCount() {
    const todos = document.querySelectorAll('#todoList li:not(.completed)');
    const count = todos.length;
    const todoCountElement = document.querySelector('.todo-count strong');
    todoCountElement.textContent = count;
}

// Clears all completed todos from the list
function clearCompletedTodos() {
    const completedTodos = document.querySelectorAll('#todoList li.completed');
    completedTodos.forEach(todo => todo.remove()); // Remove each completed todo
    updateVisibilityOfMainAndFooter(); // Check if main and footer should be hidden
    updateTodoCount(); // Update the count of active todos
}

// Applies a filter to show all, active, or completed todos
function applyFilter(filter) {
    const todos = document.querySelectorAll('#todoList li');
    todos.forEach(todo => {
        switch (filter) {
            case 'All': 
                todo.style.display = '';
                break;
            case 'Active': 
                todo.style.display = todo.classList.contains('completed') ? 'none' : '';
                break;
            case 'Completed': 
                todo.style.display = todo.classList.contains('completed') ? '' : 'none';
                break;
        }
    });
    
}

// Creates a new todo item and adds it to the list
function createTodo(todo) {
    if (!todo.text) {
        console.error("Todo text is empty");
        return;
    }

    let li = document.createElement("li"); 
    li.textContent = todo.text; // Set the text of the todo
    li.dataset.id = todo.id; // Assign an ID to the todo for potential future use

    // Create and setup the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.setAttribute('aria-label', 'Delete todo'); // Enhance accessibility
    deleteBtn.onclick = function() { deleteTodo(li); }; // Setup the delete functionality
    li.appendChild(deleteBtn); // Add the delete button to the todo item

    if (todo.completed) {
        li.classList.add("completed"); // Mark the todo as completed if applicable
    }

    const list = document.getElementById('todoList');
    list.appendChild(li); // Add the new todo to the list

    updateVisibilityOfMainAndFooter();
    updateTodoCount();
}

function deleteTodo(li) {
    li.remove(); // Remove the specified todo item

    // Update UI based on the removed todo
    const list = document.getElementById('todoList');
    if (list.children.length === 0) {
        document.querySelector('.main').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
    }
    updateTodoCount();
}

// Toggles the completion state of all todos based on the toggle all checkbox
function toggleAllTodos(isCompleted) {
    const todos = document.querySelectorAll('#todoList li');
    todos.forEach(function(todo) {
        if (isCompleted) {
            todo.classList.add('completed');
        } else {
            todo.classList.remove('completed');
        }
    }); 
    updateTodoCount();
    reapplyCurrentFilter() // Update the count of active todos after toggling
}


function reapplyCurrentFilter() {
    const currentfilter = document.querySelector('.filters .selected').textContent;
    applyFilter(currentfilter);
}

// Updates the visibility of the main section and footer based on todo count
function updateVisibilityOfMainAndFooter() {
    const todoList = document.getElementById('todoList');
    const main = document.querySelector('.main');
    const footer = document.querySelector('.footer');

    // Show or hide the main section and footer based on whether there are todos
    if (todoList.children.length === 0) {
        main.style.display = 'none';
        footer.style.display = 'none';
    } else {
        main.style.display = '';
        footer.style.display = '';
    }
}



