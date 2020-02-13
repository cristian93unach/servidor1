import passw
import paho.mqtt.client as mqtt
import os, urlparse

#led= 0 / 1
#sensor=p/i/l
#['led','0']
        
# Define event callbacks

def publish(msg):
    #print (msg)
    mqttc.publish(topic_tx, msg)
    
   

def on_connect(client, userdata, flags, rc):
    print("rc: " + str(rc))

def on_message(client, obj, msg):
   #print ('new message='+str(msg.payload))
   print(str(msg.payload))
   v=(str(msg.payload))
   
   if (v == 'led_encendido'):
        GPIO.output(7, True)
       
   if (v == 'led_apagado'):
        GPIO.output(7, False)
        
   if (v == 'led1_encendido'):
        GPIO.output (5, True)
        
   if (v == 'led1_apagado'):
        GPIO.output (5, False)
        
   if (v == 'esta_pausado'):
        mqttc.publish(topic_tx,'M')
        

def on_publish(client, obj, mid):
    #print("mid: " + str(mid))
    pass

def on_subscribe(client, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(client, obj, level, string):
    print(string)

mqttc = mqtt.Client()
# Assign event callbacks
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe

# Uncomment to enable debug messages
#mqttc.on_log = on_log


# Connect
mqttc.username_pw_set(passw.user, passw.psw)
mqttc.connect(passw.server, passw.port)
topic_tx='test'
topic_rx='led'
# Start subscribe, with QoS level 0
mqttc.subscribe(topic_rx, 0)

# Publish a message
mqttc.publish(topic_tx, 'led')
#mqttc.publish(topic,topic)
# Continue the network loop, exit when an error occurs
import time
i=0
rc=0
while rc == 0:
    time.sleep(2)
    #if GPIO.input(3)
    i=i+1
    
    mqttc.publish(topic_tx,'i='+str(i)) 
    if i==10:
        mqttc.publish(topic_tx,'p='+str(i)) 
    if i==15:
        mqttc.publish(topic_tx,'l='+str(i)) 
    rc= mqttc.loop()
print("rc: " + str(rc))




