import 'babel-polyfill';
import Vue from 'vue';
import App from './components/App.vue';

new Vue({
    el: '#app',
    render: h => h(App),
});

// /**
//  * Created by RequireSun on 2017/6/17.
//  */
//
// initDOM();
//
// document.getElementById('add').addEventListener('click', function () {
//     var rules = document.getElementById('rules');
//     var insert = document.getElementById('rule_insert');
//
//     if (!insert) {
//         insert = document.createElement('li');
//         insert.id = 'rule_insert';
//         insert.setAttribute('data-id', '' + Date.now());
//         insert.innerHTML = (
//             '<input type="checkbox" name="enabled" checkbox-enabled>' +
//             '<label>' +
//                 '<span>规则</span>' +
//                 '<input name="regex" type="text"/>' +
//             '</label>' +
//             '<label>' +
//                 '<span>行为</span>' +
//                 '<select name="method">' +
//                     '<option value="change_referrer" ${checked_change_referrer}>修改 referrer</option>' +
//                     '<option value="add_query_parameter" ${checked_add_query_parameter}>为 query 增加参数</option>' +
//                 '</select>' +
//                 '<input name="url" type="text"/>' +
//             '</label>' +
//             '<button btn-confirm>确定</button>' +
//             '<button btn-cancel>取消</button>'
//         );
//         insert.querySelector('[btn-confirm]').addEventListener('click', function () {
//             insert.setAttribute('editing', '');
//             insert.setAttribute('item-rules', '');
//             insert.id = '';
//             saveRules();
//             initDOM();
//         });
//         insert.querySelector('[btn-cancel]').addEventListener('click', function () {
//             insert.parentNode.removeChild(insert);
//         });
//         rules.appendChild(insert);
//     }
// });
//
// function domModify(e) {
//     var parent = e.currentTarget.parentNode;
//
//     var $valueMethod = parent.querySelector('[name=method]').dataset['value'];
//     var $valueRegex = parent.querySelector('[name=regex]').dataset['value'];
//     var $valueUrl = parent.querySelector('[name=url]').dataset['value'];
//
//     var $tarMethod = parent.querySelector('[name=method]');
//     var $tarRegex = parent.querySelector('[name=regex]');
//     var $tarUrl = parent.querySelector('[name=url]');
//
//     var $method = document.createElement('select');
//     $method.setAttribute('name', 'method');
//     $method.innerHTML = (
//         '<option value="change_referrer" ' + ('change_referrer' === $valueMethod ? 'selected' : '') + '>修改 referrer</option>' +
//         '<option value="add_query_parameter" ' + ('add_query_parameter' === $valueMethod ? 'selected' : '') + '>为 query 增加参数</option>'
//     );
//
//     var $regex = document.createElement('input');
//     $regex.type = 'text';
//     $regex.name = 'regex';
//     $regex.value = $valueRegex;
//
//     var $url = document.createElement('input');
//     $url.type = 'text';
//     $url.name = 'url';
//     $url.value = $valueUrl;
//
//     $tarMethod.parentNode.replaceChild($method, $tarMethod);
//     $tarRegex.parentNode.replaceChild($regex, $tarRegex);
//     $tarUrl.parentNode.replaceChild($url, $tarUrl);
// }
//
// function modifyRule() {
//     saveRules();
//     initDOM();
// }
//
// function deleteRule(id) {
//     var tar = document.querySelector('[data-id="' + id + '"]');
//     tar && tar.parentNode.removeChild(tar);
//     saveRules();
//     initDOM();
// }
//
// function deleteDecorator(e) {
//     var id = e.currentTarget.parentNode.dataset['id'];
//     deleteRule(id);
// }
//
// function saveRules() {
//     var userSettings = dataFromDOM();
//     saveToStore(userSettings);
// }
//
// function initDOM() {
//     var rules = document.getElementById('rules');
//     var insert = document.getElementById('rule_insert');
//     var userSettings = loadFromStore();
//     rules.innerHTML = dataToDOM(userSettings);
//     insert && document.getElementById('rules').appendChild(insert);
//
//     rebindEvent();
// }
//
// function dataFromDOM() {
//     var rules = document.getElementById('rules');
//     var lis;
//     try {
//         lis = Array.from(rules.querySelectorAll('li[item-rules]'));
//     } catch (ex) {
//         // 只有 querySelectorAll 返回 null(也就是没有这种东西) 的时候才会报错
//         lis = [];
//     }
//     return (lis.map(function (item) {
//         if (item.getAttribute('editing')) {
//             return {
//                 id: item.dataset['id'],
//                 enabled: item.querySelector('[name=enabled]').checked,
//                 method: item.querySelector('[name=method]').value,
//                 regex: item.querySelector('[name=regex]').value,
//                 url: item.querySelector('[name=url]').value,
//             };
//         } else {
//             return {
//                 id: item.dataset['id'],
//                 enabled: item.querySelector('[name=enabled]').checked,
//                 method: item.querySelector('[name=method]').dataset['value'],
//                 regex: item.querySelector('[name=regex]').dataset['value'],
//                 url: item.querySelector('[name=url]').dataset['value'],
//             };
//         }
//     }) || []).filter(function (item) {
//         return item;
//     });
// }
//
// function dataToDOM(userSettings) {
//     userSettings = userSettings || [];
//     var tpl = '';
//     userSettings.forEach(function (item) {
//         tpl += tplListItem(item);
//     });
//     return tpl;
// }
//
// function loadFromStore() {
//     var userSettings = localStorage.getItem('userSettings');
//     try {
//         userSettings = JSON.parse(userSettings);
//     } catch (ex) {
//         userSettings = [];
//     }
//     if (!Array.isArray(userSettings)) {
//         if ('[object Object]' === Object.prototype.toString.call(userSettings)) {
//             userSettings = [userSettings];
//         } else {
//             userSettings = [];
//         }
//     }
//     return userSettings;
// }
//
// function saveToStore(userSettings) {
//     if (!Array.isArray(userSettings)) {
//         userSettings = [];
//     }
//     userSettings = userSettings.filter(function (item) {
//         return item;
//     });
//     localStorage.setItem('userSettings', JSON.stringify(userSettings));
// }
//
// function rebindEvent() {
//     var lis = document.getElementById('rules').querySelectorAll('li');
//
//     if (lis) {
//         Array.from(lis).forEach(function (item) {
//             var id = item.dataset['id'];
//             var $modify = item.querySelector('[btn-modify]');
//             var $delete = item.querySelector('[btn-delete]');
//             var $enable = item.querySelector('[checkbox-enabled]');
//
//             // $modify.removeEventListener('click', modifyRule);
//             $modify.removeEventListener('click', domModify);
//             $delete.removeEventListener('click', deleteDecorator);
//             $enable.removeEventListener('click', modifyRule);
//
//             // $modify.addEventListener('click', modifyRule);
//             $modify.addEventListener('click', domModify);
//             $delete.addEventListener('click', deleteDecorator);
//             $enable.addEventListener('click', modifyRule);
//         });
//     }
// }
//
// function tplListItem(values) {
//     var tplTxt = (
//         '<li data-id="${id}" item-rules>' +
//             '<input type="checkbox" name="enabled" checkbox-enabled ${enabled}>' +
//             '<label>' +
//                 '<span>规则</span>' +
//                 '<span name="regex" data-value="${regex}">${regex}</span>' +
//             '</label>' +
//             '<label>' +
//                 '<span>行为</span>' +
//                 '<span name="method" data-value="${method}">${method_text}</span>' +
//                 '<span name="url" data-value="${url}">${url}</span>' +
//             '</label>' +
//             '<button btn-modify>编辑</button>' +
//             '<button btn-delete>删除</button>' +
//         '</li>'
//     );
//     values = values || {};
//
//     for (var i in values) {
//         if (values.hasOwnProperty(i)) {
//             var key  = i;
//             var item = values[i];
//             switch (i) {
//                 case 'enabled':
//                     item = values[i] ? 'checked' : '';
//                     break;
//                 case 'method':
//                     switch (values[i]) {
//                         case 'change_referrer':
//                             tplTxt = tplTxt.replace(new RegExp('\\${method_text}', 'g'), '修改 referrer');
//                             break;
//                         case 'add_query_parameter':
//                             tplTxt = tplTxt.replace(new RegExp('\\${method_text}', 'g'), '为 query 增加参数');
//                             break;
//                     }
//                     break;
//             }
//             tplTxt = tplTxt.replace(new RegExp('\\${' + key + '}', 'g'), item);
//         }
//     }
//
//     return tplTxt;
//
//     // var tplTxt = (
//     //     '<li data-id="${id}" item-rules>' +
//     //         '<input type="checkbox" name="enabled" checkbox-enabled ${enabled}>' +
//     //         '<label>' +
//     //             '<span>规则</span>' +
//     //             '<input type="text" name="regex" value="${regex}"/>' +
//     //         '</label>' +
//     //         '<label>' +
//     //             '<span>行为</span>' +
//     //             '<select name="method">' +
//     //                 '<option value="change_referrer" ${checked_change_referrer}>修改 referrer</option>' +
//     //                 '<option value="add_query_parameter" ${checked_add_query_parameter}>为 query 增加参数</option>' +
//     //             '</select>' +
//     //             '<input type="text" name="url" value="${url}"/>' +
//     //         '</label>' +
//     //         '<button btn-modify>编辑</button>' +
//     //         '<button btn-delete>删除</button>' +
//     //     '</li>'
//     // );
//     // values = values || {};
//     //
//     // for (var i in values) {
//     //     if (values.hasOwnProperty(i)) {
//     //         var key  = i;
//     //         var item = values[i];
//     //         switch (i) {
//     //             case 'enabled':
//     //                 item = values[i] ? 'checked' : '';
//     //                 break;
//     //             case 'method':
//     //                 key = 'checked_' + values[i];
//     //                 item = 'selected';
//     //                 break;
//     //         }
//     //         tplTxt = tplTxt.replace(new RegExp('\\${' + key + '}', 'g'), item);
//     //     }
//     // }
//     //
//     // return tplTxt;
// }