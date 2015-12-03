var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var ObjectID = mongodb.ObjectID;

MongoClient = mongodb.MongoClient;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.send('...');
});

var url = 'mongodb://localhost:27017/saints_db';

// app.get('/api/nkosi', function(req, res){

// });


app.post('/api/locations', function(req,res){
		var eventLocation = req.body ;
	    MongoClient.connect(url, function(err, db) {
        var events = db.collection('events');
        events
            .insert(eventLocation)
            
            .then(function(results){
                res.send(results);
            })
            .catch(function(err){
                console.log(err);
                res.send({});
            });
    });
});

app.get('/api/locations', function(req,res){
      MongoClient.connect(url, function(err, db) {
        var events = db.collection('events');
        events
            .find({})
            .toArray()
            .then(function(results){
                res.send(results);
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send({});
            });
    });

});

app.get('/api/locations/:id', function(req, res){
	  MongoClient.connect(url, function(err, db) {
        var events = db.collection('events');
        events
            .findOne({_id : ObjectID(req.params.id)})
            .then(function(results){
                res.send(results);
            })
            .catch(function(err){
                // log the error to the console for now
                console.log(err);
                res.send({});
            });
    });

})

app.listen(3001, function(){
    console.log('app running on http://localhost:3001');
});