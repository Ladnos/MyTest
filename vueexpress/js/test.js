function prav (item){
  
  for (let obj of item){
    console.log(obj.prav)
    if (obj.prav){
      return true
    }
  }

    return false;
  }
function perevod(letter){
    let str = [...letter]
    let translate ={
        а:'a',
        б:'b',
        в:'v',
        г:'g',
        д:'d',
        е:'e',
        ё:'yo',
        ж:'zh',
        з:'z',
        и:'i',
        й:'y',
        к:'k',
        л:'l',
        м:'m',
        н:'n',
        о:'o',
        п:'p',
        р:'r',
        с:'s',
        т:'t',
        у:'u',
        ф:'f',
        х:'h',
        ц:'ts',
        ч:'ch',
        ш:'sh',
        щ:'Shch',
        ъ:'',
        ы:'y',
        ь:'',
        э:'ey',
        ю:'u',
        я:'ya',
        ' ':'_',
    }
    for(let i = 0 ;i<str.length;i++){
        str[i] = translate[str[i]]
    }
    return str.join('')
}
const app = {
  data() {
    return {
      ready: false,
      img:'',
      submited: true,
      done:true,
      test: {
        name: "",
        opis: "",
        img:'',
        voprosi: [
          {
            otvet:false,
            text: "",
            check: true,
            img: "",
            otvets: [
              { text: "asd", prav: false, filled:true },
              { text: "asd", prav: false, filled:true },
            ],
          },
        ],
      },
    };
  },
  methods: {
    proverka() {
      let array = this.test.voprosi;
      for (let value of array) {
        for (let item of value.otvets) {
            console.log(item)
            if(item.text == ''){
                item.filled = false
            }else{
              item.filled = true
            }
        }
      }
    },
    truefalse(){
      let array = this.test.voprosi
      for(let value of array){
        for(let item of value.otvets){
          console.log(item)
          // if()
        }
      }
    },
    vopros() {
      let item = {
        otvet:false,
        check: false,
        img: "",
        text: "",
        otvets: [{ text: "", prav: false, filled:true }],
      };
      this.test.voprosi.push(item);
      console.log(this.test.voprosi);
      this.proverka();
    },
    checkbox(e) {
      let id = e.target.parentNode.parentNode.parentNode.id;
      let secId = e.target.id;
      console.log(id,secId)
      this.test.voprosi[id].otvets[secId].prav =!this.test.voprosi[id].otvets[secId].prav;
        if(prav(this.test.voprosi[id].otvets)){
          this.test.voprosi[id].otvet = true
        }else{
          alert('нет ответа')
        }
    },
    otvet(e) {
      const cel = e.target.parentNode.id;
      this.test.voprosi[cel].otvets.push({ text: "", prav: false });
    },
    trigger2(e){
      const input = document.getElementById('glavimg')
      input.click()
    },
    trigger(e) {
      const input = document.getElementById(`${"inp" + e.target.id}`);
      input.click();
    },
    image2(e){
      const input = e.target
      let file = input.files[0]
      const reader = new FileReader()
      reader.onload = (ev) =>{
        input.insertAdjacentHTML(
          "afterend",
          `<img src='${ev.target.result}' class = 'preview' @click = 'remove'/>`
        )
        this.img = ev.target.result
        }
      file = reader.readAsDataURL(file)
    },
    image(e) {
      const input = e.target;
      const id  = e.target.id.match(/[0-9]/g)
      console.log(id)
      let files = Array.from(input.files);
      console.log(files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          input.insertAdjacentHTML(
            "afterend",
            `<img src='${ev.target.result}' class = 'preview' @click = 'remove'/>`
          );
          this.test.voprosi[id].img = ev.target.result
          
        };
          
        files = reader.readAsDataURL(file);
        console.log(files)
      });
    },
    check(e) {
      let id = [...e.target.id][0];
      this.test.voprosi[id].otvet = false
      this.test.voprosi[id].check = !this.test.voprosi[id].check;
      console.log(this.test.voprosi[id].check);
    },
    async submit(e) {
      console.log(this.test.name)
      let data = this;
      let oleg = await fetch("/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res =  await oleg.text() == 'true'
      console.log(res)
      if(!res){
        this.submited = res

      }else{
        this.done = false
      }
      

    },
    toggle(e) {
      let id = e.target.parentNode.parentNode.parentNode.id;
      let item = document.getElementsByName(`radAnswer${id}`);
      this.test.voprosi[id].otvet = true
      let secId = e.target.id;
      console.log(id, secId);
      item.forEach((element) => {
        console.log(element);
        if (element.checked) {
          this.test.voprosi[id].otvets[secId].prav = true;
          console.log(this.test.voprosi[id].otvets[secId]);
        } else {
          this.test.voprosi[id].otvets[element.id].prav = false;
        }
      });
    },
  },
};

Vue.createApp(app).mount("#app");
