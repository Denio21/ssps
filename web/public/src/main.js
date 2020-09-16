import Vue from 'vue'
import App from './App.vue'
import router from './router'

import "./styles/global.scss"

Vue.config.productionTip = false

import Api from "./api/Api";
Vue.prototype.$api = Api;

const store = Vue.observable({
  lectures: [

  ],
  status: "loading",
});

const actions = {
  async getLectures() {
    const request = await Api.getLectures();

    if (!request.isSuccess())
      return Vue.set(store, "status", "error");

    store.lectures.splice(0, store.lectures);

    let i = 0;
    request.getResponse().forEach(lecture => {
      Vue.set(store.lectures, i++, lecture);
    });

    Vue.set(store, "status", "success");
  },
};


Vue.prototype.$store = store
Vue.prototype.$actions = actions

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
