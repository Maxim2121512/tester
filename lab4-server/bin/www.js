
let app = require('../app');
let http = require('http');
const { initSocket } = require('../src/controllers/data-controller.js')
const io = require('socket.io');
let port = 3000;

let server = http.createServer(app);
app.set('port', port);

initSocket(server);

const cors = require('cors')


const corsOptions = {
    'credentials': true,
    'origin': true,
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'allowedHeaders': 'Authorization, X-Requested-With, X-HTTPMethod-Override, Content-Type, Cache-Control,Accept'
}

app.use(cors(corsOptions))


server.on('error', (error) => {
    console.error('Server error:', error);
});

server.listen(port, () => {
    console.log("server successfully started");
})


