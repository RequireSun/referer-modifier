/**
 * Created by kelvinsun on 2017/6/17.
 */
document.getElementById('submit').addEventListener('click', function () {
    var regex = document.getElementById('regex').value;
    var url = document.getElementById('url').value;

    var userSettings = JSON.parse(localStorage.getItem('userSettings')) || [];
    userSettings.push({
        regex: regex,
        url: url,
    });
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
});