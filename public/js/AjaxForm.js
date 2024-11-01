document.getElementById('ajax-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const messageData = {
        username: document.getElementById('username').value,
        country: document.getElementById('country').value,
        message: document.getElementById('message').value,
    };

    fetch('/ajaxmessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
    })
    .then(response => response.json())
    .then(messages => {
        const messageList = document.getElementById('messageList');
        messageList.innerHTML = '';  // Clear existing messages and placeholder

        if (messages.length === 0) {
            messageList.innerHTML = '<p class="text-muted">No messages yet. Be the first to leave one!</p>';
        } else {
            messages.forEach(msg => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('card', 'my-3');
                messageElement.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${msg.username} from ${msg.country}</h5>
                        <p class="card-text">${msg.message}</p>
                        <small class="text-muted">${new Date(msg.timestamp).toLocaleString()}</small>
                    </div>
                `;
                messageList.appendChild(messageElement);
            });
        }
    })
    .catch(error => console.error("Error submitting message:", error));
});

