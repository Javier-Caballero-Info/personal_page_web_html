var exitos = 0;
var perdidas = 0;

var loop = 1;

//function aleatorio(){
  //Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  //return Math.floor(Math.random() * (1 - 0 + 1)) + 0;
//}


function timedCount() {
  var r_juan = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
  var r_maria = Math.floor(Math.random() * (1 - 0 + 1)) + 0;

    postMessage({'r_juan': r_juan, 'r_maria': r_maria});
    setTimeout("timedCount()",100);
}

timedCount();
