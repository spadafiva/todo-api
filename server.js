var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Todo API Root");
});

// GET /todos
app.get('/todos', function (req, res) {
    res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
    var idToFind = parseInt(req.params.id, 10);

    todos.forEach(function(todo) {
        if (todo.id === idToFind) {
            res.json(todo);
        }
    });
        res.status(404).send();
});

// POST /todos
app.post('/todos', function (req, res) {
    var body = req.body;

    body.id = todoNextId;
    todos.push(body);
    todoNextId++;

    res.json(body);
})



app.listen(PORT, function () {
   console.log("Todo api started on port " + PORT);
});