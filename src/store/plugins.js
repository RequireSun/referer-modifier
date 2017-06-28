/**
 * Created by kelvinsun on 2017/6/28.
 */
import { STORAGE_KEY, } from './mutations';

const localStoragePlugin = store => {
    store.subscribe((mutation, { rules, }) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
    });
};

export default [localStoragePlugin];