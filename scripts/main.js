let selectedRow = null;

function onFormSubmit() {
    let formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    return {
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        country : document.getElementById("country").value,
        score : document.getElementById("score").value,
    };
}

function insertNewRecord(data) {
    let table = document.getElementById("playerList").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.rows.length);

    newRow.insertCell(0).innerHTML = data.firstName;
    newRow.insertCell(1).innerHTML = data.lastName;
    newRow.insertCell(2).innerHTML = data.country;
    newRow.insertCell(3).innerHTML = data.score;

    let actionCell = newRow.insertCell(4);
    actionCell.innerHTML = `
    <button onclick="onEdit(this)">Edit</button>
    <button onclick="updateScore(this,5)">+5</button>
    <button onclick="updateScore(this,-5)">-5</button>
    <button onclick="onDelete(this)">Delete</button>
    `;
}

function resetForm() {
    document.getElementById("firstName").value="";
    document.getElementById("lastName").value="";
    document.getElementById("country").value="";
    document.getElementById("score").value="";
    selectedRow = null;
    document.querySelector(".form-action-buttons input[type='submit']").value = "Add Player";
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("firstName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("country").value = selectedRow.cells[2].innerHTML;
    document.getElementById("score").value = selectedRow.cells[3].innerHTML;
    document.querySelector(".form-action-buttons input[type='submit']").value = "Update Player";
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.firstName;
    selectedRow.cells[1].innerHTML = formData.lastName;
    selectedRow.cells[2].innerHTML = formData.country;
    selectedRow.cells[3].innerHTML = formData.score;

    resetForm();
}

function onDelete(td) {
    if (confirm("Are you sure to delete this record?")) {
        let row = td.parentElement.parentElement;
        row.parentElement.removeChild(row); 
        resetForm();
    }
}

function updateScore(td, value) {
    let row = td.parentElement.parentElement;
    let scoreCell = row.cells[3];
    let newScore = parseInt(scoreCell.innerHTML) + value;
    scoreCell.innerHTML = newScore;
}