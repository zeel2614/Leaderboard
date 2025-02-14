// Leaderboard Functionality
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".list-body").addEventListener("click", function (event) {
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
        country: document.getElementById("countryInput").value,
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

    cells.forEach(cell => {
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
    document.getElementById("countryInput").value = "";
    document.getElementById("score").value = "";
}

// Dropdown Search Functionality
const dropdownList = document.getElementById("dropdownList");
const countryInput = document.getElementById("countryInput");

function showDropdown() {
    dropdownList.style.display = "block";
    filterCountries();
}

function hideDropdown() {
    setTimeout(() => { dropdownList.style.display = "none"; }, 200);
}

function filterCountries() {
    const searchValue = countryInput.value.toLowerCase();
    dropdownList.innerHTML = "";

    if (typeof countries !== "undefined" && Array.isArray(countries)) {
        const filteredCountries = countries.filter(country => 
            (typeof country === "object" ? country.name : country)
                .toLowerCase().includes(searchValue)
        );

        filteredCountries.forEach(country => {
            const countryName = typeof country === "object" ? country.name : country;
            const div = document.createElement("div");
            div.textContent = countryName;
            div.classList.add("dropdown-item");
            div.onclick = function () {
                countryInput.value = countryName;
                hideDropdown();
            };
            dropdownList.appendChild(div);
        });

        dropdownList.style.display = filteredCountries.length ? "block" : "none";
    }
}

countryInput.addEventListener("focus", showDropdown);
document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown-container")) {
        hideDropdown();
    }
});