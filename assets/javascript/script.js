// Initial todos. For now, hard code this, should get this state from persistent storage later.
var todos = [
  {
    id: 1,
    text: 'learn javascript',
    complete: false
  },
  {
    id: 2,
    text: 'eat pizza',
    complete: true
  }
];

// Increment global ID so they are unique.
var id = todos.length;
function incrementId() {
  id++;
  return id;
}

function renderTodos() {

  $('.todos').html('');

  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];
    var checked = todo.complete ? 'checked' : ''
    var className = todo.complete ? 'complete' : 'incomplete';
    $('.todos').append("<li class='todo " + className + "' data-id=" + todo.id + "><label><input class='toggle-todo' type='checkbox' " + checked + "/> " + todo.text + "</label><button class='delete'>delete</button></li>");
  }

  var totalTodos = todos.length;
  var totalCompleteTodos = 0;
  var totalIncompleteTodos = 0;

  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    if (todo.complete) {
      totalCompleteTodos++;
    } else {
      totalIncompleteTodos++;
    }
  }

  $('.total-todo-count').text(totalTodos);
  $('.complete-todo-count').text(totalCompleteTodos);
  $('.incomplete-todo-count').text(totalIncompleteTodos);

  saveTodos();
}

function findById(id) {
  var todo;

  for(var i = 0; i < todos.length; i++) {
    if (todos[i].id === Number(id)) {
      todo = todos[i];
    }
  }

  return todo;
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadSavedTodos() {
  var savedTodos = localStorage.getItem('todos');

  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
}

$(document).ready(function() {
  // Initialize with any existing todos.
  loadSavedTodos()
  renderTodos();

  // Bind to input update to mark todo as complete.
  $(document).on('change', '.toggle-todo', function(event) {
    var id = $(event.target).parent().parent().data('id');
    var todo = findById(id);

    todo.complete = event.target.checked;

    renderTodos();
  });

  // Bind to new todo form submission to create new todos.
  $(document).on('submit', '.new-todo', function(event) {
    event.preventDefault();

    var text = $('.todo-text').val();

    if (text.length > 0) {

      var newTodo = {
        id: incrementId(),
        text: text,
        completed: false
      };

      todos.push(newTodo);

      $('.todo-text').val('');
      $('.error').text('');
    } else {
      $('.error').text('Your todo has to have some text.');
    }

    renderTodos();
  });

  $(document).on('click', '.delete', function(event) {
    var todoId = $(event.target).parent().data('id');
    var index;

    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id === Number(todoId)) {
        index = i;
      }
    }

    todos.splice(index, 1);

    renderTodos();
  });

  $(document).on('click', '.delete-completed', function() {

    // Build  up a list of completed indices, but don't remove them yet so the `todos` array is not mutated as you're looping through it.
    var completedIndices = [];
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].complete) {
        completedIndices.push(i);
      }
    }

    // Then loop through the indices and remove them from `todos` array backwards so that the indices do not change as we remove items.
    for (var i = completedIndices.length - 1; i >= 0; i--) {
      todos.splice(completedIndices[i], 1);
    }

    renderTodos();
  });
});
