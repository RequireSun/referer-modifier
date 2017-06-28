/**
 * Created by kelvinsun on 2017/6/28.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { state, mutations, } from './mutations';
import plugins from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    plugins,
});