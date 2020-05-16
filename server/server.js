const express = require("express");
const uuid = require("uuid");

const app = express();
app.use(express.json());

const {getDB, createObjectId} = require("./db")

app.get('/todos/', (req, res) => {
    const db = getDB();
    db.collection("todolist")
    .find({})
    .toArray()
    .then( data => {
        console.log("Data from server", data)
        res.send(data);
    })
    .catch( err => {
        res.status(500).end();
    })
});

app.get('/todos/:id', (req, res) => {
    let todoId = req.params.id;

    const db = getDB();
    db.collection("todolist")
    .findOne({_id: createObjectId(todoId)})
    .then( todo => {
        console.log("todo", todo)
        res.send(todo);
    })
    .catch( e => {
        console.error(e)
        res.status(500).end();
    })
});

function validate(todos) {
    return !!todos.data
};

// CREATE A TO DO LIST BOX
app.post('/todos/', (req, res) => {
    const db = getDB();
    let data = req.body;
    data.data = [];
    if(validate(data) === false) return res.status(400).end();

    db.collection("todolist")
    .insertOne(data)
    .then( result => {
        data._id = result.insertedId;
        res.status(201).send(data);
        console.log("Created ", data);
    })
    .catch( e => {
        console.error(e)
        res.status(500).end();
    })
});

// TO EDIT/MODIFY A TO DO LIST BOX
app.put('/todos/:id', (req, res) => {
    const db = getDB();
    let todoId = req.params.id;
    let clientData = req.body;

    if (!todoId) {
        return res.status(400).end();
    }

    db.collection("todolist")
    .updateOne(
        {_id : createObjectId(todoId)},
        {$set: {title: clientData.title}}
    )
    .then(result => {
        res.send(result)
    })
    .catch( e => {
        console.error(e)
        res.status(500).end();
    })
});

// TO REMOVE A TO DO LIST BOX

app.delete('/todos/:id', (req, res) => {
    const db = getDB();
    let todoId = req.params.id;

    if (!todoId) {
        return res.status(400).end();
    }

    db.collection("todolist")
    .deleteOne({_id: createObjectId(todoId)})
    .then( () => {
        res.status(204).end()
    })
    .catch( e => {
        console.error(e)
        res.status(500).end();
    })
});

// TO ADD A LIST INSIDE A SPECIFIC TO DO LIST BOX

app.post('/list/:todosid', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let clientData = req.body;
   
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let dateTime = date+' '+time;

    clientData.id = uuid.v4();
    clientData.created = dateTime;

    if (!todoId) {
        return res.status(400).end();
    }

    db.collection("todolist")
    .updateOne(
        {_id : createObjectId(todoId)},
        {$push: {data: clientData}}
    )
    .then(result => {
        res.send(clientData)
    })
    .catch( e => {
        console.error(e)
        res.status(500).end();
    })
});

// TO MODIFY A SPECIFIC LIST INSIDE A SPECIFIC TO DO LIST BOX

app.patch('/todos/:todosid/list/:listid', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let listid = req.params.listid

    let clientData = req.body;

    if (!todoId || !listid) {
        return res.status(400).end();
    }

    db.collection("todolist")
    .updateOne( 
            {_id : createObjectId(todoId) , "data.id" : listid } , 
                    {$set : {"data.$.todoTitle" : clientData.todoTitle,
                            "data.$.description" : clientData.description,
                            }
                    } , 
                    false , 
                    true
            )
    .then(result => {
        res.send(result)
        console.log("Edited Array", clientData)
    })
    .catch( e => {
        console.error(e)
        res.status(500).end();
    })
});

// TO DELETE A SPECIFIC LIST INSIDE A SPECIFIC TO DO LIST BOX

app.delete('/todos/:todosid/list/:listid', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let listid = req.params.listid

    console.log('todoid ', todoId)
    console.log('listid ',listid)

    if (!todoId || !listid) {
        return res.status(400).end();
    }

    db.collection("todolist")
    .updateOne(
        {_id : createObjectId(todoId)},
        { $pull: { data: { id: listid } } },
        { multi: true }
    )
    .then( () => {
        res.status(204).end()
        console.log("List item is deleted")
    })
    .catch( e => {
        console.error(e)
        res.status(500).end();
    })
});

// TO MOVE A SPECIFIC LIST FROM ONE TO DO LIST BOX TO ANOTHER TO DO LIST BOX

app.get('/todos/:oldid/todos/:newid/list/:listid', (req, res) => {
    const db = getDB();
    let oldDocId = req.params.oldid;
    let newDocId = req.params.newid;
    let listId = req.params.listid;
    let savedData;
    console.log("LISTID ", listId)

    if (!oldDocId || !newDocId || !listId) {
        return res.status(400).end();
    }

    db.collection("todolist")
   .findOne({ 
        data: {$elemMatch : {id: listId}}
    })
    .then(result=> {
        console.log("the result data", result.data)
        let index = result.data.findIndex(x => x.id === listId);
        savedData = result.data[index];
        console.log("Saved Data", savedData)
    })

    if (savedData !== null || savedData !== undefined) {
        console.log("ENTER HERE!")
        console.log("the saved data to push", savedData)
        db.collection("todolist")
        .updateOne( 
            {_id : createObjectId(newDocId)}, 
            {$push: {data: savedData}}
        )
        .then(result => {
            res.send(result)
            console.log("Moved Array", savedData)
        })  
        .catch( e => {
            console.error(e)
            res.status(500).end();
        })
    }
   

    db.collection("todolist")
    .updateOne( 
        {_id : createObjectId(oldDocId) , "data.id" : listId } , 
            {_id : createObjectId(oldDocId)},
            { $pull: { data: { id: listId } } },
            { multi: true }
    )
    .then( () => {
        res.status(204).end()
        console.log("List item is deleted")
    })
});



app.listen(8090, () => {
    console.log("Started server at 8090")
});