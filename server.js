var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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
    var matchedTodo = _.findWhere(todos, {id: idToFind});

    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
});

// POST /todos
app.post('/todos', function (req, res) {
    var body = req.body;
    body = _.pick(body, ['description', 'completed']);
    body.description = body.description.trim();

    var incomplete = !_.isBoolean(body.completed);
    var missingBody = !_.isString(body.description);
    var emptyRequest = body.description === 0;

    if (incomplete || missingBody || emptyRequest) {
        return res.status(400).send()
    } else {
        body.id = todoNextId;
        todos.push(body);
        todoNextId++;
        res.json(body);
    }
});


// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
    var id = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: id});

    if (matchedTodo) {
        todos = _.without(todos, matchedTodo);
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }

});

// PUT /todos/:id
app.put('/todos/:id', function (req, res) {
    var body = _.pick(req.body, ['description', 'completed']);
    var validAttributes = {};

    if (body.hasOwnProperty('completed')) {
       if(_.isBoolean(body.completed)) {
           validAttributes.completed = body.completed;
       } else {
           return res.status(400).send();
       }
    } else {
        // not updating, no attribute provided
    }

    if (body.hasOwnProperty('description')) {
        body.description = body.description.trim();
        var missingBody = !_.isString(body.description);
        var emptyRequest = body.description === 0;

        if (missingBody || emptyRequest) {
            // bad
            return res.status(400).send();
        } else {
            // good
            validAttributes.description = body.description;
        }
    } else {
        // not updating, we're good here
    }

    var id = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: id});

    if (!matchedTodo) {
        return res.status(404).send();
    }

    _.extend(matchedTodo, validAttributes)
    res.json(matchedTodo);

})






app.listen(PORT, function () {
   console.log("Todo api started on port " + PORT);
});