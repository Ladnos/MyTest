let ad = document.querySelectorAll('#radiobtn0')
ad.forEach(function(element){
    element.addEventListener('change',function(e){
        console.log('qwe')
    })
})
window.addEventListener('beforeunload',(e)=>{
    localStorage.clear()
})
const app ={
    data(){
        return{
            danno:{}
        }
    },
    methods: {
        selectRadio(e){
            let index = e.target.parentNode.parentNode.parentNode.id
            let secindex = e.target.id
            for(let i = 0;i<this.danno.test.voprosi[index].otvets.length;i++){
                if (i == secindex){
                    this.danno.test.voprosi[index].otvets[secindex].filled = false
                }else{
                    this.danno.test.voprosi[index].otvets[secindex].filled = true
                }
            }
            console.log(this.danno.test.voprosi[index].otvets)
        },
        selectCheck(e){
            let index = e.target.parentNode.parentNode.parentNode.id
            let secindex = e.target.id
            this.danno.test.voprosi[index].otvets[secindex].filled = !this.danno.test.voprosi[index].otvets[secindex].filled
            console.log(this.danno.test.voprosi[index].otvets)
        },
    },
    async beforeMount() {
        try{
            if(!localStorage.getItem('myKey')){
                let pop = await fetch('/getdata')
                let otvet = await pop.json()
                console.log(otvet)
                localStorage.setItem("myKey",JSON.stringify(otvet));
                this.danno = JSON.parse(localStorage.getItem("myKey"))
            }else{
                this.danno = JSON.parse(localStorage.getItem("myKey"))
            }

        }catch(e){
            console.log('уже приходило')
        }
        console.log(this.danno)
    },
    beforeDestroy() {
        document.addEventListener('DOMContentLoaded',(e)=>{
            localStorage.setItem("myKey",JSON.stringify(this.danno));
        })
    },
} 

Vue.createApp(app).mount("#app");
 