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
        alert('Message sent successfully!');
        document.getElementById('guestbook-form').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});


