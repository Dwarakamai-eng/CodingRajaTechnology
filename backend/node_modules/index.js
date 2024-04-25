// require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// const showdown = require('showdown');
// const converter = new showdown.Converter();
const md = require('markdown-it')();

const PORT = 3000;
const mongoose = require('./db');
const  accountController = require('./controllers/account');
const blogController = require('./controllers/blog');

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/account', accountController);
app.use('/blog', blogController);

app.get('/markdownToHtml', (req, res) => {
    let text = String.raw`
# hello title
**okok**
`;
    var result = md.render(text);
    console.log(result);
    return res.json({
        code : result
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log('error : connecting to port !!');
    }
    else {
        console.log(`Server started at port : ${PORT}`);
    }
});
