/**
 * Created by kelvinsun on 2017/6/28.
 */
import { behavior, storage_key, } from '../CONFIG.json';

if (-1 < navigator.userAgent.indexOf('PhantomJS')) {
    window.localStorage.clear();
}

export const state = {
    CONFIG_BEHAVIOR: behavior,
    rules: [], // JSON.parse(window.localStorage.getItem(storage_key) || '[]'),
};

const refreshFromLocalStorage = () => {
    let res;
    try {
        res = JSON.parse(window.localStorage.getItem(storage_key) || '[]');
    } catch (ex) {
        res = [];
    }
    console.log('reload config from localStorage:', res);
    return res;
};

state['rules'] = refreshFromLocalStorage();

export const mutations = {
    add (state, { id, regex, behavior, content, }) {
        state.rules.push({
            id, regex, behavior, content, enabled: true,
        });
    },
    edit (state, { id, value, }) {
        state.rules = state.rules.map(item => id === item['id'] ? value : item);
    },
    delete (state, { id, }) {
        state.rules = state.rules.filter(item => id !== item['id']);
    },
    refresh (state) {
        state.rules = refreshFromLocalStorage();
    }
};