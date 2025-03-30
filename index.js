const express = require('express');
const app = express();
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');
const port = process.env.PORT || 3000;

const expressServer = createServer(app);

const io = new Server(expressServer);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, "index.html"))
});

io.on("connection", (socket) => {
/*     //old syntax 
    socket.join('bed-room');
    io.sockets.in('bed-room').emit('sleep', 'I"m sleeping Now');

    socket.join('school-room');
    io.sockets.in('school-room').emit('study', 'we are are studying') */

    // new syntax 
    socket.join('bed-room');
    socket.join('study-room');

    io.to('bed-room').emit('sleeping', 'We are sleeping');
    io.to('bed-room').emit('rest', 'I"m taking a rest');

    io.to('study-room').emit('study', 'I"m studying now')
})

expressServer.listen(port, () => {
    console.log(`Server Open in ${port}`)
})

