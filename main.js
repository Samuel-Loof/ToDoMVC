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
    document.getElementById('todoList').addEventListener('click', function (event) {
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


function setupClearCompletedListener() {
    const clearCompletedButton = document.querySelector('.clear-completed');
    clearCompletedButton.addEventListener('click', clearCompletedTodos);
}

// Sets up listeners for each filter option (All, Active, Completed)
function setupFilterListeners() {
    const filters = document.querySelectorAll('.filters a');
    filters.forEach(filter => {
        filter.addEventListener('click', function (e) {
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
    toggleAllCheckbox.addEventListener('change', function () {
        toggleAllTodos(this.checked); // Toggle completion state of all todos
        updateTodoCount(); // Update the count of active todos
    });
}

// Updates the count of todos items left
function updateTodoCount() {
    const todosNotCompleted = document.querySelectorAll('#todoList li:not(.completed)');
    const count = todosNotCompleted.length;
    // Determine the correct pluralization of "item"
    const itemText = count === 1 ? 'item' : 'items';
    // Update the text content to include the count and the correct pluralization of "item"
    document.querySelector('.todo-count').textContent = count + ' ' + itemText + ' left';
    ToggleClearCompletedButton();
}


// Clears all completed todos from the list
function clearCompletedTodos() {
    let completedTodos = document.querySelectorAll('#todoList li.completed');
    completedTodos.forEach(todo => todo.remove()); // Remove each completed todo
    updateVisibilityOfMainAndFooter();
    updateTodoCount();
}

function ToggleClearCompletedButton() {
    const completedTodos = document.querySelectorAll('#todoList li.completed');
    const clearCompletedButton = document.querySelector('.clear-completed');

    if (completedTodos.length > 0) {
        clearCompletedButton.style.display = ''; // Or 'inline', 'inline-block'
    } else {
        clearCompletedButton.style.display = 'none';
    }
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

function createTodo(todo) {
    if (!todo.text) {
        console.error("Todo text is empty");
        return;
    }

    let li = document.createElement("li");
    li.dataset.id = todo.id;
    li.className = 'todo-item';

    // Create the checkbox
    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.id = 'todo-checkbox-' + todo.id;
    checkbox.checked = todo.completed;

    checkbox.addEventListener('change', function () {
        li.classList.toggle("completed", this.checked);
        updateTodoCount();
    });

    let checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", checkbox.id);
    checkboxLabel.className = 'custom-checkbox-label';

    li.appendChild(checkbox);
    li.appendChild(checkboxLabel);


    let textSpan = document.createElement("span");
    textSpan.className = 'todo-text';
    textSpan.textContent = todo.text;
    li.appendChild(textSpan);

    // Create and setup the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.setAttribute('aria-label', 'Delete todo');
    deleteBtn.onclick = function () { deleteTodo(li); };
    li.appendChild(deleteBtn);

    if (todo.completed) {
        li.classList.add("completed");
    }

    const list = document.getElementById('todoList');
    list.appendChild(li);

    labelInteractionForCheckbox(checkbox.id);
    updateVisibilityOfMainAndFooter();
    updateTodoCount();
}

// function to setup interaction for labels which with some help from CSS is used
// to create a red border around the todo item (li) when clicking the checkbox
function labelInteractionForCheckbox(checkboxId) {
    //Find the label element in the document that is associated with the given checkbox ID
    const label = document.querySelector(`label[for="${checkboxId}"]`);
    const checkbox = document.getElementById(checkboxId);

    // detect when the user starts clicking on the label, and therefore the checkbox
    label.addEventListener('mousedown', function () {
        // When the label is clicked (mousedown event), add the 'active'
        //class to the checkbox's parent element
        checkbox.parentElement.classList.add('active');
    });
    label.addEventListener('mouseup', function () {
        checkbox.parentElement.classList.remove('active');
    });
    // If The 'mouseout' event fires when the mouse pointer leaves the label element.
    label.addEventListener('mouseout', function () {
        // If the mouse leaves the label before the mouse button is released,
        checkbox.parentElement.classList.remove('active');
    });
}


function deleteTodo(li) {
    li.remove();

    // Update UI based on the removed todo
    const list = document.getElementById('todoList');
    if (list.children.length === 0) {
        document.querySelector('.main').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
    }
    updateTodoCount();
    updateVisibilityOfMainAndFooter();
}

// Toggles the completion state of all todos based on the toggle all checkbox
function toggleAllTodos(isCompleted) {
    const todos = document.querySelectorAll('#todoList li');
    todos.forEach(function (todo) {

        const checkbox = todo.querySelector('.todo-checkbox');
        if (checkbox) {
            checkbox.checked = isCompleted;

            todo.classList.toggle("completed", isCompleted);
        }
    });

    updateTodoCount();
    reapplyCurrentFilter() // Update the count of active todos after toggling
    ToggleClearCompletedButton();
}


function reapplyCurrentFilter() {
    const currentfilter = document.querySelector('.filters .selected').textContent;
    applyFilter(currentfilter);
}

function updateVisibilityOfMainAndFooter() {
    const todoList = document.getElementById('todoList');
    const main = document.querySelector('.main');
    const footer = document.querySelector('.footer');
    const toggleAll = document.getElementById('toggleAll');

    // Show or hide the main section, footer, and toggleAll checkbox based on whether there are todos
    if (todoList.children.length === 0) {
        main.style.display = 'none';
        footer.style.display = 'none';
        toggleAll.classList.add('hidden'); // Hide the toggleAll checkbox
    } else {
        main.style.display = '';
        footer.style.display = '';
        toggleAll.classList.remove('hidden'); // Show the toggleAll checkbox
    }
}






