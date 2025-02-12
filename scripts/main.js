document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector(".list-body")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("editable")) {
        makeEditable(event.target);
      }
    });
});

function onFormSubmit() {
  let formData = readFormData();
  insertNewRecord(formData);
  resetForm();
}

function readFormData() {
  return {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    country: document.getElementById("country").value,
    score: document.getElementById("score").value,
  };
}

function insertNewRecord(data) {
  let listBody = document.querySelector(".list-body");
  let newRow = document.createElement("div");
  newRow.classList.add("list-row");

  newRow.innerHTML = `
        <div class="list-item editable">${data.firstName}</div>
        <div class="list-item editable">${data.lastName}</div>
        <div class="list-item editable">${data.country}</div>
        <div class="list-item editable score">${data.score}</div>
        <div class="list-item">
            <button onclick="onDelete(this)">Delete</button>
            <button class="save-btn" onclick="saveChanges(this)">Save</button>
        </div>
    `;

  listBody.appendChild(newRow);
}

function makeEditable(element) {
  if (element.querySelector("input")) return;

  let currentValue = element.innerText;
  let input = document.createElement("input");
  input.type = element.classList.contains("score") ? "number" : "text";
  input.value = currentValue;
  input.classList.add("edit-input");

  element.innerHTML = "";
  element.appendChild(input);
  input.focus();
}

function saveChanges(button) {
  let row = button.parentElement.parentElement;
  let cells = row.querySelectorAll(".editable");

  cells.forEach((cell) => {
    let input = cell.querySelector("input");
    if (input) {
      cell.innerText = input.value;
    }
  });
}

function onDelete(button) {
  if (confirm("Are you sure to delete this record?")) {
    button.parentElement.parentElement.remove();
  }
}

function resetForm() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("country").value = "";
  document.getElementById("score").value = "";
}
