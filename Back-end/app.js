const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const rechercheModule = require('./Modules/rechercheModule');
const ModuleUser = require('./Modules/userModule');

app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Accueil Back-end');
})

app.use('/', rechercheModule);
app.use('/user', ModuleUser);


app.listen(port, () => {
    console.log("node application is running on port " + port + "http://127.0.0.1:8080");
})