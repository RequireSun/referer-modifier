/**
 * Created by kelvinsun on 2017/6/17.
 */

initDOM();

document.getElementById('add').addEventListener('click', function () {
    var rules = document.getElementById('rules');
    var insert = document.getElementById('rule_insert');

    if (!insert) {
        insert = document.createElement('li');
        insert.id = 'rule_insert';
        insert.setAttribute('data-id', '' + Date.now());
        insert.innerHTML = (
            '<label>' +
                '<span>规则</span>' +
                '<input name="regex" type="text"/>' +
            '</label>' +
            '<label>' +
                '<span>行为</span>' +
                '<input name="url" type="text"/>' +
            '</label>' +
            '<button btn-confirm>确定</button>' +
            '<button btn-cancel>取消</button>'
        );
        insert.querySelector('[btn-confirm]').addEventListener('click', function () {
            insert.setAttribute('item-rules', '');
            insert.id = '';
            saveRules();
            initDOM();
        });
        insert.querySelector('[btn-cancel]').addEventListener('click', function () {
            insert.parentNode.removeChild(insert);
        });
        rules.appendChild(insert);
    }
});

function modifyRule() {
    saveRules();
    initDOM();
}

function deleteRule(id) {
    var tar = document.querySelector('[data-id="' + id + '"]');
    tar && tar.parentNode.removeChild(tar);
    saveRules();
    initDOM();
}

function deleteDecorator(e) {
    var id = e.currentTarget.parentNode.dataset['id'];
    deleteRule(id);
}

function saveRules() {
    var userSettings = dataFromDOM();
    saveToStore(userSettings);
    // var rules = document.getElementById('rules');
    // var lis = Array.from(rules.getElementsByTagName('li'));
    // var userSettings = (lis.map(function (item) {
    //     if (avoidInsert && 'rule_insert' === item.id) {
    //         return undefined;
    //     }
    //     return {
    //         id: item.dataset['id'],
    //         regex: item.querySelector('[name=regex]').value,
    //         url: item.querySelector('[name=url]').value,
    //     };
    // }) || []).filter(function (item) {
    //     return item;
    // });
    // localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

function initDOM() {
    var rules = document.getElementById('rules');
    var insert = document.getElementById('rule_insert');
    var userSettings = loadFromStore();
    rules.innerHTML = dataToDOM(userSettings);
    insert && document.getElementById('rules').appendChild(insert);

    rebindEvent();
}

function dataFromDOM() {
    var rules = document.getElementById('rules');
    var lis;
    try {
        lis = Array.from(rules.querySelectorAll('li[item-rules]'));
    } catch (ex) {
        // 只有 querySelectorAll 返回 null(也就是没有这种东西) 的时候才会报错
        lis = [];
    }
    return (lis.map(function (item) {
        return {
            id: item.dataset['id'],
            enabled: item.querySelector('[name=enabled]').checked,
            method: item.querySelector('[name=method]').value,
            regex: item.querySelector('[name=regex]').value,
            url: item.querySelector('[name=url]').value,
        };
    }) || []).filter(function (item) {
        return item;
    });
}

function dataToDOM(userSettings) {
    userSettings = userSettings || [];
    var tpl = '';
    userSettings.forEach(function (item) {
        tpl += tplListItem(item);
    });
    return tpl;
}

function loadFromStore() {
    var userSettings = localStorage.getItem('userSettings');
    try {
        userSettings = JSON.parse(userSettings);
    } catch (ex) {
        userSettings = [];
    }
    if (!Array.isArray(userSettings)) {
        if ('[object Object]' === Object.prototype.toString.call(userSettings)) {
            userSettings = [userSettings];
        } else {
            userSettings = [];
        }
    }
    return userSettings;
}

function saveToStore(userSettings) {
    if (!Array.isArray(userSettings)) {
        userSettings = [];
    }
    userSettings = userSettings.filter(function (item) {
        return item;
    });
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

function rebindEvent() {
    var lis = document.getElementById('rules').querySelectorAll('li');

    if (lis) {
        Array.from(lis).forEach(function (item) {
            var id = item.dataset['id'];
            var $modify = item.querySelector('[btn-modify]');
            var $delete = item.querySelector('[btn-delete]');
            var $enable = item.querySelector('[checkbox-enabled]');

            $modify.removeEventListener('click', modifyRule);
            $delete.removeEventListener('click', deleteDecorator);
            $enable.removeEventListener('click', modifyRule);

            $modify.addEventListener('click', modifyRule);
            $delete.addEventListener('click', deleteDecorator);
            $enable.addEventListener('click', modifyRule);
        });
    }
}

function tplListItem(values) {
    var tplTxt = (
        '<li data-id="${id}" item-rules>' +
            '<input type="checkbox" name="enabled" checkbox-enabled ${enabled}>' +
            '<label>' +
                '<span>规则</span>' +
                '<input type="text" name="regex" value="${regex}"/>' +
            '</label>' +
            '<label>' +
                '<span>行为</span>' +
                '<select name="method">' +
                    '<option value="change_referrer" ${checked_change_referrer}>修改 referrer</option>' +
                    '<option value="add_query_parameter" ${checked_add_query_parameter}>为 query 增加参数</option>' +
                '</select>' +
                '<input type="text" name="url" value="${url}"/>' +
            '</label>' +
            '<button btn-modify>编辑</button>' +
            '<button btn-delete>删除</button>' +
        '</li>'
    );
    values = values || {};

    for (var i in values) {
        if (values.hasOwnProperty(i)) {
            var key  = i;
            var item = values[i];
            switch (i) {
                case 'enabled':
                    item = values[i] ? 'checked' : '';
                    break;
                case 'method':
                    key = 'checked_' + values[i],
                    item = 'selected';
                    break;
            }
            tplTxt = tplTxt.replace(new RegExp('\\${' + key + '}', 'g'), item);
        }
    }

    return tplTxt;//.replace(/\${id}/, values['id']).replace(/\${regex}/, values['regex']).replace(/\${url}/, values['url']);
}