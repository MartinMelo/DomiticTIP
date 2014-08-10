#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>
#include <JsonParser.h>
#include <SD.h>

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
  if(comando == "exponerServicios"){
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
  configurarPlaca();
  configurarSDCard();
  settearEstadoInicial();
}
void configurarSDCard(){
  if (!SD.begin(4)) {
    Serial.println("Sd card initialization failed!");
    return;
  }
  Serial.println("Sd card initialization done.");
  
}
//Levanto el estado inicial guardado en la sd card.
//Y activo las luces en su estado inicial.
void settearEstadoInicial(){
  if (SD.exists("estados.json")) {
    File estados = SD.open("estados.json");
   //leo todo el archivo de estados
    while (estados.available()) {
        Serial.write(estados.read());
    }
  //Cierro el archivo de estados
    estados.close();
  }
}
//Configuro los pines.
void configurarPlaca(){
  //SD Card
  pinMode(10, OUTPUT);
  //FIN SD Card
  //Luces
  int i=22;
  for(i; i<=28;i++){
    pinMode(i, OUTPUT);
  }
  //Fin Luces
  //Puertas
  i=38;
  for(i; i<=41;i++){
    pinMode(i, INPUT);
  }
  //Fin Puertas
  //Sensores
  pinMode(A15 , INPUT); //LM35DZ
  //Fin Sensores
}
void loop()
{
  client.loop();
  if(!client.connected()){
    client.connect("arduino");
    suscribirse();
  }
}
//Envio todo el estado completo del microcontrolador.
void refresh(){
}

//me suscribo.
void suscribirse(){
  client.subscribe("arduino");
}
//Expone todo lo que tiene el microcontrolador.
void exponerServicios(){
  char servicios[] = "{tipos: [luz, sensor], luz: [l1,l2,l3] , sensor: [s1,s2,s3] }";
  client.publish("discover", servicios); 
}

//Realiza la accion pedida.
void realizarAccion(JsonHashTable hashTable){
  String destino = hashTable.getString("destino");
  String datos = hashTable.getString("datos");
  int largo = datos.length();
  //Parseo el Json que tiene los datos.
  int i;
  for(i=0; i< largo ; i++) {
    message_buff[i] = datos[i];
  }
  message_buff[i] = '\0';
  JsonHashTable info = parser.parseHashTable(message_buff);
  if(destino == "iluminacion"){
    accionesIluminacion(info);
  }
  if(destino == "sensores"){
    accionesSensores(info);
  }
  
}
void accionesIluminacion(JsonHashTable hashTable){
  int pin = hashTable.getLong("id");
  String estado = hashTable.getString("estado");
  if(estado == "on"){
    digitalWrite(pin , HIGH);
  }
  else{
     digitalWrite(pin , LOW);
  }
}
void accionesSensores(JsonHashTable hashTable){
  String id = hashTable.getString("id");
  String posicion = hashTable.getString("posicion");
  if(id == "temperatura"){
     publicarEstadoSensorTemperatura(posicion);
  }
  if(id == "puertas"){
     publicarEstadoPuerta(posicion);
  }
  
}
void publicarEstadoPuerta(String posicion){
  if(posicion == "entrada"){
    if(digitalRead(38) == HIGH){
        client.publish("home/front/door", "true");
        client.publish("home/front/window", "true");
    }else{
        client.publish("home/front/door", "false");
        client.publish("home/front/window", "false");
    }
  
  }
  if(posicion == "patio"){
    if(digitalRead(40) == HIGH){
       client.publish("home/back/door", "true");
       client.publish("home/back/window", "true");
    }else{
       client.publish("home/back/door", "false");
       client.publish("home/back/window", "false");
    }
  }
}
void publicarEstadoSensorTemperatura(String posicion){
  String sensor= String(random(1,30));
  char temp[2];
  sensor.toCharArray(temp,2);
  if(posicion == "living"){
    client.publish("home/living/temp",temp);
  }
  if(posicion == "basement"){
    client.publish("home/basement/temp",temp);
  }
  if(posicion == "ambiente"){
    int a = (4.9 * analogRead(A15) * 100.0) / 1024;   
    char b[3];
    String str=String(a); //converting integer into a string
    str.toCharArray(b,3);
    client.publish("home/ambiente/temp",b);
  }
}
