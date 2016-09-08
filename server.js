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
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
