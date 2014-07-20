#!/usr/bin/env node
//Dependencias Broker
var mosca = require('mosca');
//Dependencias WEB Server
var mqtt = require('mqtt');


var ascoltatore = {
    //using ascoltatore
    type: 'mongo',
    url: 'mongodb://localhost:27017/mqtt',
    pubsubCollection: 'ascoltatori',
    mongo: {}
};

var moscaSettings = {
    port: 1883,
    backend: ascoltatore,
    persistence: {
        factory: mosca.persistence.Mongo,
        url: 'mongodb://localhost:27017/mqtt'
    }
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published', packet.topic);

});

//in case of an error
process.on("uncaughtException", function(error) {
    return console.log(error.stack);
});




// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}

//Server WEB

var socket = require('socket.io');

var mqttbroker = 'localhost';
var mqttport = 1883;

var io = socket.listen(3000);
var mqttclient = mqtt.createClient(mqttport, mqttbroker);



// Reduce socket.io debug output
io.set('log level', 0)

// Configuracion de respuestas de Socket.io. desde la web para el controlador
io.sockets.on('connection', function (socket) {
    socket.on('subscribe', function (data) {
        mqttclient.subscribe(data.topic);
    });
    socket.on('controlador', function (data) {
        publicarEnArduino(data);
    });
});

function publicarEnArduino(data){
    var info = JSON.parse(data);
    var topic = String(info.topic);
    var payload = JSON.stringify(info.payload);
    mqttclient.publish( topic ,payload);
}
// FIN WEB-CONTROLADOR SOCKET.IO

// Mensajes para la web desde arduino
mqttclient.on('message', function(topic, payload) {
    if(topic == "discover"){
        io.sockets.emit('discover',
            {'topic': topic,
                'payload': payload
            }
        );
    }
    if(topic.indexOf("home/")>=0) {
        io.sockets.emit('mqtt',
            {'topic': topic,
                'payload': payload
            }
        );
    }
});
//FIN MENSAJES PARA LA CONTROLADOR-WEB.



