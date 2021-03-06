'use strict';
/**
 * Created by Martin Alejandro Melo on 28/11/2014.
 */
///////////////////////INICIO SERVER MQTT////////////////////////////////
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
// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

/**
 * Aca se escuchan todos los mensajes publicados. Y es donde tambien llegan mis mensajes
 * publicados por el lector de huellas.
 */
server.on('published', function(packet, client) {
    if(packet.topic.indexOf('empleados/huella/')>=0) {
        io.sockets.emit('huellita',
            {'topic': packet.topic,
                'payload': packet.payload
            }
        );
    }
    if(packet.topic.indexOf('$SYS')<0){//Imprimo cuando no son mensajes internos de mqtt.
        console.log('Published', packet.topic);
    }


});

//in case of an error
process.on('uncaughtException', function(error) {
    return console.log(error.stack);
});






//Server WEB

var socket = require('socket.io');

var mqttbroker = 'localhost';
var mqttport = 1883;

var io = socket.listen(3000);
var mqttclient = mqtt.createClient(mqttport, mqttbroker);



// Reduce socket.io debug output
io.set('log level', 0);

// Configuracion de respuestas de Socket.io. desde la web para el controlador
function publicarEnArduino(data){
    var info = JSON.parse(data);
    var topic = String(info.topic);
    var payload = JSON.stringify(info.payload);
    mqttclient.publish( topic ,payload);
}
io.sockets.on('connection', function (socket) {
    socket.on('subscribe', function (data) {
        mqttclient.subscribe(data.topic);
    });
    socket.on('controlador', function (data) {
        publicarEnArduino(data);
    });
    socket.on('schedulear', function (data) {
        var json = JSON.parse(data);
        io.sockets.emit('schedulear',
            {'topic': json.topic,
                'payload': json.payload
            }
        );
    });
    socket.on('eliminarTarea', function (data) {
        var json = JSON.parse(data);
        io.sockets.emit('eliminarTarea',
            {'topic': json.topic,
                'payload': json.payload
            }
        );
    });
    socket.on('actualizarTarea', function (data) {
        var json = JSON.parse(data);
        io.sockets.emit('actualizarTarea',
            {'topic': json.topic,
                'payload': json.payload
            }
        );
    });
});


// FIN WEB-CONTROLADOR SOCKET.IO

// Mensajes para la web desde arduino
mqttclient.on('message', function(topic, payload) {
    if(topic.indexOf('resp/discover')>=0){
        io.sockets.emit('resp/discover',
            {'topic': topic,
                'payload': payload
            }
        );
    }
    if(topic.indexOf('resp/ard')>=0) {
        io.sockets.emit('mqtt',
            {'topic': topic,
                'payload': payload
            }
        );
    }
});
//FIN MENSAJES PARA LA CONTROLADOR-WEB.