
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <!--
    Modified from the Debian original for Ubuntu
    Last updated: 2014-03-19
    See: https://launchpad.net/bugs/1288690
  -->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Javier Caballero</title>
    <link rel="icon"
    type="image/jpg"
    href="img/KnightLogo.jpg">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"></meta>
    <link rel="stylesheet" type="text/css" href="./css/loading.css" />
    <link rel="stylesheet" type="text/css" href="./css/jquery.mobile-1.4.4.css" />
    <link rel="stylesheet" type="text/css" href="./css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="./css/my_theme.css" />
  </head>
  <body>

    <div id="loader-wrapper">
      <p>Cargando</p>
      <div id="loader"></div>
    </div>

    <div id="content" class="container" data-role="page" style="">

      <div data-role="panel"  data-position="right" data-display="overlay" data-position-fixed="true" id="mobile_menu">
        <h3 style="text-align: center; margin-top: -4px">Menu</h3>

        <div style="height: 0px;width: 103%;margin: auto 0;position: relative;border-top: solid 1px rgb(223, 223, 223); margin-top: 10px; margin-bottom: 10px;"></div>

        <ul data-role="listview" class="listviewSeparado" style="margin-top: 10px;">
          <li class="active_my"><a onclick="$.mobile.silentScroll(0);" class="btn btn-link">Home</a></li>
          <li><a onclick="$.mobile.silentScroll($('#redes_sociales').offset().top - 70);" class="btn btn-link">Redes Sociales</a></li>
          <li><a onclick="$.mobile.silentScroll($('#mensajeria').offset().top - 70);" class="btn btn-link">Mensajería</a></li>
        </ul>
      </div><!-- /panel -->

      <div class="navbar navbar-default navbar-fixed-top hidden-xs" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand " >Javier Caballero</a>
          </div>
          <div class="navbar-collapse collapse navbar-right">
            <ul class="nav navbar-nav navbar-nav_my" >
              <li class="active_my"><a onclick="$.mobile.silentScroll(0);" class="btn btn-link">Home</a></li>
              <li><a onclick="$.mobile.silentScroll($('#redes_sociales').offset().top - 70);" class="btn btn-link">Redes Sociales</a></li>
              <li><a onclick="$.mobile.silentScroll($('#mensajeria').offset().top - 70);" class="btn btn-link">Mensajería</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </div>


      <div data-role="header" class="visible-xs-block header-mobile" data-position="fixed"  style="padding-top: 10px; height: 56px;">
        <h1 id="titulo_mobile">Javier Caballero</h1>
        <a href="#mobile_menu" style="margin-top: 5px;box-shadow: none; padding: 2px;top: 4px;margin-right: 5px;" class="ui-btn-right btn">
          <img src="img/menu_mobile.png" width="32" height="32" alt="menu_mobile"/>
        </a>
      </div>

      <div role="main" class="ui-content">
        <div class="jumbotron" style="text-align: center;">
          <div id="background"></div>
          <div id="midground"></div>
          <div id="foreground"></div>
          <div class="logo">
            <img  src="img/KnightLogo.jpg" width="256" height="256" alt="logo"/>
          </div>
          <h1>Javier Hernán Caballero García</h1>
          <p class="lead">

          </p>
        </div>

        <div class="divisor" ></div>

        <div id="redes_sociales">

          <div class="row" style="margin-bottom: 20px;">
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/facebook.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Facebook</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13 &raquo;</small></h3>
                  <p><a href="https:\\www.facebook.com/caballerojavier13" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/twitter.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Twitter</h3>
                  <h3 class="text-center"><small>&laquo; @J_H_Caballero_G &raquo;</small></h3>
                  <p><a href="https://twitter.com/J_H_Caballero_G" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/google+.jpg" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Google +</h3>
                  <h3 class="text-center"><small>&laquo; +JavierCaballero &raquo;</small></h3>
                  <p><a href="https://plus.google.com/+JavierCaballero" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/linkedin.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Linkedin</h3>
                  <h3 class="text-center"><small>&laquo; Javier Hernán Caballlero García &raquo;</small></h3>
                  <p><a href="http://ar.linkedin.com/pub/javier-hern%C3%A1n-caballero-garc%C3%ADa/61/16a/769" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/vk.jpg" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>VK</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13 &raquo;</small></h3>
                  <p><a href="https://vk.com/caballerojavier13" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/pinterest.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Pinterest</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier &raquo;</small></h3>
                  <p><a href="https://www.pinterest.com/caballerojavier/" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/instagram.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Instagram</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13 &raquo;</small></h3>
                  <p><a href="https://instagram.com/caballerojavier13/" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/tumblr.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Tumblr</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13 &raquo;</small></h3>
                  <p><a href="https://www.tumblr.com/blog/caballerojavier13" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/foursquare.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Foursquare</h3>
                  <h3 class="text-center"><small>&laquo; j_h_caballero_g &raquo;</small></h3>
                  <p><a href="https://es.foursquare.com/j_h_caballero_g" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/flickr.jpg" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Flickr</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13 &raquo;</small></h3>
                  <p><a href="#" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/spotify.jpg" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Spotify</h3>
                  <h3 class="text-center"><small>&laquo; 11129076624 &raquo;</small></h3>
                  <p><a href="https://play.spotify.com/user/11129076624" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Redes Sociales/soundtracking.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Soundtracking</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13 &raquo;</small></h3>
                  <p><a href="#" target="_new" class="btn btn-default btn-block" role="button">Ver Más</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="divisor" ></div>

        <div id="mensajeria">
          <div class="row" style="margin-bottom: 20px;">
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Mensajeria/whatsapp.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Whatsapp</h3>
                  <h3 class="text-center"><small>&laquo; +54 - 263 - 420 - 0463  &raquo;</small></h3>
                  <h3 class="text-center" style="height:16px;"><small></small></h3>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Mensajeria/telegram.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Telegram</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13 &raquo;</small></h3>
                  <h3 class="text-center"><small>&laquo; +54 - 263 - 420 - 0463  &raquo;</small></h3>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Mensajeria/line.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Line</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13 &raquo;</small></h3>
                  <h3 class="text-center" style="height:16px;"><small></small></h3>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Mensajeria/hangouts.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Hangouts</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13@gmail.com &raquo;</small></h3>
                  <h3 class="text-center" style="height:16px;"><small></small></h3>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Mensajeria/skype.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Skype</h3>
                  <h3 class="text-center"><small>&laquo; javiercaballero13 &raquo;</small></h3>
                  <h3 class="text-center" style="height:16px;"><small></small></h3>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Mensajeria/zello.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Zello</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13 &raquo;</small></h3>
                  <h3 class="text-center" style="height:16px;"><small></small></h3>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Mensajeria/mail.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>E-Mail</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13@gmail.com &raquo;</small></h3>
                  <h3 class="text-center" style="height:16px;"><small></small></h3>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Mensajeria/telefono.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>Teléfono</h3>
                  <h3 class="text-center"><small>&laquo; +54 - 263 - 420 - 0463  &raquo;</small></h3>
                  <h3 class="text-center" style="height:16px;"><small></small></h3>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="thumbnail">
                <img src="img/Mensajeria/facetime.png" class="img-responsive img-rounded" width="300px" height="300px">
                <div class="caption">
                  <h3>FaceTime</h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13@gmail.com &raquo;</small></h3>
                  <h3 class="text-center"><small>&laquo; caballerojavier13@icloud.com &raquo;</small></h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="navbar-bottom" style="position: static; bottom: 0; margin-top: 20px;border-top: solid gray 1px; padding-top: 10px;">
          <p style="color: gray;  text-align: center;">Javier Hernán Caballero García <pan>&reg</span> </p>
        </div>
      </div>
    </div> <!-- /container -->
    <script type="text/javascript" src="js/jquery-2.1.1.min.js" ></script>

    <script type="text/javascript" src="js/jquery.mobile-1.4.4.min.js" ></script>
    <script type="text/javascript" src="js/bootstrap.js" ></script>
    
    <script type="text/javascript" src="js/loading.js" ></script>
        <script type="text/javascript" src="js/main.js" ></script>

  </body>
</html>
