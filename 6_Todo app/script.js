
document.addEventListener("DOMContentLoaded", function() {
    var input = document.getElementById("input");
    var add = document.getElementById("add");
    var todoList = document.getElementById("todo-list");
    var emptyMessage = document.getElementById("empty-message");

    var todos = [];

    // Load todos from localStorage when page loads
    function loadFromLocalStorage() {
        var saved = localStorage.getItem("todoList");
        if (saved) {
            try {
                var parsed = JSON.parse(saved);
            
                if (Array.isArray(parsed)) {
                    todos = parsed;
                } else {
                    todos = [];
                    localStorage.removeItem("todoList");
                }
            } catch (e) {
                console.error("Error parsing localStorage:", e);
                todos = [];
                localStorage.removeItem("todoList");
            }
            renderTodos();
        }
    }

    // Save todos array to localStorage
    function saveToLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(todos));
    }

    // Render all todos
    function renderTodos() {
        todoList.innerHTML = "";
        
        if (todos.length === 0) {
            emptyMessage.style.display = "block";
            return;
        }
        
        emptyMessage.style.display = "none";
        
        todos.forEach(function(todo, index) {
            var li = document.createElement("li");
            li.className = "todo-item" + (todo.completed ? " completed" : "");
            
            var text = document.createElement("span");
            text.className = "todo-text";
            text.textContent = todo.text;
            
            var completeBtn = document.createElement("button");
            completeBtn.className = "complete-btn";
            completeBtn.textContent = todo.completed ? "Undo" : "Done";
            completeBtn.addEventListener("click", function() {
                toggleComplete(index);
            });
            
            var deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function() {
                deleteTodo(index);
            });
            
            var actions = document.createElement("div");
            actions.className = "todo-actions";
            actions.appendChild(completeBtn);
            actions.appendChild(deleteBtn);
            
            li.appendChild(text);
            li.appendChild(actions);
            todoList.appendChild(li);
        });
    }

    // Add new todo
    add.addEventListener("click", function() {
        // Ensure todos is always an array
        if (!Array.isArray(todos)) {
            todos = [];
        }
        
        var text = input.value.trim();
        
        if (text === "") {
            alert("Please enter a task!");
            return;
        }
        
        todos.push({
            text: text,
            completed: false
        });
        
        input.value = "";
        input.focus();
        saveToLocalStorage();
        renderTodos();
    });

    // Allow Enter key to add todo
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            add.click();
        }
    });

    // Toggle todo completion
    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        saveToLocalStorage();
        renderTodos();
    }

    // Delete todo
    function deleteTodo(index) {
        if (confirm("Are you sure you want to delete this task?")) {
            todos.splice(index, 1);
            saveToLocalStorage();
            renderTodos();
        }
    }

    // Load todos when page loads
    loadFromLocalStorage();
});