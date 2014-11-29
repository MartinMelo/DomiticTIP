[![Build Status](https://travis-ci.org/MartinMelo/DomiticTIP.svg?branch=master)](https://travis-ci.org/MartinMelo/DomiticTIP)

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
ino build 
ino upload
```
Tambien sera necesario copiar el archivo initstat.txt y serve.txt, que se encuentran en el directorio Arduino, dentro de la micro sd card que se va a utilizar en el ethernet shield.



### Como Correr El Servidor

Sera necesario ejecutar en distintas terminales las siguientes lineas por separado:

```
forever start server.js
forever start broker.js
forever start schedulerManager.js
forever start fingerprintDetector.js
```

