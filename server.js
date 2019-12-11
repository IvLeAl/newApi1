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


//Создаем переменную арр которая будет нашим веб сервером
var app = express();
var db;



app.use(bodyParser.json()); // что бы правильно парсить json
app.use(bodyParser.urlencoded({extended: true})); // что бы правильно парсить данные формы


// Массив переменных
var artists = [
    {
        id: 1,
        name: 'Metallica'
    },
    {
        id: 2,
        name: 'Iron Maiden'
    },
    {
        id: 3,
        name: 'Deep Purple'
    }
];


// //Описываем  для нашего приложения. То что будет просходить
// //когда мы будем заходить на URL

app.get('/', function (req, res) {
    db.collection('artists').find().toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    })

});


// //Описываем  который будет выводит наших исполнителей

 app.get('/artists', function (req, res) {
     db.collection('artists').function({id: ObjectID(req.params.id)}, function (err, docs) {
         if (err) {
             console.log(err);
             return res.sendStatus(500);
         }
         res.send(docs);
     })
 });


// //Описываем  который будет возвращать отдельного исполнителя

app.get('/artists/:id', function (req, res) {
     console.log(req.params);
     var artist = artists.find(function (artist) {
         return artist.id === Number(req.params.id)
     });
     res.send(artist);
});


app.post('/artists', function (req, result) {
    var artist = {
      name: req.body.name
    };

    db.collection('artists').insert(artist, function (err, result) {
        if (err) {
            console.log(err);
           return res.sendStatus(500);
        }
        res.send(artist);
    })
});

 //Реализуем обновление данных
 app.put('/artists/:id', function (req, res) {
    var artist = artists.find(function (artist) {
    return artist.id === Number(req.params.id)
    });
   artist.name = req.body.name;
   res.sendStatus(200);
 });

 app.delete('/artists/:id', function (req, res){
    artists = artists.filter(function (artist) {
       return artist.id !== Number(req.params.id);
    });
   res.sendStatus(200);
 });




// //Настроить сервер что бы он был запущен на определенном порту
// app.listen(3012,function () {
//     console.log('API app started');
// });
//
//
MongoClient.connect('mongodb://localhost:27017/myapi' , { useUnifiedTopology: true } , function (err, database) {
    if(err) {
        return console.log(err);
    }
    db = database;
    app.listen(3012,function () {
     console.log('API app started');
 });
});

