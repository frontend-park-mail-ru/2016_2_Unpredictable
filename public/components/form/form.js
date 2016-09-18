(function () {
    'use strict';

    class Form {
        constructor (options) {
            this.el = document.createElement('form');
            this.el.classList.add('form');
            this.setAttrs(options.attrs);
        }

        setAttrs (attrs) {
            Object.keys(attrs).forEach(onsubmit => {
                this.el.setAttribute(onsubmit, attrs[onsubmit]);
            })
        }

        static include (form, el) {
            el.appendChild(form.el);
        }

        add(comp){
            this.el.appendChild(comp.el);
        }
    }

    //export
    window.Form = Form;

})();