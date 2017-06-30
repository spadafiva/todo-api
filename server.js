var express = require('express');
var bodyParser = require('body-parser');
var Todo = require('./models/todo-item');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Todo API Root");
});

// GET /todos
app.get('/todos', function (req, res) {
    var completedQuery = req.query.completed;
    var filters = {};
    if (completedQuery) {
        filters.completed = completedQuery;
    }
    console.log(filters);
    Todo.where(filters)
        .fetchAll()
        .then(function (todos) {
            res.json(todos);
        }).catch(function(e){
        res.status(400).send(e);
    });
});

// GET /todos/:id
app.get('/todos/:id', function (req, res) {

    Todo.where({id: req.params.id})
        .fetch()
        .then(function (todo) {
            res.json(todo);
        }).catch(function(e){
        res.status(400).send(e);
    })
});

// POST /todos
app.post('/todos', function (req, res) {


    new Todo({
        description: req.body.description,
        completed: req.body.completed
    })
        .save()
        .then(function (saved) {
            res.json(saved);
        }).catch(function(e){
            res.status(400).send(e);
    })
});


// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
    Todo
        .where('id', req.params.id)
        .destroy()
        .then(function(destroyed){
            res.json(destroyed);
        }).catch(function(e){
        res.status(400).send(e);
    })
});

// PUT /todos/:id
app.put('/todos/:id', function (req, res) {

    Todo.where({id: req.params.id})
        .fetch()
        .then(function (todo) {

            return  todo.save(req.body);

        }).then(function (savedUser) {

        return res.json(savedUser);

    }).catch(function(e){

        res.status(400).send(e);

    });
});






app.listen(PORT, function () {
   console.log("Todo api started on port " + PORT);
});