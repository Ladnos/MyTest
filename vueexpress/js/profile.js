
const log = document.getElementById('log');
const pass = document.getElementById('pass');
const form = document.getElementById('form')
form.addEventListener('submit',async function(e){
    e.preventDefault()
    console.log('authing....')
    let data = {login:log.value,password:pass.value}
    let otvet = await fetch('/auth',{
        method: 'post',
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(data),
    })
    if(otvet.status !== 200){
        pass.insertAdjacentHTML('afterend','<h5 class="booble" >неверный логин или пароль</h5>')
    }
    if(otvet.status == 200){
        console.log('вы авторизированы')
        document.cookie = encodeURIComponent('jwt') + '='+ encodeURIComponent(`${await otvet.json()}`)
        window.location.replace("/index.html")
    }
})