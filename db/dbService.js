// Simuliamo un DB per ora, poi si passerà ad un qualcosa di più serio...

// usiamo la libreria Underscore per alcune funzioni di utilità
var _ = require('underscore');

// Il servizio DB va gestito con il sistema delle callback

var prodotti = {};
var carrelli = {};
// popoliamo il db con qualche prodottoper ora

var counter = 1;

//************************************************************//
//                   Gestione Prodotti                        //
//************************************************************//

function aggiungiProdotto(prodotto, callback){
  // aggiungiamo un id al prodotto
  prodotto.id = 's'+counter++;
  // salviamolo nel finto DB
  // facciamo una copia di sicurezza dell'oggetto
  prodotti[prodotto.id] = _.clone(prodotto);
  // fatto! ora torniamo il nuovo id salvato:
  // torniamo un array per essere uniformi con il metodo successivo
  callback(null, [prodotto.id]);
}

function aggiungiProdotti(listaProdotti, callback){
  var prodotto;
  var ids = [];
  for(var i=0; i<listaProdotti.length; i++){
    prodotto = listaProdotti[i];
    prodotto.id = 's'+counter++;
    prodotti[prodotto.id] = _.clone(prodotto);
    // mettiamo da parte l'id per ritornarlo dopo insieme agli altri
    ids.push(prodotto.id);
  }
  callback(null, ids);
}

function rimuoviProdotto(id, callback){
  var rimosso;
  if(id && prodotti[id]){
    rimosso = _.clone(prodotti[id]);
    delete prodotti[id];
    callback(null, rimosso);
  }
  callback('ID non trovato!');
}

function prodottoPerId(id, callback){
  // Nel caso non fosse nel DB la funzione ritornerà un oggetto vuoto
  var prodotto = _.clone(prodotti[id]);
  // Gestiamo il tutto con la callback:
  if(prodotto){
    callback(null, prodotto);
  } else {
    callback('ID non trovato!');
  }
}

//************************************************************//
//                   Gestione Carrello                        //
//************************************************************//

function aggiungiProdottoAlCarrello(utenteId, prodottoId, quanti, callback){
  // consideriamo un carrello ad utente...
  if(!carrelli[utenteId]){
    carrelli[utenteId] = {id: utenteId, prodotti: []};
  }
  carrelli[utenteId].prodotti.push({id: prodottoId, quanti: quanti || 0});
  // fatto! ora torniamo true per dire che è andato tutto bene
  callback(null, true);
}

function rimuoviProdottoDalCarrello(utenteId, prodottoId, quanti, callback){
  // Nel caso in cui non ci fosse un carrello con quell'id, torniamo un errore
  if(!carrelli[utenteId]){
    return callback('Carrello non trovato!');
  }
  // Viceversa iteriamo l'array dei prodotti fino a trovare il prodotto...
  var rimosso = false;
  for(var i=0; i<carrelli[utenteId].prodotti && !rimosso; i++){
    if(carrelli[utenteId].prodotti[i].id === prodottoId){
      carrelli[utenteId].prodotti.slice(i, 1);
      rimosso = true;
    }
  }
  // Se è stato rimosso torniamo true, altrimenti false
  // non è andato niente storto, ma segnaliamo che qualcosa di strano è successo...
  if(rimosso){
    callback(null, true);
  } else {
    callback(null, false);
  }
}

function carrelloPerId(utenteId, callback){
  var carrello = _.clone(carrelli[utenteId]);
  // Se il carrello lo si è trovato torniamolo
  if(carrello){
    return callback(null, carrello);
  }
  // altrimenti torniamo un errore
  callback('ID non trovato!');
}