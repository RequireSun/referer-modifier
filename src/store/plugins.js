/**
 * Created by kelvinsun on 2017/6/28.
 */
import { storage_key, } from '../CONFIG.json';

const localStoragePlugin = store => {
    // 暂时指定只放两个
    store.subscribe((mutation, { rules, enabled, }) => {
        console.log(
            '%csave %cconfig to localStorage: %O',
            'color:orange;',
            'color:inherit;',
            { rules, enabled, }
        );
        window.localStorage.setItem(storage_key, JSON.stringify({ rules, enabled, }));
    });
};

export default [localStoragePlugin];