'use strict';

import Router from './modules/router';
import AppView from './views/appView';
import SignView from './views/signView';
import newSignView from './views/newSignView';
import RegView from './views/registrationView';
import User from './models/userModel';
import ScoreView from './views/scoreboardView';
import MainView from './views/mainView';
import PlayView from './views/playView';
import NewPlayView from './views/newPlayView';
import './css/main.css';

const options = {
	user: new User()
};
const eventListener = function (event) {
	const el = event.target;
	if (el.tagName === 'A' && (el.getAttribute('data-nav') || el.getAttribute('href'))) {
		const url = el.getAttribute('data-nav') || el.getAttribute('href');
		if (el.target !== '_blank' && el.target !== '_self') {
			if (url === 'back') {
				new Router().back();
			}
			event.preventDefault();
			new Router().go(url);
		}
	}
};

window.addEventListener('click', eventListener);
window.addEventListener('tap', eventListener);

// TIP: роуты нужно указывать от наиболее специфичного к наименее специфичному
// З.Ы. чтобы более ранние роуты не были префиксами более поздних ;]

(new Router())
	.addRoute('/sign', newSignView, options)
	.addRoute('/app', AppView, options)
	.addRoute('/score', ScoreView, options)
	// .addRoute('/authorization', newSignView, options)
	.addRoute('/singleplayer', NewPlayView, options)
	.addRoute('/multiplayer', NewPlayView, options)
	.addRoute('/', MainView, options)
	.start();


