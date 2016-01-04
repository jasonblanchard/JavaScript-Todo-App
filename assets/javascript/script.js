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
    $('.todos').append("<li class='todo' data-id=" + todo.id + "><label><input class='toggle-todo' type='checkbox' " + checked + "/> " + todo.text + "</label></li>");
  }
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

$(document).ready(function() {
  // Initialize with any existing todos.
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

});
