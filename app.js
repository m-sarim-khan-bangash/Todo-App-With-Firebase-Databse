const list = document.getElementById("list");

// Checking tha firebase is conected to our app or not
console.log(firebase);

firebase
  .database()
  .ref("Todos")
  .on("child_added", function (data) {
    console.log(data.val());
    // Create li tag with text node
    const li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.textAlign = "center";
    const liText = document.createTextNode(data.val().value);
    li.style.color = "white";
    li.appendChild(liText);

    // Create delete button
    const delBtn = document.createElement("button");
    const delText = document.createTextNode("");
    delBtn.setAttribute("class", "fas fa-trash-alt");
    delBtn.setAttribute("id", data.val().key);
    delBtn.setAttribute("onclick", "deleteItem(this)");
    delBtn.appendChild(delText);

    // Create edit button
    const editBtn = document.createElement("button");
    const editText = document.createTextNode("");
    editBtn.style.marginLeft = "10px";
    editBtn.appendChild(editText);
    editBtn.setAttribute("class", "fas fa-edit");
    editBtn.setAttribute("id", data.val().key);
    editBtn.setAttribute("onclick", "editItem(this)");

    // Appending them
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    list.appendChild(li);
  });

function addTodo() {
  const todo_item = document.getElementById("todo-item");
  console.log(todo_item.value);

  const key = firebase.database().ref("Todos").push().key;
  console.log(key);

  const todo = {
    value: todo_item.value,
    key: key,
  };
  firebase.database().ref("Todos").child(key).set(todo);

  todo_item.value = "";
}

function deleteItem(e) {
  firebase.database().ref("Todos").child(e.id).remove();
  e.parentNode.remove();
  // console.log(e);
  // e ka matlab k jo button may hum nay this likha tha uss ko represent kr rha hay ye basically e ek parameter hy hum kuch aur bh use kr skty thy nut yehi krty hain sb :)...
}

function editItem(e) {
  const val = prompt("Enter updated value", e.parentNode.firstChild.nodeValue);
  const editTodo = {
    value: val,
    key: e.id,
  };
  firebase.database().ref("Todos").child(e.id).set(editTodo);
  e.parentNode.firstChild.nodeValue = val;
}

function deleteAll() {
  list.innerHTML = "";
}
