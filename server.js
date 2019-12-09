/**
 * Created by Владелец on 09.12.2019.
 */




//Подключаем библиотеку express
const express        = require('express');

//Подключаем библиотеку bodyParser, которая будет парсить тело запроса и запиывать то что мы передаем
const bodyParser     = require('body-parser');

//Создаем переменную арр которая будет нашим веб сервером
var app = express();

app.use(bodyParser.json()); // что бы правильно парсить json
app.use(bodyParser.urlencoded({extended: true})); // что бы правильно парсить данные формы



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





//Описываем route для нашего приложения. То что будет просходить
//когда мы будем заходить на URL

app.get('/', function (req, res) {
    res.send('hello API');
});

//Описываем route который будет выводит наших исполнителей

app.get('/artists', function (req, res) {
    res.send(artists);
});

//Описываем route который будет возвращать отдельного исполнителя

app.get('/artists/:id', function (req, res) {
    console.log(req.params);
    var artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id);
    });
    res.send(artist);
});


app.post('/artists', function (req, res) {
    var artist = {
        id: Date.now(),
        name: req.body.name
    };
    artists.push(artist);
    res.send(artist);
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
        return artist.id != Number(req.params.id);
    });
    res.sendStatus(200);
});
//Настроить сервер что бы он был запущен на определенном порту
app.listen(3012,function () {
    console.log('API app started');
});

