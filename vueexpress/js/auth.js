const bpp = {
  data() {
    return {
      logging: {
        log: false,
        name: "",
      },
    };
  },
  async beforeMount() {
    let zap = await fetch("/auth_cookie");
    if (zap.status !== 200) {
      console.log("нету jwt токена");
    } else {
      console.log("вы авторизованы");
      let log = await zap.json();
      this.logging.log = true;
      this.logging.name = log.logging;
    }
  },
};
Vue.createApp(bpp).mount("#bpp");

