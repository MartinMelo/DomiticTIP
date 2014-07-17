#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>
#include <JsonParser.h>

//Configuracion Ethernet Shield.
byte mac[]    = {  0xDE, 0xED, 0xBA, 0xFE, 0xFE, 0xED };
byte server[] = { 192, 168, 2, 1 };//IP del broker MQTT
byte ip[]     = { 192, 168, 2, 20 };
//Para parsear el json recibido o para enviar
char message_buff[100];
JsonParser<32> parser;
// Callback function header
void callback(char* topic, byte* payload, unsigned int length);

//aca manejo lo que me envian
void callback(char* topic, byte* payload, unsigned int length) {
  //obtengo el mensage enviado
  int i;
  for(i=0; i<length; i++) {
    message_buff[i] = payload[i];
  }
  message_buff[i] = '\0';
  Serial.println("Mensaje Recibido :" + String(message_buff));
  
  //Parseo el Json recibido
  JsonHashTable hashTable = parser.parseHashTable(message_buff);
  
  //Manejo el pedido recibido.
  String comando = hashTable.getString("comando");
  if(comando == "exposeServices"){
     exponerServicios();
  }
  if(comando == "accion"){
    realizarAccion(hashTable);
  }
  if(comando == "actualizar"){
    refresh();
  }
}


EthernetClient ethClient;
PubSubClient client(server, 1883, callback, ethClient);

void setup()
{
  Serial.begin(9600);
  Ethernet.begin(mac, ip);
  suscribirse();
}

void loop()
{
  client.loop();
  client.connect("arduinoClient");
  suscribirse();
}
//Envio todo el estado completo del microcontrolador.
void refresh(){
  client.publish("home/front/door", "true");
    delay(1000);
  client.publish("home/front/window", "true");
    delay(1000);
  client.publish("home/back/door", "true");
    delay(1000);
  client.publish("home/back/window", "true");
}

//me suscribo.
void suscribirse(){
  client.subscribe("arduino");
}
//Expone todo lo que tiene el microcontrolador.
void exponerServicios(){
}
//Realiza la accion pedida.
void realizarAccion(JsonHashTable hashTable){
  Serial.println("Realizando Accion");
  String destino = hashTable.getString("destino");
  Serial.println("Destino: " + destino);
  String datos = hashTable.getString("datos");
  Serial.println("Datos: " + datos);
  int largo = datos.length();
  Serial.println("Largo " + largo);
  //Parseo el Json que tiene los datos.
  int i;
  for(i=0; i< largo ; i++) {
    message_buff[i] = datos[i];
  }
  message_buff[i] = '\0';
  JsonHashTable info = parser.parseHashTable(message_buff);
   Serial.println("Mensaje Recibido :" + String(message_buff));
  if(destino == "iluminacion"){
    accionesIluminacion(info);
  }
  if(destino == "sensores"){
    accionesSensores(info);
  }
  
}
void accionesIluminacion(JsonHashTable hashTable){
}
void accionesSensores(JsonHashTable hashTable){
  String id = hashTable.getString("id");
  Serial.println("ID " + id);
  if(id == "living"){
    String living= String(random(4,30));
    char templiving[2];
    living.toCharArray(templiving,2);
    client.publish("home/living/temp",templiving);
  }
  if(id == "basement"){
    String base= String(random(4,30));
    char tempBasement[2];
    base.toCharArray(tempBasement,2);
    client.publish("home/basement/temp",tempBasement);
  }
  if(id == "puertas"){
    publicarEstadoPuertas();
  }
  
}
void publicarEstadoPuertas(){
  client.publish("home/front/door", "true");
    delay(1000);
  client.publish("home/front/window", "true");
    delay(1000);
  client.publish("home/back/door", "true");
    delay(1000);
  client.publish("home/back/window", "true");
}
