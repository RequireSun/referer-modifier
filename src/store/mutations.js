/**
 * Created by kelvinsun on 2017/6/28.
 */
import { methods, storage_key, } from '../CONFIG.json';

if (-1 < navigator.userAgent.indexOf('PhantomJS')) {
    window.localStorage.clear();
}

export const state = {
    CONFIG_METHOD: methods,
    rules: JSON.parse(window.localStorage.getItem(storage_key) || '[]'),
};

export const mutations = {
    add (state, { id, regex, method, content, }) {
        state.rules.push({
            id, regex, method, content, enabled: true,
        });
    },
    edit (state, { id, value, }) {
        state.rules = state.rules.map(item => id === item['id'] ? value : item);
    },
    delete (state, { id, }) {
        state.rules = state.rules.filter(item => id !== item['id']);
        // const index = state.rules.findIndex(item => id === item['id']);
        // -1 < index && state.rules.splice(index, 1);
    },
};