//ce programme va écouter des requêtes HTTP et y répondre
//on a initialisé le projet avec la commande npm init

const { cp } = require('fs');
const http = require('http');
//récupère le module http qui va nous permettre de créer un serveur
const app = require('./app');
//récupère l'application app dans notre fichier app.js

//on set l'appli sur le port 
// app.set('port', process.env.PORT || 3000);
//remplace la méthode ci-dessus par une solution plus stable, ci-dessous :

const normalizePort = val => {
    const port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }
    if (port>=0){
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || 3000);
//fonction qui renvoie un port valide, qu'il soit fournit sous la forme d'un numéro ou d'une chaîne

app.set('port', port);
//on set l'appli sur le port 

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};


// const server = http.createServer((req, res) => {
    //fonction anonyme à deux paramètres, la requête et la réponse
    // res.end('Voilà la toute nouvelle réponse du serveur !');
    //on utilise la méthode end pour renvoyer en string à l'appelant
// });

const server = http.createServer(app);
//on appelle la méthode server du package http qui prend pour argument la fonction qui sera appelée à chaque requête du serveur
//ici notre app dans app.js

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
//on indique le numéro du port qui va écouter (celui par défaut ou le port 3000)
//auparavant server.listen(process.env.PORT || 3000), remplacer par notre variable port et la fonction normalizePort 

//pour ne pas redémarrer le serveur à chaque modif, en ligne de commande : 'npm install nodemon' puis 'npx nodemon server' -> surveille les modifications du fichier et redémarre le serveur quand il y a des mises à jour