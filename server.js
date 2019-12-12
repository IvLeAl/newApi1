/**
 * Created by Владелец on 09.12.2019.
 */


//Подключаем библиотеку express
var express = require('express');

// Подключаем библиотеку bodyParser, которая будет парсить тело запроса и запиывать то что мы передаем
var bodyParser = require('body-parser');

//Подключаем базу данных

var MongoClient  = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID;

var db = require('./db');

var artistsController = require('./controllers/artists');
//Создаем переменную арр которая будет нашим веб сервером
var app = express();


app.use(bodyParser.json()); // что бы правильно парсить json
app.use(bodyParser.urlencoded({extended: true})); // что бы правильно парсить данные формы


// //Описываем  для нашего приложения. То что будет просходить
// //когда мы будем заходить на URL

app.get('/', function (req, res) {
       res.send('Hello API');
});


app.get('/artists', artistsController.all);

app.get('/artists/:id', artistsController.findById);


app.post('/artists', artistsController.create);

 //Реализуем обновление данных
 app.put('/artists/:id', function (req, res) {
    db.get().collection('artists').updateOne(
        {_id: ObjectID(req.params.id) },
        {name: req.body.name },
        function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
 });

 app.delete('/artists/:id', function (req, res){
     db.get().collection('artists').deleteOne(
         {id: ObjectID(req.params.id) },
         function (err, result) {
             if (err) {
                 console.log(err);
                 return res.sendStatus(500);
             }
             res.sendStatus(200);
         }
     )
 });




db.connect('mongodb://localhost:27017/api' , { useUnifiedTopology: true } , function (err) {
    if(err) {
        return console.log(err);
    }
    app.listen(3012,function () {
     console.log('API app started');
 });
});

