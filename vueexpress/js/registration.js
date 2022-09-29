let pass = document.getElementById('pass')
let email = document.getElementById('email')
let log = document.getElementById('log')
let form = document.getElementById('form')
let regexp = /[а-яё]/g;
function validation_log(str){
   if (!str.match(regexp)){
       return true
   }
   return false
}
function validation_email(str){
    if(str.indexOf('@') > -1 && (str.indexOf('.com') > -1 || str.indexOf('.ru') > -1) && str.length >= 6){
        if(!str.match(regexp)){
            return true
        }
    }
    return false
}
function validation_pass(str){
    if(str.match(/[0-9]/) && str.length>=6){
        if (!str.match(regexp)){
            return true
        }
    }
    return false
}
function bobole(obj,msg){
    obj.insertAdjacentHTML('afterend', `<div class="booble" id = ${msg.split(' ').join('')}> ${msg} </div>`)
     setTimeout(((tar)=>{
         tar = document.getElementById(`${msg.split(' ').join('')}`)
         tar.remove()
     }),5000)
}
form.addEventListener('submit', async function(e){
    e.preventDefault();
    if(validation_log(log.value) && validation_pass(pass.value) && validation_email(email.value)){
        let data = {login: log.value, password:pass.value, email:email.value}
        let otvet = await fetch('/registration',{
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data),
        })
        console.log(otvet.status)
        if(otvet.status !== 200){
            log.insertAdjacentHTML('afterend','<span class="error" style="color:red;"> данный логин уже занят </span>')
        }
    }else{
        if (!validation_log(log.value)){
            console.log(validation_log(log.value))
            bobole(log,'такой себе логин')
            log.value = ''
        }
        if(!validation_pass(pass.value)){
            bobole(pass,'такой себе пароль')
            pass.value = ''
        }
        if(!validation_email(email.value)){
            bobole(email,'такое себе мыло')
            email.value = ''
        }
    }
})