// Express è il pacchetto che contiene il web server
// con require lo si importa
var express = require('express');

// Chiamando express() si crea un oggetto che contiene
// tutti i metodi necessari per far funzionare il server
// per l'applicazione web
var app = express();

// Questo è il numero di porta dell'applicazione, più avanti
// verrà spiegato cosa vuol dire...
var PORT = 2013;

// Qui configuriamo un po' di cose tecniche per l'applicazione
// SI PUÒ SALTARE E RITORNARCI PIÙ TARDI...
app.configure( function(){
  // Vai a prendere le pagine web da mostrare dalla cartella {progetto}/views
  app.set("views", __dirname + "/views");
  // Utilizza Jade per trasformare quel che scriviamo in HTML
  app.set("view engine", "jade");
  // Diciamo che non vogliamo un layout predefinito per tutte le pagine,
  // in caso servisse verrà esplicitamente richiesto
  app.set('view options', { layout: false });
  // Nel caso utilizziamo richieste POST, questo ci facilita l'accesso ai vari parametri, vedi in seguito
  app.use(express.bodyParser());
  // Utile nel caso in cui volessimo 'simulare' una PUT o una DELETE
  app.use(express.methodOverride());
  // Qui impostiamo il segreto con cui generare i cookie utente
  app.use(express.cookieParser("your secret here: SHOPPING!"));
  // Usa un sistema di gestione della sessione: DISABILITATO PER ORA...
  // app.use(express.session());
  // Usa il routing che verrà dichiarato in seguito
  app.use(app.router);
});

// ROUTING: che cos'è?
// quando si scrive un indirizzo nel browser tipo 'http://www.miosito.com/pagina1' il server
// che gestisce il sito - all'indirizzo 'http://www.miosito.com' - riceve una "request" in cui
// l'utente chiede di andare all'indirizzo "/pagina1": a questo indirizzo si può associare una
// azione e la conseguente pagina da mostrare

// Esempio:
// '/pagina1' =>
//   Guarda nel db i prodotti nello store e mostrali nella pagina prodotti.html

// Le richieste possono essere di due tipi sommariamente: GET e POST.
// app.get() ascolta le prime mentre
// app.post() ascolta le seconde.

// Nella directory routes c'è il file 'index.js' che contiene le direttive che assoceremo ai vari indirizzi.
var routes = require('./routes');

// L'indirizzo '/' è l'indirizzo di partenza: "http://www.miosito.com/"
app.get('/', routes.index);

// ROUTES RELATIVE AI PRODOTTI

// Mostra tutti i prodotti o una pagina di info per un prodotto specifico
// Scrivendo ':id' facciamo in modo che se l'utente scrive '/prodotti/abc'
// l'app può capire l'id del prodotto ('abc') in modo semplice - guarda il codice
// di mostraInfoProdotto per vedere come...
app.get('/prodotti/:id', routes.mostraProdotti);

// ROUTES RELATIVE AL CARRELLO

// Mostra il carrello
app.get('/carrello', routes.mostraCarrello);
// Aggiungi un prodotto al carrello: usa una POST qui!!
app.post('/carrello/:id', routes.aggiungiAlCarrello);
// Rimuovi un prodotto specifico dal carrello: usa una DELETE qui!!
app.delete('/carrello/:id', routes.rimuoviDalCarrello);

// ROUTES RELATIVE ALL'ACQUISTO

// Mostra gli oggetti da acquistare, chiede la conferma e chiedi il numero di carta
app.get('/compra', routes.confermaSpesa);
// Riceve il numero di carta e processa il pagamento
app.post('/compra', routes.pagaSpesa);

// ROUTES RELATIVE AI FILE CSS, JS E IMMAGINI
app.get('/css/:filename', routes.getCSS);
app.get('/js/:filename', routes.getJS);
app.get('/img/:filename', routes.getImg);

// FARE ATTENZIONE:
// le routes vengono provate tutte dall'alto in basso fino a che non se ne trova una che vada
// bene per l'indirizzo descritto: questo vuol dire che se si scrivono:
// app.get('/prodotti/:stile', routes.cambiaLoStile);
// app.get('/prodotti/:colore', routes.cambiaIlColore);
// per l'indirizzo: '/prodotti/viola' il server chiamerà la funzione 'cambiaLoStile' sempre!
// Quindi bisogna fare attenzione all'organizzazione e all'ordine delle routes.

// Ora che si è configurato tutto, far partire il Web Server
app.listen(PORT);
console.log('Server partito: andare alla pagina "http://localhost:'+PORT+'" per visualizzare l`app');
