const http = require('http');
const url = require('url');
const fs = require('fs');
var active = false;

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  var q = url.parse(req.url, true);
  console.log("URL parseada: ")
  console.log("Host: " + q.host)
  console.log("pathname:" + q.pathname)


  var filename = ""

  //-- Obtener fichero a devolver
  if (q.pathname == "/"){
    filename += "/index.html"
  }
  else if (q.pathname == "/puerta-trasera/ls"){
    console.log("LO QUE PIDE OBIJUAN")
    return res.end("file:///C:/Users/alldocube/github/2019-2020-LTAW-Practicas/P1/mi_tienda/");
    //file:///C:/Users/alldocube/github/2019-2020-LTAW-Practicas/P1/mi_tienda/
  }else{
    filename = q.pathname;
  }

    tipo = filename.split(".")[1]
    //-- Obtener el nombre del fichero a partir del recurso solicitado
    //-- Se añade un . delante
    filename = "." + filename

      console.log("Filename: " + filename)
      console.log("Tipo: " + tipo)
  //-- Leer fichero
  fs.readFile(filename, function(err, data) {
    //-- Fichero no encontrado. Devolver mensaje de error
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    //-- Tipo mime por defecto: html
    var mime = "text/html"

    //-- Es una imagen
    if (['png', 'jpg'].includes(tipo)) {
        console.log("IMAGEN")
        mime = "image/" + tipo
    }
    //-- Es un css
    if (tipo == "css")
      mime = "text/css"




    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });

}).listen(8080);

console.log("Servidor corriendo...")
console.log("Puerto: " + 8080)
