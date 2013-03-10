// QUESTO FILE CONTIENE TUTTE LE AZIONI DI ROUTING

// Per ogni azione di routing bisogna specificare exports.{nome}
// exports è oggetto globale che permette alle funzioni definite nel file
// di essere viste esternamente ed utilizzate quando si importa il file

// Se ci si dimentica di usare exports la funzione è privata all'interno del file.

// Ogni funzione di routing riceve due argomenti: Request - cioè la richiesta dell'utente
// e Response - cioè la risposta che il Server darà.

// La funzione 'index' è associata all'indirizzo '/', quindi dovrà mostrare la pagina
// iniziale.
exports.index = function(req, res){
  // Mostriamo la pagina 'welcome/html' all'utente
  // il metodo/funzione render fa trasformare la pagina Jade in HTML
  res.render('welcome.jade');
};

exports.mostraProdotti = function(req, res){
  if(req.params.id){
    // mostra una pagina per il prodotto
    var prodotto = db.getProdotto(req.params.id);
    res.render('info.jade', {prodotto: prodotto});
  } else {
    // prendi tutti i prodotti dal DB
    var prodotti = db.getAllProducts();
    // mostriamo la pagina 'showcase', da costruire con i prodotti del DB
    // guardare la pagina per capire come viene costruita.
    res.render('showcase.jade', {prodotti: prodotti});
  }
};

exports.mostraCarrello = function(req, res){
  // Al momento non è ancora pronta!
  res.send(404);
};

exports.aggiungiAlCarrello = function(req, res){
  // Al momento non è ancora pronta!
  res.send(404);
};

exports.rimuoviDalCarrello = function(req, res){
  // Al momento non è ancora pronta!
  res.send(404);
};

exports.confermaSpesa = function(req, res){
  // Al momento non è ancora pronta!
  res.send(404);
};

exports.pagaSpesa = function(req, res){
  // Al momento non è ancora pronta!
  res.send(404);
};

// ROUTES PER I VARI ASSETS: Css, Js, Immagini...
var path = require('path');

exports.getCSS = function(req, res){
  // Prendi l'indirizzo locale del file
  var cssPath = getFile('css', req.params.filename);
  // Invia il file!
  res.sendfile(cssPath);
};

exports.getJS = function(req, res){
  // Prendi l'indirizzo locale del file
  var scriptPath = getFile('js', req.params.filename);
  // Invia il file!
  res.sendfile(scriptPath);
};

exports.getImg = function(req, res){
  // Prendi l'indirizzo locale del file
  var imagePath = getFile('img', req.params.filename);
  // Invia il file!
  res.sendfile(imagePath);
};

// Funzione di supporto di supporto
function getFile(type, filename){
  // gestiamo con le pinze il filename che ci chiede l'utente
  // (magari potrebbe essere malintenzionato e voler vedere altri file...)
  return path.normalize(__dirname + '/../assets/'+type+'/'+filename);
}