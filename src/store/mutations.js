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
    enabled: false,
};

const refreshFromLocalStorage = (store) => {
    let res;
    try {
        res = JSON.parse(window.localStorage.getItem(storage_key) || '{}');
    } catch (ex) {
        res = {};
    }
    console.log(
        '%cload %cconfig from localStorage: %O',
        'color:orange;',
        'color:inherit;',
        res
    );

    for (let i in res) {
        if (res.hasOwnProperty(i)) {
            store[i] = res[i];
        }
    }

    return res;
};

refreshFromLocalStorage(state);

export const mutations = {
    add (state, { id, regex, behavior, content, }) {
        console.log(
            '%cadd %crule %c%d %O',
            'color:greenyellow;',
            'color:inherit;',
            'text-decoration:underline;',
            id,
            { id, regex, behavior, content, }
        );
        state.rules.push({
            id, regex, behavior, content, enabled: true,
        });
    },
    edit (state, { id, value, }) {
        state.rules = state.rules.map(item => {
            if (id === item['id']) {
                console.log(
                    '%cedit %crule %c%d%c from %O to %O',
                    'color:yellow;',
                    'color:inherit;',
                    'text-decoration:underline;',
                    id,
                    'color:inherit;',
                    item,
                    value
                );
                return value;
            } else {
                return item;
            }
        });
    },
    delete (state, { id, }) {
        console.log(
            '%cdelete %crule %c%d',
            'color:red;',
            'color:inherit;',
            'text-decoration:underline;',
            id
        );
        state.rules = state.rules.filter(item => id !== item['id']);
    },
    refresh (state) {
        console.log('%crefresh rules', 'color:skyblue;', 'color:inherit;');
        refreshFromLocalStorage(state);
    },
    enabled (state, enabled) {
        enabled ?
            console.log('%cenabled %cplugin', 'color:green;', 'color:inherit;') :
            console.log('%cdisabled %cplugin', 'color:red;', 'color:inherit;');
        state.enabled = enabled;
    }
};