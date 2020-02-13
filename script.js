var etiqueta;
function onloadFcn(){
   
    etiqueta=document.getElementById("ledOnn");
   etiqueta.innerHTML = "led_1"; 
}


// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("tailor.cloudmqtt.com", 30137, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
    useSSL: true,
    userName: "tredayic",
    password: "KS8pBYBUNg3q",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
  topic_tx="led";
  topic_rx="test";

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
	
    client.subscribe(topic_rx);
    message = new Paho.MQTT.Message("ll:Hello: CloudMQTT");
    message.destinationName = topic_tx;
    
	
  }

  function doFail(e){
    console.log(e);
	
  }


  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }


  // called when a message arrives
  function onMessageArrived(message) {
    console.log("nuevo mensaje: "+message.payloadString);
       action(message.payloadString);
      
  }
  
    // called when a message arrives
  function sendMessage(msg) {
    message = new Paho.MQTT.Message(msg);
    message.destinationName = topic_tx;
    client.send(message);
	
  }
  
z=0;
	
    // called when a message arrives
  function led() {
	  if (z == 0){
		  sendMessage('led_encendido');
		  document.getElementById("led_state").innerHTML ="Encendido";
		  z=1;
	  }
	  else {
		  z=0;
		  sendMessage('led_apagado');
		  document.getElementById("led_state").innerHTML ="Apagado";
	  }
		
  }
  x=0;
  function led1() {
	  if (x==0){
		  sendMessage('led1_encendido');
		  document.getElementById("led_state2").innerHTML ="Encendido";
		  x=1;
	  } 
	  else {
		  x=0;
		  sendMessage('led_apagado');
		  document.getElementById("led_state2").innerHTML ="Apagado";
	  }
		
  }
 m=0;
    function pausar() {
	   if(m == 0){
		  sendMessage('esta_pausado');
		  document.getElementById("lecturas").innerHTML ="pausar"; 
         m=1		  
	   }
       else{
		document.getElementById("lecturas").innerHTML ="lecturas";
		m=0;   
	   }	   
	  }
  
 function action(msg) {
	if(document.getElementById("lecturas").innerHTML != "pausar"){
	mensaje=msg.split('=');
	
    if(mensaje[0]=='i')
        document.getElementById('sensor_i').innerHTML=mensaje[1];
    if(mensaje[0]=='p')
        document.getElementById('sensor_p').innerHTML=mensaje[1];
     if(mensaje[0]=='l')
        document.getElementById('sensor_l').innerHTML=mensaje[1];
	}
  }