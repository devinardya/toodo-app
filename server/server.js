const express = require("express");
const uuid = require("uuid");

const app = express();
//app.use(express.json());
const {getDB, createObjectId} = require("./db")

// Middleware to logged the method, path, statuscode and amount of time needed
app.use((req, res, next) => {
    let start = Date.now();
    res.once('finish', () => {
        let end = Date.now();
        let time = end - start;
        console.log(req.method, req.path, res.statusCode, time + 'ms');
    })
    next();
});

// JSON-Parse middleware - to make sure all data that are received is JSON 
app.use((req, res, next) => {
    // Check that Content-Type: application/json
    if (req.is('json')) {
      let data = '';
      req.on('data', chunk => {
        data += chunk.toString();
      });
  
      req.on('end', () => {
        try {
          data = JSON.parse(data);
          req.body = data;
          next();
        } catch(e) {
          res.status(400).end();
        }
      });
    } else {
      next();
    }
  });



// TO GET THE WHOLE DATA FROM THE DATABASE
app.get('/todos/:user', (req, res) => {
    let userId = req.params.user;
    const db = getDB();
    db.collection(userId)
    .find({})
    .toArray()
    .then( data => {
        console.log("Data from server FIRST TIME", data);
        res.status(200).send(data);
    })
    .catch( err => {
        res.status(500).end();
    })
});

/* // TO GET INDIVIDUAL TODOBOX DATA

app.get('/todos/:id/user/:user', (req, res) => {
    let todoId = req.params.id;
    let userId = req.params.user;

    const db = getDB();
    db.collection(userId)
    .findOne({_id: createObjectId(todoId)})
    .then( todo => {
        console.log("todo", todo);
        res.status(200).send(todo);
    })
    .catch( e => {
        console.error(e);
        res.status(500).end();
    })
}); */

function validate(todos) {
    return !!todos.data
};

// CREATE A TO DO LIST BOX
app.post('/todos/:user', (req, res) => {
    let userId = req.params.user;
    const db = getDB();
    let data = req.body;
    data.data = [];
    if(validate(data) === false) return res.status(400).end();

    db.collection(userId)
    .insertOne(data)
    .then( result => {
        data._id = result.insertedId;
        res.status(201).send(data);
        console.log("Created ", data);
    })
    .catch( e => {
        console.error(e);
        res.status(500).end();
    })
});

// TO EDIT/MODIFY A TO DO LIST BOX
app.put('/todos/:id/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.id;
    let userId = req.params.user;

    let clientData = req.body;

    if (!todoId) {
        return res.status(400).end();
    }

    db.collection(userId)
    .updateOne(
        {_id : createObjectId(todoId)},
        {$set: {title: clientData.title}}
    )
    .then(result => {
        res.status(200).send(clientData);
    })
    .catch( e => {
        console.error(e);
        res.status(500).end();
    })
});

// TO REMOVE A TO DO LIST BOX

app.delete('/todos/:id/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.id;
    let userId = req.params.user;

    if (!todoId) {
        return res.status(400).end();
    }

    db.collection(userId)
    .deleteOne({_id: createObjectId(todoId)})
    .then( () => {
        res.status(204).end();
    })
    .catch( e => {
        console.error(e);
        res.status(500).end();
    })
});

// TO ADD A LIST INSIDE A SPECIFIC TO DO LIST BOX

app.post('/list/:todosid/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let userId = req.params.user;
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

    db.collection(userId)
    .updateOne(
        {_id : createObjectId(todoId)},
        {$push: {data: clientData}}
    )
    .then(result => {
        res.status(201).send(clientData)
    })
    .catch( e => {
        console.error(e);
        res.status(500).end();
    })
});

// TO MODIFY A SPECIFIC LIST INSIDE A SPECIFIC TO DO LIST BOX

app.patch('/todos/:todosid/list/:listid/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let listid = req.params.listid;
    let userId = req.params.user;

    let clientData = req.body;

    if (!todoId || !listid) {
        return res.status(400).end();
    }

    db.collection(userId)
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
        res.status(200).send(clientData);
        console.log("Edited Array", clientData);
    })
    .catch( e => {
        console.error(e);
        res.status(500).end();
    })
});

// TO DELETE A SPECIFIC LIST INSIDE A SPECIFIC TO DO LIST BOX

app.delete('/todos/:todosid/list/:listid/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let listid = req.params.listid;
    let userId = req.params.user;

    console.log('todoid ', todoId)
    console.log('listid ',listid)

    if (!todoId || !listid) {
        return res.status(400).end();
    }

    db.collection(userId)
    .updateOne(
        {_id : createObjectId(todoId)},
        { $pull: { data: { id: listid } } },
        { multi: true }
    )
    .then( () => {
        res.status(204).end();
        console.log("List item is deleted");
    })
    .catch( e => {
        console.error(e);
        res.status(500).end();
    })
});

// TO MOVE A SPECIFIC LIST FROM ONE TO DO LIST BOX TO ANOTHER TO DO LIST BOX

app.patch('/todos/:oldid/todos/:newid/list/:listid/user/:user', (req, res) => {
    const db = getDB();
    let oldDocId = req.params.oldid;
    let newDocId = req.params.newid;
    let listId = req.params.listid;
    let userId = req.params.user;

    if (!oldDocId || !newDocId || !listId) {
        return res.status(400).end();
    }

    db.collection(userId)
        .findOne({ 
             data: {$elemMatch : {id: listId}}
         })
        .then( result => {
            let savedData;
            console.log("the result data", result.data)
            let index = result.data.findIndex(x => x.id === listId);
            savedData = result.data[index];
            console.log("Saved Data", savedData)
            return savedData;
        })
        .then ( response => {
            db.collection(userId)
            .updateOne( 
                {_id : createObjectId(newDocId)}, 
                {$push: {data: response}}
            )
        })
        .then( () => {
            db.collection(userId)
            .updateOne( 
                {_id : createObjectId(oldDocId)},
                { $pull: { data: { id: listId } } },
                { multi: true }
            )
        })
        .then( () => {
            return db.collection(userId)
            .find({})
            .toArray()
        })
        .then( data => {
            console.log("Data from server", data)
            res.status(200).send(data);
        })
        .catch( e => {
            console.error(e);
            res.status(400).end();
        })


    /* db.collection(userId)
   .findOne({ 
        data: {$elemMatch : {id: listId}}
    })
    .then(result=> {
        
        console.log("the result data", result.data)
        let index = result.data.findIndex(x => x.id === listId);
        savedData = result.data[index];
        console.log("Saved Data", savedData)

       
        if (savedData !== null || savedData !== undefined) {
            
            console.log("the saved data to push", savedData)
            db.collection(userId)
            .updateOne( 
                {_id : createObjectId(newDocId)}, 
                {$push: {data: savedData}}
            )
            .then(result => {
                //res.send(result)
                console.log("Moved Array", savedData)
            })  
            .catch( e => {
                console.error(e);
                res.status(500).end();
            })

                
            db.collection(userId)
            .updateOne( 
                {_id : createObjectId(oldDocId)},
                { $pull: { data: { id: listId } } },
                { multi: true }
            )
            .then( () => {
                res.status(204).end();
                console.log("List item is deleted")
            })
        }
   */

       /*  db.collection(userId)
        .find({})
        .toArray()
        .then( data => {
            console.log("Data from server", data)
            res.status(200).send(data);
        })
        .catch( err => {
            res.status(500).end();
        }) */

    //}) 


});


app.listen(8090, () => {
    console.log("Started server at 8090")
});