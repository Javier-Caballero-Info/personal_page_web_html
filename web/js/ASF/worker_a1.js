function aleatorio(){

  //Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  return Math.floor(Math.random() * (1 - 0 + 1)) + 0;
}


function tirarMonedas() {
  var r_juan = aleatorio();
  var r_maria = aleatorio();

  //timedCount();
  postMessage({'r_juan': r_juan, 'r_maria': r_maria});

}

//timedCount();


onmessage = function (e) {
  var speed = e.data.speed;
  setInterval(tirarMonedas,speed);
};
