const express = require('express');
const bodyParser = require('body-parser');
const github = require('./routes/github');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use('/github', github);

const port = 3000;
app.listen(port, () => {
	console.log('Started server at port ' + port);
});