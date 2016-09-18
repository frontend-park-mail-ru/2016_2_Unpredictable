(function() {
    'use strict';

    const jsLogin = window.jsLogin;
    const jsChat = window.jsChat;
    let userData = {};

    //import
    if (typeof window === 'object') {
        let Form = window.Form;
        let Input = window.Input;
        let Button = window.Button;

        let formElHello = document.querySelector('.js-form-hello');

        let helloForm = new Form({
            attrs: {
                onsubmit:'onLogin(this); return false;',


            }
        });

        let inputEmail = new Input({
            attrs: {
                placeholder:'Ваш email',
                type:'email',
                name:'email',
                value:'1@1'
            }
        });

        let inputName = new Input({
            attrs: {
                placeholder:'Ваше имя',
                type:'text',
                name:'user',
                value:'1'
            }
        });

        let formButtonHello = new Button({
            text: 'Привет!',
            attrs: {
                name: 'name'
            }
        });

        helloForm.add(inputEmail);
        helloForm.add(inputName);
        helloForm.add(formButtonHello);
        // Input.include(inputEmail, helloForm.el);
        // Input.include(inputName, helloForm.el);
        // Button.include(formButtonHello, helloForm.el);
        Form.include(helloForm,formElHello);



        let formElSubmit = document.querySelector('.js-form-submit');
        let formButtonSubmit = new Button({
            text: 'Отправить!',
            attrs: {
                name: 'name',
                type: 'submit'
            }
        });

        Button.include(formButtonSubmit, formElSubmit);
    }





    function filter (str, rules = ['KEK', 'Apple','Orange', 'OrangeJuce']) {
        for  (let i = 0; i < rules.length; i++) {
            let regexp = new RegExp ('\\b(' + rules[i] + ')\\b', 'gi');
            str = str.replace(regexp,new Array(rules[i].length+1).join("*"));
        }
        return str;
    }

    function onLogin (form, block) {
        console.info('form submited');
        userData = {
            user: form.elements['user'].value,
            email: form.elements['email'].value
        };

        window.jsLogin.hidden = true;
        window.jsChat.hidden = false;

        if (userData.user) {
            userData.user = filter(userData.user);
            jsTitle.innerHTML = jsTitle.innerHTML.replace('%username%', userData.user);
        }

        subscribe();
    }

    function createMessage (opts, isMy = false) {
        let message = document.createElement('div');
        let email = document.createElement('div');

        message.classList.add('chat__message');
        email.classList.add('chat__email');

        if (isMy) {
            message.classList.add('chat__message_my');
        } else {
            let background = `#${technolibs.colorHash(opts.email || '')}`;
            let R = background.charAt(1)+background.charAt(2);
            let G = background.charAt(3)+background.charAt(4);
            let B = background.charAt(5)+background.charAt(6);
            message.style.backgroundColor = `rgba(${parseInt(R,16)}, ${parseInt(G,16)}, ${parseInt(B,16)}, 0.4)`;
        }
        opts.message = decodeURIComponent(opts.message);
        message.innerHTML = filter(opts.message);
        email.innerHTML = opts.email;
        message.appendChild(email);


        return message;
    }

    function onChat (form) {
        let data = {
            message: form.elements['message'].value,
            email: userData.email
        };

        let result = technolibs.request('/api/messages', data);
        form.reset();
    }

    function renderChat (items) {
        jsMessages.innerHTML = '';
        items.forEach(item => {
            let message = createMessage(item, item.email === userData.email);
            jsMessages.appendChild(message);
        });
        jsMessages.scrollTop = jsMessages.scrollHeight;
    }

    function subscribe () {
        technolibs.onMessage(data => {
            renderChat(Object.keys(data).map(key => data[key]));
        });
    }

    function onKeyPressed(e) {
        if (e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
            e.target.form.onsubmit(e.target.form);
        }
    }



// function onSubmit(form) {
//     let data = {
//         user: form.elements ['user'].value,
//         email: form.elements ['email'].value
//     };
//     let res = request('/users', data);
//     //form.v
//     /*if(res == '5') {
//         form.hidden = true;
//         window.helloWorld.innerHTML = hello(data.user)
//     }*/
//     form.hidden = true;
//     window.helloRussian.innerHTML = hello(data.user) + name(res);
//     window.helloEnglish.innerHTML = hello_en(data.user, res);
//     console.log(data,res);
// }

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



    if (typeof exports === 'object') { //for NodeJS
        exports.hello = hello;
        exports.plural = plural;
        exports.filter = filter;
    } else {
        window.onLogin = onLogin;
        window.onChat = onChat;
        window.onKeyPressed = onKeyPressed;
    }

})();
