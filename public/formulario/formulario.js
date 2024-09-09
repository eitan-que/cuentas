const inputRazon = document.getElementById('razon');
const inputMonto = document.getElementById('monto');
const labelRazon = document.getElementById('labelRazon');
const labelMonto = document.getElementById('labelMonto');

document.addEventListener("click", function(e) {
    if (inputRazon.value) {
        labelRazon.classList.add('focusLabel');
    } else {
        labelRazon.classList.remove('focusLabel');
    }
    if (inputMonto.value) {
        labelMonto.classList.add('focusLabel');
    } else {
        labelMonto.classList.remove('focusLabel');
    }
})