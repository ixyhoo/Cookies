const input = document.querySelectorAll('input');

input.forEach((input) => {
    input.addEventListener("invalid", handleValidation);
    input.addEventListener("input", handleValidation);
})

function handleValidation(e){
    console.log(e);
}