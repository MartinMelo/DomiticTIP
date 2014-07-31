DomiticTIP
==========

Integración de tecnología para control y automatización de espacio físico


## Prerequisitos/Instalación

### Bajar
Clonar `DomiticTIP` [repository](https://github.com/MartinMelo/DomiticTIP.git)
```
git clone https://github.com/MartinMelo/DomiticTIP.git
```

###Dependencias

Depende de varios otros programas:
- [node.js](http://www.nodejs.org/)
- [npm](https://www.npmjs.org/)


### Instalación

```
npm install
npm start
```

### Probar

Ir a Browser:
file://CLONE_DIR/DomiticTIP/examples/index.html


### Instalacion Arduino

Para cargar el firmware del microcontrolador sera necesario tener Inotool.
```
http://inotool.org/
```
Una vez instalado inotool, dentro de la carpeta del proyecto ejecutar lo siguiente:

```
cd Arduino
mkdir lib
cd lib
git clone https://github.com/knolleary/pubsubclient.git
git clone https://github.com/bblanchon/ArduinoJson.git
cd ..
ino build -m mega2560
ino upload -m mega2560 -p /dev/ttyACM1
```