document.getElementById('crud-form').addEventListener('submit', addUser);

function addUser(e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email });
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('crud-form').reset();
    displayUsers();
}

function displayUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach((user, index) => {
        let row = userList.insertRow();

        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.email;

        let actions = row.insertCell(2);
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editUser(index);
        actions.appendChild(editButton);

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteUser(index);
        actions.appendChild(deleteButton);
    });
}

function editUser(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    document.getElementById('name').value = users[index].name;
    document.getElementById('email').value = users[index].email;

    deleteUser(index);
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

window.onload = displayUsers;
