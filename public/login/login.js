const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const labelEmail = document.getElementById('labelEmail');
const labelPassword = document.getElementById('labelPassword');

function thatInputLabelThing() {
    if (inputEmail.value) {
        labelEmail.classList.add('focusLabel');
    } else {
        labelEmail.classList.remove('focusLabel');
    }
    if (inputPassword.value) {
        labelPassword.classList.add('focusLabel');
    } else {
        labelPassword.classList.remove('focusLabel');
    }
};

document.addEventListener("click", function(e) {
    thatInputLabelThing();
    });
    
document.addEventListener("keydown", function(e) {
    thatInputLabelThing();
});