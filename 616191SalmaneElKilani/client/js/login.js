window.onload = function(){

    document.getElementById('login-form').addEventListener('submit', login);

}

async function login(event){
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        // get auth token from response and store it in session storage
        const data = await response.json();
        sessionStorage.setItem('authToken', data.authToken);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        // redirect to protected page
        window.location.href = './home.html';
    } else {
        // display error message
        const errorContainer = document.getElementById('error-container');
        const newParagraph = document.createElement('p');
        const error = await response.json();
        newParagraph.innerText = error.error;
        // errorContainer.textContent = await response.text();
        errorContainer.appendChild(newParagraph);
        errorContainer.style.display = "block";
    }
}