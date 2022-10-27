//on a installé express avec 'npm install express --save'

const express = require('express');
//importe le module express

const app = express();
//on appelle la méthode express

const fetch = require('node-fetch');

//cette appli Express contient quatre éléments de middleware

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
    //indispensable pour lancer le middleware suivant, sinon la requête ne se termine pas
});
//enregistre 'Requête reçue !' dans la console et passe l'exécution

app.use((req, res, next) => {
    res.status(201);
    next();
});
//ajoute le code d'état 201 à la réponse et passe l'exécution

app.use((req, res, next) => {
    getQuote(res);
    next();
});
//envoie la réponse JSON et passe l'exécution

const getQuote = (res) => {
    fetch('https://www.affirmations.dev/')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        res.send(data);
    })
    .catch((e) => console.log('There is a mistake: ' + e));
}

app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
})
//enregistre 'Réponse envoyée avec succès' ; pas besoin du paramètre next car c'est le dernier middleware

module.exports = app;
//pour pouvoir accéder à notre app depuis les autres fichiers de notre projet dont le serveur node
