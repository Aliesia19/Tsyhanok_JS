const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

const toDoDialog = document.getElementById("toDoDialog");
const txtToDoNew = document.getElementById('txtToDoNew');
toDoDialog.addEventListener('close', (e) => {
  txtToDoNew.value = '';
});

let isToDo=[];

function newTodo() {
  toDoDialog.showModal();
}

function addTodo(){
  isToDo[isToDo.length] = { checked: false, value: document.getElementById('txtToDoNew').value, id: isToDo.length };
  toDoDialog.close();
  render();
  updateCounter();
}


function renderTodo(toDo){
  return`
  <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${toDo.id}" ${toDo.checked ? 'checked' : ''} onchange="checkTodo(${toDo.id})">
      <label for="${toDo.id}" id="lb${toDo.id}">
          <span class="${toDo.checked ? 'text-success text-decoration-line-through' : ''}">${toDo.value}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${toDo.id})">delete</button>
  </li>
`;
}


function render(){
  let todoItems = '';
  isToDo.forEach(function(item){
    todoItems += renderTodo(item);
  });
  document.getElementById('todo-list').innerHTML = todoItems;
}

function updateCounter() {
  itemCountSpan.innerText = isToDo.length;
  let count = 0;
  for (let toDoIndex in isToDo) {
    if (isToDo[toDoIndex].checked) {
      count += 1;
    }
  }
  uncheckedCountSpan.innerText = count;
}


function checkTodo(id){
  for(let i=0; i<isToDo.length;i++){
    if(isToDo[i].id===id){
      isToDo[i].checked=!isToDo[i].checked;
      if(isToDo[i].checked){
        document.getElementById('lb'+id+'').children[0].classList.add('text-success','text-decoration-line-through');
      }
      else {
        document.getElementById('lb'+id+'').children[0].classList.remove('text-success','text-decoration-line-through');
      }
      updateCounter();
      return;
    }
  }
}

function deleteTodo(id){
  let todoIndex = isToDo.findIndex(todo => todo.id === id);
  if (todoIndex !== -1) {
    isToDo.splice(todoIndex, 1);
  }
  render();
  updateCounter();
}

function SaveInLocalStorage(){
  localStorage.setItem('isToDo',JSON.stringify(isToDo));
}
