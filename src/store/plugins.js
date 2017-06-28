/**
 * Created by kelvinsun on 2017/6/28.
 */
import { storage_key, } from '../CONFIG.json';

const localStoragePlugin = store => {
    store.subscribe((mutation, { rules, }) => {
        window.localStorage.setItem(storage_key, JSON.stringify(rules));
    });
};

export default [localStoragePlugin];