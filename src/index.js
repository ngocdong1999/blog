const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources','views'));
app.use(morgan('combined'));


route(app);


app.listen(port, () => console.log(`App listening at http://localhost:${port}`))