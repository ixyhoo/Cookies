const input = document.querySelectorAll('input');

input.forEach((input) => {
    input.addEventListener("invalid", handleValidation);
    input.addEventListener("input", handleValidation);
})

function handleValidation(e){
    if(e.type === "invalid"){
        e.target.setCustomValidity("Ce champ ne peut être vide");
    }
    else if (e.type === "input"){
        e.target.setCustomValidity("");
    }
}