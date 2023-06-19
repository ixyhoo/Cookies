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
    console.log(newCookie);
    createCookie(newCookie)
}

function createCookie(newCookie){
  
    if(doesCookieExist(newCookie.name)){
       // createToast()
    }else{
       // createToast()
    }

    document.cookie = `${encodeURIComponent(newCookie.name)}=$
    {encodeURIComponent(newCookie.value)}; 
    expires=${newCookie.expires.toUTCString()}`

}

function doesCookieExist(name){
    const cookies = document.cookie.replace(/\s/g, '').split(';')
    const onlyCookiesName = cookies.map(cookie => cookie.split('=')[0])
    console.log(cookies, onlyCookiesName);
    const cookipresence = onlyCookiesName.find(cookie => cookie === 
        encodeURIComponent(name))
        
        return cookipresence;
}