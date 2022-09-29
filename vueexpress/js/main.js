const App = {
  data() {
    return {
      test: [],
      logging:{
        log:false,
        name:''
      },
    };
  },
  methods: {
    async perehod(e) {
      let Array_id =  e.target.id
      try{
        await fetch("/click", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.test[Array_id]),
        });
        let otvet = await res.json();
        console.log(otvet);
      }
      catch (e){
        console.log(new Error(e))
      }
    
      console.log('we')
      window.location.href = "./redirect.html";
    },
  },
  async mounted() {
    let res = await fetch("/tests");
    let result = await res.json();
    for(let element of result){
      if(element.img == ''){
        element.img = './images/no_product.jpg'
      }
    }

    this.test = result;
    console.log(result);
    this.test = result;
  },
};

Vue.createApp(App).mount("#app");
