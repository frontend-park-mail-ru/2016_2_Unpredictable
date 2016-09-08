'use strict';

function onSubmit(form) {
    let data = {
        user: form.elements ['user'].value,
        email: form.elements ['email'].value
    };
    let res = request('/users', data);
    //form.v
    /*if(res == '5') {
        form.hidden = true;
        window.helloWorld.innerHTML = hello(data.user)
    }*/
    form.hidden = true;
    window.helloRussian.innerHTML = hello(data.user) + name(res);
    window.helloEnglish.innerHTML = hello_en(data.user, res);
    console.log(data,res);
}

function plural(n) {
    if (n % 10 === 1 || n === 1) {
        return (n + ' раз!');
    } else if (n % 10 === 2 || n % 10 === 3 || n % 10 === 4 ||
        n === 2 || n === 3 || n === 4) {
        if (!(n === 11 || n === 12 || n === 13 || n === 14)) {
            return (n + ' раза!');
        } else {
            return (n + ' раз!');
        }
    } else {
        return (n + ' раз!');
    }
}
function plural_en(n) {
    if (n == 1) {
        return (n + ' time!');
    }
    else
        return (n + ' times!');
}

function hello(text) {
    return ('Привет, ' + text);
}
function name(n) {
    return (' ты был(а) здесь ' + plural(n));
}
function hello_en(text, n) {
    return ('\nHello, ' + text + ' you have been here ' + plural_en(n));
}
if (typeof exports === 'object') {
    exports.hello = hello;
    exports.plural = plural;
}
