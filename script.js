document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#attendanceTable tbody");
  const studentForm = document.getElementById("studentForm");

  // Fetch initial data
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(student => {
        addRowToTable(student);
      });
    });

  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const attendance = document.getElementById("attendance").value;
    const id = Date.now();
    const newStudent = { id, name, attendance };
    addRowToTable(newStudent);
    saveStudent(newStudent);
  });

  function addRowToTable(student) {
    const row = tableBody.insertRow();
    row.setAttribute("data-id", student.id);

    const cellId = row.insertCell(0);
    const cellName = row.insertCell(1);
    const cellAttendance = row.insertCell(2);
    const cellActions = row.insertCell(3);

    cellId.textContent = student.id;
    cellName.textContent = student.name;
    cellAttendance.textContent = student.attendance;
    cellActions.innerHTML = `
      <button onclick="editStudent(${student.id})">Edit</button>
      <button onclick="deleteStudent(${student.id})">Delete</button>
    `;
  }

  function saveStudent(student) {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        data.push(student);
        updateJsonFile(data);
      });
  }

  function updateJsonFile(data) {
    // This function will not work on GitHub Pages as it requires a server to handle file writing.
    // In a real-world scenario, you would need a server-side script to handle this part.
    console.log("Updated JSON data:", JSON.stringify(data, null, 2));
  }
});

function editStudent(id) {
  alert("Edit functionality is not implemented in this example.");
}

function deleteStudent(id) {
  const row = document.querySelector(`[data-id='${id}']`);
  row.remove();
  alert("Delete functionality is not fully implemented in this example.");
}
