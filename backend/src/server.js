const express = require('express');
const app = express();
const mongoose = require('mongoose');
const rotas = require('./rotas')
const port = 3000;
const hostname = 'localhost';

app.use(express.json())
app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://root:faesa123@localhost:27017/CampanhaVacina?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
db.once('open', function() {
    console.log("Banco de Dados Mongo conectado com sucesso");
});
app.get('/', function(req, res){
    res.json({
        status:"ok",
        message:"Servidor rodando "
    })
})

app.get('/', function(req,res){
    res.send('Servidor funcionando corretamente')
})

app.use("/api",rotas) 


app.listen(port,hostname, ()=>{
    console.log(`Servidor rodando no endereço: https://${hostname}:${port}`);
})