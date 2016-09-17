
let express = require('express');
let parser = require('body-parser');
let app = express();
let technoDoc = require('techno-gendoc');
let path = require('path');

let technolibs = require('technolibs');

// let emailDb = {};
// app.post('/users', (req, res, body) => {
//     console.log(req.body);
//
//     if (emailDb[req.body.email]) {
//         emailDb[req.body.email]++;
//     }
//     else {
//         emailDb[req.body.email] = 1;
//     }
//     console.log(emailDb[req.body.email]);
//     res.send(''+emailDb[req.body.email]);
//     // TODO: вернуть количество обращений
// });


app.use('/', express.static('public'));
technoDoc.generate(require('./api'), 'public');

app.use(parser.json());
app.use('/libs', express.static('node_modules'));

app.post('/api/messages', (req, res) => {
	technolibs.publish(req.body).then(body => res.json(req.body));
});

app.get('/api/messages', function (req, res) {
	res.send([
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message')),
		technoDoc.mock(require('./api/scheme/Message'))
	])
=======
let express = require('express');
let technologger = require('technologger');
let parser = require('body-parser');
let app = express();

app.use('/', express.static('public'));

app.use(parser.json());
//app.use(technologger);
let emailDb = {};
app.post('/users', (req, res, body) => {
    console.log(req.body);

    if (emailDb[req.body.email]) {
        emailDb[req.body.email]++;
    }
    else {
        emailDb[req.body.email] = 1;
    }
    console.log(emailDb[req.body.email]);
    res.send(''+emailDb[req.body.email]);
    // TODO: вернуть количество обращений
>>>>>>> main/master
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
