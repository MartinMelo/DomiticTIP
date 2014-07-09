/*
 Basic MQTT example 
 
  - connects to an MQTT server
  - publishes "hello world" to the topic "outTopic"
  - subscribes to the topic "inTopic"
*/

#include <SPI.h>
#include <Ethernet.h>
#include <PubSubClient.h>

// Update these with values suitable for your network.
byte mac[]    = {  0xDE, 0xED, 0xBA, 0xFE, 0xFE, 0xED };
byte server[] = { 192, 168, 2, 1 };
byte ip[]     = { 192, 168, 2, 20 };


void callback(char* topic, byte* payload, unsigned int length) {
  // handle message arrived
}

EthernetClient ethClient;
PubSubClient client(server, 1883, callback, ethClient);

void setup()
{
  Serial.begin(9600);
  Ethernet.begin(mac, ip);
}

void loop()
{
  client.loop();
  Serial.println(client.connect("arduinoClient"));
    publicar();
    suscribir();
}
void publicar(){
  Serial.println("Publicando");
  client.publish("home/basement/temp","24");
  delay(1000);
  client.publish("home/living/temp","15");
    delay(1000);
  client.publish("home/front/door", "true");
    delay(1000);
  client.publish("home/front/window", "true");
    delay(1000);
  client.publish("home/back/door", "true");
    delay(1000);
  client.publish("home/back/window", "true");
    delay(1000);
}
void suscribir(){
  //por ahora no hago nada aca.
  
}
