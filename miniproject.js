const result = document.getElementById("result");
const filter = document.getElementById("filter");

let users = []; // To store the fetched user data

// Fetch user data
async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50');
    const { results } = await res.json();
    
    // Store the user data in the global users array
    users = results;

    // Display the users
    displayUsers(users);
}

// Display users on the page
function displayUsers(usersList) {
    result.innerHTML = ''; // Clear current results

    // Loop through the users and create list items
    usersList.forEach(user => {
        const li = document.createElement('li');

        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>
        `;

        result.appendChild(li);
    });
}

// Filter users based on input
function filterData(searchTerm) {
    // Filter users based on first name, last name, or location
    const filteredUsers = users.filter(user => {
        return (
            user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.location.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Display the filtered users
    displayUsers(filteredUsers);
}

// Event listener for the filter input
filter.addEventListener('input', (e) => filterData(e.target.value));

// Call getData to fetch and display users initially
getData();
