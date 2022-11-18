require('dotenv').config();

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


//Routs
app.use( '/api/masterDevices', require('./routes/masterDevices'));
app.use( '/api/gateway', require('./routes/gateway'));
app.use( '/api/peripheralDevice', require('./routes/peripheralDevice'));


app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});


//Jona1991
//AhAKyDPiJj03xcCE