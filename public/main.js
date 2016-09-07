'use strict'
function onSubmit(form) {
    let data = {
        user: form.elements ['user'].value,
        email: form.elements ['email'].value
    };
    let res = request('/users', data);
    form.v
    /*if(res == '5') {
        form.hidden = true;
        window.helloWorld.innerHTML = hello(data.user)
    }*/
    form.hidden = true;
    window.helloWorld.innerHTML = hello(data.user, res);
    console.log(data,res);
}

function hello(text, n) {
    return 'Привет, ' + text + ' ты был здесь ' + n + ' раз(а)';
}

if (typeof exports === 'object') {
    exports.hello = hello;
}