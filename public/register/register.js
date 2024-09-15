const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputRepeatPassword = document.getElementById('repeatPassword');
const labelEmail = document.getElementById('labelEmail');
const labelPassword = document.getElementById('labelPassword');
const labelRepeatPassword = document.getElementById('labelRepeatPassword');
const registerForm = document.getElementById('register-form');
const errorMessage = document.createElement('div');
errorMessage.id = 'error-message';
errorMessage.style.color = 'red';
registerForm.appendChild(errorMessage);

function thatInputLabelThing() {
    if (inputEmail.value) {
        labelEmail.classList.add('focusLabel');
    } else {
        labelEmail.classList.remove('focusLabel');
    };
    if (inputPassword.value) {
        labelPassword.classList.add('focusLabel');
    } else {
        labelPassword.classList.remove('focusLabel');
    };
    if (inputRepeatPassword.value) {
        labelRepeatPassword.classList.add('focusLabel');
    } else {
        labelRepeatPassword.classList.remove('focusLabel');
    };
};

document.addEventListener("click", function(e) {
    thatInputLabelThing();
});

document.addEventListener("keydown", function(e) {
    thatInputLabelThing();
});

registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitButton = registerForm.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Deshabilitar el botón de envío

    const formData = new FormData(registerForm);
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
        repeatPassword: formData.get('repeatPassword')
    };

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.status !== 200) {
        errorMessage.textContent = result.error;
        submitButton.disabled = false;
    } else {
        window.location.href = '/';
    }
});