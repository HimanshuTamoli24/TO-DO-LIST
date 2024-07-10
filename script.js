const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const button = document.getElementById("add-button");

// Event listener for adding a task
button.addEventListener("click", addTask);

// Event listener for Enter key press
inputBox.addEventListener("keydown", function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Event delegation for handling click events on <li> and close button
listContainer.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    saveData(); // Save state after marking as checked
  } else if (event.target.classList.contains("close")) {
    event.target.parentNode.remove(); // Remove the <li> when close button is clicked
    saveData(); // Save updated list after removing task
  }
});

// Function to add a new task
function addTask() {
  // Check if inputBox value is empty
  if (inputBox.value === "") {
    alert("You must write something!!");
  } else {
    // Create new <li> element
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);

    // Create a <span> for close button
    let span = document.createElement("span");
    span.textContent = "\u00d7"; // Unicode for '×'
    span.classList.add("close"); // Add a class to style the close button
    li.appendChild(span); // Append the span to the <li>

    // Clear the inputBox value
    inputBox.value = "";

    saveData();
  }
}

// Function to save tasks to localStorage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show tasks from localStorage
function showTask() {
  let savedTasks = localStorage.getItem("data");
  if (savedTasks) {
    listContainer.innerHTML = savedTasks;
  }
}

// Load saved tasks when the page loads
showTask();
