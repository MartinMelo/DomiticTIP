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

// Callback function header
void callback(char* topic, byte* payload, unsigned int length);

//aca manejo lo que me envian
void callback(char* topic, byte* payload, unsigned int length) {
  // Allocate the correct amount of memory for the payload copy
  byte* p = (byte*)malloc(length);
  // Copy the payload to the new buffer
  memcpy(p,payload,length);
  Serial.println("tu vieja");
  // Free the memory
  free(p);
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
  Serial.println(client.connect("arduinoClient"));
    publicar();
    suscribirse();
}
void publicar(){
  String base= String(random(4,30));
  char tempBasement[2];
  base.toCharArray(tempBasement,2);
  client.publish("home/basement/temp",tempBasement);
  delay(1000);
  String living= String(random(18,26));
  char tempLiving[2];
  base.toCharArray(tempLiving,2);
  client.publish("home/living/temp",tempLiving);
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
void suscribirse(){
  client.subscribe("arduino");
  
}
