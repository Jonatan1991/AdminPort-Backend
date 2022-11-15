require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Create express server
const app = express();

//Cors config
app.use(cors());


//Database
dbConnection();


//Routs
app.get('/', (req, res) =>{

    res.json({ 
        ok: true,
        msg: 'Jonatan'
    })
});

app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});


//Jona1991
//AhAKyDPiJj03xcCE