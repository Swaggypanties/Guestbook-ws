document.getElementById('guestbook-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the sumbission of a default form

    const timestamp = new Date();

    const formData = {
        username: document.getElementById('username').value,
        country: document.getElementById('country').value,
        message: document.getElementById('message').value,
        dateSubmitted: timestamp
    };

    // Use fetch to send the data to the backend (Express)
    fetch('/newmessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Message saved successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch existing guestbook entries when the page loads
    fetch('/jsondata')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('guestbook-entries');
            tableBody.innerHTML = ''; // Clear any existing content

            data.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry.username || entry.name}</td>
                    <td>${entry.country}</td>
                    <td>${entry.message}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching guestbook entries:', error));
});
