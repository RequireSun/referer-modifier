import CONFIG from '../CONFIG.json';

export default function validate (formData = []) {
    let res = {
        result: true,
        properties: [],
    };
    formData.forEach(item => {
        switch (item['type']) {
            case 'regex':
                if (!item['value']) {
                    res['result'] = false;
                    res['properties'].push({
                        name: item['name'],
                        type: 'empty',
                    });
                }
                break;
            case 'url':
                if (!item['value']) {
                    res['result'] = false;
                    res['properties'].push({
                        name: item['name'],
                        type: 'empty',
                    });
                } else if (!/^http(?:s)?:\/\//.test(item['value'])) {
                    res['result'] = false;
                    res['properties'].push({
                        name: item['name'],
                        type: 'format',
                    });
                }
                break;
            case 'behavior':
                if (!item['value']) {
                    res['result'] = false;
                    res['properties'].push({
                        name: item['name'],
                        type: 'empty',
                    });
                } else if (!CONFIG.behavior[item['value']]) {
                    res['result'] = false;
                    res['properties'].push({
                        name: item['name'],
                        type: 'format',
                    });
                }
                break;
            default:
                if (!item['value']) {
                    res['result'] = false;
                    res['properties'].push({
                        name: item['name'],
                        type: 'empty',
                    });
                }
                break;
        }
    });
    return res;
};
