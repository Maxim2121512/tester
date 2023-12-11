let express = require('express')
let app = express();

const AuthRouter = require('./routes/auth-router')
const DataRouter = require('./routes/data-router');
const cors = require('cors')
let router = require("./routes/router")

const corsOptions = {
  'credentials': true,
  'origin': true,
  'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
  'allowedHeaders': 'Authorization, X-Requested-With, X-HTTPMethod-Override, Content-Type, Cache-Control,Accept'
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'))
app.use('/node_modules', express.static('node_modules'));
app.use('/', router);
app.set('view engine', 'ejs');


app.use('/api/auth/', AuthRouter);
app.use('/api/', DataRouter);

app.use((req, res) => {
  res.status(404).send('Страница не найдена');
})


module.exports = app;

