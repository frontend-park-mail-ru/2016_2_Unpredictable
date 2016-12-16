'use strict';

const express = require('express');
const parser = require('body-parser');
const technoDoc = require('techno-gendoc');
const path = require('path');
const compression = require('compression')

const users = new Map();
const sessions = new Map();

const app = express();
app.use(compression());
app.use('/', express.static('dist', {maxAge: 1}));
app.use('/app', express.static('dist', {maxAge: 1}));
app.use('/sign', express.static('dist', {maxAge: 1}));
app.use('/reg', express.static('dist', {maxAge: 1}));
app.use('/score', express.static('dist', {maxAge: 1}));
app.use('/score/:page', express.static('dist', {maxAge: 1}));
app.use('/singleplayer', express.static('dist', {maxAge: 1}));

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
