var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
  port: port
});
var messages = [];

ws.on("connection", function(socket) {
  messages.forEach(function(msg) {
    socket.send(msg);
  });
  socket.on("message", function(data) {
    var topic = "/topic";
    var isTopic = data.slice(0, 6);
    var topicContent = data.slice(7);
    if (topic === isTopic) {
      data = "*** Topic has changed to '" + topicContent + "'";
    } else {
      messages.push(data);
    }
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data);
    });
  });
});
