/**
 * Created by kelvinsun on 2017/6/17.
 */
// document.getElementById('submit').addEventListener('click', function () {
    // var regex = document.getElementById('regex').value;
    // var url = document.getElementById('url').value;
    //
    // var userSettings = JSON.parse(localStorage.getItem('userSettings')) || [];
    // userSettings.push({
    //     regex: regex,
    //     url: url,
    // });
    // localStorage.setItem('userSettings', JSON.stringify(userSettings));
// });

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
    saveRules(true);
    var insert = document.getElementById('rule_insert');
    initDOM();
    insert && document.getElementById('rules').appendChild(insert);
}

function deleteRule(id) {
    var tar = document.querySelector('[data-id="' + id + '"]');
    tar && tar.parentNode.removeChild(tar);
    saveRules(true);
    var insert = document.getElementById('rule_insert');
    initDOM();
    insert && document.getElementById('rules').appendChild(insert);
}

function saveRules(avoidInsert) {
    var rules = document.getElementById('rules');
    var lis = Array.from(rules.getElementsByTagName('li'));
    var userSettings = (lis.map(function (item) {
        if (avoidInsert && 'rule_insert' === item.id) {
            return undefined;
        }
        return {
            id: item.dataset['id'],
            regex: item.querySelector('[name=regex]').value,
            url: item.querySelector('[name=url]').value,
        };
    }) || []).filter(function (item) {
        return item;
    });
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

function initDOM() {
    var rules = document.getElementById('rules');
    var userSettings = loadFromStore();
    rules.innerHTML = dataToDOM(userSettings);

    rebindEvent();
    // var rules = document.getElementById('rules');
    // var userSettings = JSON.parse(localStorage.getItem('userSettings')) || [];
    // var tpl = '';
    // userSettings.forEach(function (item) {
    //     tpl += tplListItem(item);
    // });
    // rules.innerHTML = tpl;
    //
    // bindListEvents();
    //
    // function bindListEvents() {
    //     Array.from(rules.querySelectorAll('li')).forEach(function (item) {
    //         var id = item.dataset['id'];
    //         item.querySelector('[btn-modify]').addEventListener('click', function () {
    //             modifyRule();
    //         });
    //         item.querySelector('[btn-delete]').addEventListener('click', function () {
    //             deleteRule(id);
    //         });
    //     });
    // }
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
        if ('[object Object]' === userSettings.toString()) {
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

            $modify.removeEventListener('click');
            $delete.removeEventListener('click');

            $modify.addEventListener('click', function () {
                // modifyRule();
            });
            $delete.addEventListener('click', function () {
                // deleteRule(id);
            });
        });
    }
}

function tplListItem(values) {
    values = values || {};
    return (
        '<li data-id="${id}" item-rules>' +
            '<label>' +
                '<span>规则</span>' +
                '<input name="regex" type="text" value="${regex}"/>' +
            '</label>' +
            '<label>' +
                '<span>行为</span>' +
                '<input name="url" type="text" value="${url}"/>' +
            '</label>' +
            '<button btn-modify>编辑</button>' +
            '<button btn-delete>删除</button>' +
        '</li>'
    ).replace(/\${id}/, values['id']).replace(/\${regex}/, values['regex']).replace(/\${url}/, values['url']);
}