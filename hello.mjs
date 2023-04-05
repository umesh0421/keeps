import { SkyMass } from "@skymass/skymass";

const sm = new SkyMass({ key: "620a900f05eb7034c0a5db21bdc8194184ee6bd8" });
let id = 1; 
// An array to hold the todos
const TODOS = [
  { id: id++, todo: "exercise", done: false },
  { id: id++, todo: "lunch", done: false },
  { id: id++, todo: "dinner", done: true },
];

//  function to add a new todo
function addTodo({ todo }) {
  TODOS.push({ id: id++, todo, done: false });
}

//  add function to update todo.done given it's id
function updateTodo(id, done) {
  const index = TODOS.findIndex((todo) => todo.id === id);
  if (index !== -1) TODOS[index] = { ...TODOS[index], done };
}   

//  function to r emove todo given it's id
function deleteTodo(id) {
  const index = TODOS.findIndex((todo) => todo.id === id);
  if (index !== -1) TODOS.splice(index, 1);
}



sm.page("/hello_world", (ui) => {
 // const name = ui.string("name", {
    //label: "Please type your notes",
  //});
 
  //  add ui.string to render a text input field
  const todo = ui.string("todo", {
    placeholder: "Please Add your things here...",
    required: true,
  });
  //  add ui.radioGroup to render a radio group
  // const priority = ui.radioGroup("priority", {

  // });
  //  add ui.button to let users trigger an add
  const addBtn = ui.button("add", { label: "Add" });
      
  //  if add button is clicked, call addTodo
  if (todo.isReady && addBtn.didClick) {
    addTodo({
      todo: todo.val,
    });
  }

  const todoList = ui.table("todo_list", TODOS);

  const [selectedTodo] = todoList.selection;
  const doneBtn = ui.button("done", { label: "Mark as Done" });
  if (selectedTodo && doneBtn.didClick) {
    //ui.log("You selected...", selectedTodo);
    updateTodo(selectedTodo.id, false);
  }

  const delBtn = ui.button("del", { label: "Delete" });
  if (selectedTodo && delBtn.didClick) {
    deleteTodo(selectedTodo.id); //  delete todo
  }

  //ui.show(`Hello, ${name.val || "World"}!`);
  //ui.table("todo_list", TODOS);
});
