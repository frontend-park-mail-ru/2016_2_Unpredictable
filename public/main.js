'use strict'
function onSubmit(form) {
    let data = {
        user: form.elements ['user'].value,
        email: form.elements ['email'].value
    };
    let res = request('/users', data);
    form.v
    if(res === '100') {
        form.hidden = true;
        window.helloWorld.innerHTML = hello(data.user)
    }
    console.log(data,res);
}

function hello(text) {
    return 'Привет, ' + text;
}

if (typeof exports === 'object') {
    exports.hello = hello;
}