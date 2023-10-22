const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/iot/ac', (req, res) => {
  // 'ac' komutunu göndermek için Socket.IO kullanılır
  io.emit('ac', 'Açıldı');
  res.send('Açma komutu gönderildi.');
});

app.get('/iot/kapat', (req, res) => {
    // 'ac' komutunu göndermek için Socket.IO kullanılır
    io.emit('kapat', 'Kapandı');
    res.send('Kapanma komutu gönderildi.');
  });


io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı.');

  socket.on('disconnect', () => {
    console.log('Bir kullanıcı ayrıldı.');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
