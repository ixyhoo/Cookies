const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
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

const cookieForm = document.querySelector('form')
cookieForm.addEventListener('submit', handleForm)

function handleForm(e){
    e.preventDefault()
    
    const newCookie = {};

    inputs.forEach(input => {
        const nameAttribute = input.getAttribute('name')
        newCookie[nameAttribute] = input.value;
    })
    newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    cookieForm.reset()
    
    createCookie(newCookie)

}

function createCookie(newCookie){
  
    if(doesCookieExist(newCookie.name)){
       createToast({name: newCookie.name, state: "modifié", color: "orangered"})
    }else{
       createToast({name: newCookie.name, state: "créé", color: "green"})
    }

    document.cookie = `${encodeURIComponent(newCookie.name)}=$
    {encodeURIComponent(newCookie.value)}; 
    expires=${newCookie.expires.toUTCString()}`

}

function doesCookieExist(name){
    const cookies = document.cookie.replace(/\s/g, '').split(';')
    const onlyCookiesName = cookies.map(cookie => cookie.split('=')[0])
    console.log(cookies, onlyCookiesName);
    const cookiePresence = onlyCookiesName.find(cookie => cookie === 
        encodeURIComponent(name))

        return cookiePresence;
}

const toastsContainer = document.querySelector('.toasts-container')

function createToast({name, state, color}){
    const toastInfo = document.createElement("P");
    toastInfo.className = "toast";

toastInfo.textContent = `Le cookie ${name} a été ${state} !`;
toastInfo.style.backgroundColor = color;
toastsContainer.appendChild(toastInfo);

setTimeout(() => {
    toastInfo.remove();
}, 2500)
}

const cookiesList = document.querySelector('.cookies-list')
const displayCookieBtn  = document.querySelector('.display-cookie-btn')
const infoTxt = document.querySelector('.info-txt')

displayCookieBtn.addEventListener('click', displayCookies)

let lock = false;
function displayCookies(){
    const cookies = document.cookie.replace(/\s/g, '').split(';').reverse()
    console.log(cookies);

    if(!cookies[0]) {
        if (lock) return;

        lock = true;
        infoTxt.textContent = "Pas de cookies à afficher, créez-en un !"

        setTimeout(() => {
            infoTxt.textContent = "";
            lock = false;
        }, 1500)
        return;
    }
   // createElements(cookies)
}

