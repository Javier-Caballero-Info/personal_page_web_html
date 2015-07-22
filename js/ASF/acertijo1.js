var exitos = 0;
var perdidas = 0;

var loop = 0;

var worker;

var run = 0;

$(function(){

});

$("#predecir").on("click",function(e){
    e.preventDefault();
    exitos = 0;
    perdidas = 0;
    if(run > 0){
      worker.terminate();

      worker = undefined;

      worker = new Worker('/js/ASF/worker_a1.js')

      escucharWorker();

      worker.postMessage({speed: $("#speed").val()});
    }else{
      $("#predecir").html("Reiniciar Simulación");
      $("#label_speed").html("Cambiar Velocidad:");
      worker = new Worker('/js/ASF/worker_a1.js')

      escucharWorker();

      worker.postMessage({speed: $("#speed").val()});

      run = 1;
    }
});

$("#speed").on("change",function(){
  if(run > 0){
    worker.terminate();

    worker = undefined;

    worker = new Worker('/js/ASF/worker_a1.js')

    escucharWorker();

    worker.postMessage({speed: $("#speed").val()});
  }
});

function escucharWorker(){
  worker.onmessage = function(e) {

    r_juan = e.data.r_juan;
    r_maria = e.data.r_maria;

    p_juan = opuesto(r_maria);

    p_maria = r_juan;

    $($('#t_resutado1 tbody td')[0]).text(to_cara(p_juan));
    $($('#t_resutado1 tbody td')[2]).text(to_cara(p_maria));

    $($('#t_resutado1 tbody td')[1]).text(to_cara(r_juan));

    var ok = 0;

    if(p_juan == r_juan){
      $($('#t_resutado1 tbody tr')[0]).addClass("success");
      $($('#t_resutado1 tbody tr')[0]).removeClass("danger");
      ok = 1;
    }else{
      $($('#t_resutado1 tbody tr')[0]).addClass("danger");
      $($('#t_resutado1 tbody tr')[0]).removeClass("success");
    }


    $($('#t_resutado1 tbody td')[3]).text(to_cara(r_maria));

    if(p_maria == r_maria){
      $($('#t_resutado1 tbody tr')[1]).addClass("success");
      $($('#t_resutado1 tbody tr')[1]).removeClass("danger");
      ok = 1;
    }else{
      $($('#t_resutado1 tbody tr')[1]).addClass("danger");
      $($('#t_resutado1 tbody tr')[1]).removeClass("success");
    }

    if(ok > 0){
      exitos = exitos + 1;
    }else{
      perdidas = perdidas + 1;
    }

    $($('#t_total1 tbody td')[0]).text(exitos);
    $($('#t_total1 tbody td')[1]).text(perdidas);


    $($('#t_total1 tbody td')[2]).text(Math.round(parseFloat(parseFloat(exitos)/parseFloat(exitos + perdidas)) * 100) + '%');
    $($('#t_total1 tbody td')[3]).text(Math.round(parseFloat(parseFloat(perdidas)/parseFloat(exitos + perdidas)) * 100) + '%');

  };

  worker.onerror = function(e) {
    alert('Error: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message);
  };
}

function to_cara(valor){
  if(valor < 1){
     return "Cara";
  }else{
    return "Cruz";
  }
}

function opuesto(valor){
  return (valor + 1) % 2;
}
