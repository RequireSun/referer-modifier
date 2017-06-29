import 'babel-polyfill';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import './style/main.less';
import App from './components/App.vue';
import store from './store';

Vue.use(ElementUI);

new Vue({
    store,
    el: '#app',
    render: h => h(App),
});