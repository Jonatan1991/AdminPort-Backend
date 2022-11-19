require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Create express server
const app = express();

//Cors config
app.use(cors());

//Readin Body
app.use( express.json() );


//Database
dbConnection();

// Directorio público
app.use( express.static('public') );


//Routs
app.use( '/api/masterDevices', require('./routes/masterDevices'));
app.use( '/api/gateway', require('./routes/gateway'));
app.use( '/api/peripheralDevice', require('./routes/peripheralDevice'));

// Lo último
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
});


app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});


//Jona1991
//AhAKyDPiJj03xcCE