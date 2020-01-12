import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Import Element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Use Element UI
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
