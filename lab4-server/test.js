
const data = {
    "email": 'abcd@example.com',
    "password": '123456'
}


fetch('http://localhost:3000/api/auth/signIn', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            throw new Error('Response was not in JSON format');
        }
    })
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
