const express = require("express");
const uuid = require("uuid");
const app = express();
const dotenv = require('dotenv');

const {getDB, createObjectId} = require("./db")
dotenv.config({path: './config.env'});

const port = process.env.PORT || 8090;

const apiRouter = express.Router();

// =============================================================
// Middleware to logged the method, path, statuscode and amount of time needed
// =============================================================

app.use((req, res, next) => {
    let start = Date.now();
    res.once('finish', () => {
        let end = Date.now();
        let time = end - start;
        console.log("method",req.method, ",path", req.path, ",status code", res.statusCode, ", created in", time + 'ms');
    })
    next();
});


// =============================================================
// JSON-Parse middleware - to make sure all data that are received is JSON 
// =============================================================

app.use((req, res, next) => {
    // Check that the incoming data is JSON
    if (req.is('json')) {
      let data = '';
      // listening to the incoming stream of data and saving the chuck.toString to the "data" variable
      req.on('data', chunk => {
        console.log("chunk", chunk.toString());
        data += chunk.toString();
      });
      // when data reading are done, then listen to event end where the server try to parse the data
      req.on('end', () => {
         // when JSON data are not corrupted, then parse it and set it as the req.body.
         // finish the middleware and continue to the next one or run the http request.
        try {
          data = JSON.parse(data);
          req.body = data;
          next();
        } catch(e) { // if the JSON data is not acceptable, then send error message and end the data process
          res.status(400).end();
        }
      });
    } else {
      next();
    }
  });


// =============================================================
// TO GET THE WHOLE DATA FROM THE DATABASE
// =============================================================

apiRouter.get('/:user', (req, res) => {
    let userId = req.params.user;

    if (!userId) {
        return res.status(400).end();
    }

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


// =============================================================
// CREATE A TO DO LIST BOX
// =============================================================

function validate(todos) {
    return !!todos.data
};


apiRouter.post('/:user', (req, res) => {
    let userId = req.params.user;

    if (!userId) {
        return res.status(400).end();
    }
    
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


// =============================================================
// TO EDIT A TO DO LIST BOX
// =============================================================

apiRouter.put('/:todosid/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let userId = req.params.user;

    let clientData = req.body;

    if (!todoId || !userId) {
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


// =============================================================
// TO REMOVE A TO DO LIST BOX
// =============================================================

apiRouter.delete('/:todosid/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let userId = req.params.user;

    if (!todoId || !userId) {
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


// =============================================================
// TO ADD AN ITEM INSIDE A TO DO LIST BOX
// =============================================================

function unixTimestamp(t)
{
let date = new Date(t*1000);
let hour = date.getHours();
let min = "0" + date.getMinutes();
return hour+ ':' + min.substr(-2);
}


apiRouter.post('/:todosid/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let userId = req.params.user;
    let clientData = req.body;
   
    let today = new Date();
    let Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = Month[(today.getMonth())]+' '+today.getDate()+", "+today.getFullYear();

    let currentUnixTime = Math.round((+new Date()) / 1000);
    let time = unixTimestamp(currentUnixTime);

    let dateTime = date+' at '+time;

    clientData.id = uuid.v4();
    clientData.created = dateTime;

    if (!todoId || !userId) {
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


// =============================================================
// TO CLEAR ALL ITEMS INSIDE A TO DO LIST BOX
// =============================================================

app.delete('/todo/:todoid/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.todoid;
    let userId = req.params.user;

    if (!todoId || !userId) {
        return res.status(400).end();
    }

    db.collection(userId)
    .updateOne(
        {_id : createObjectId(todoId)},
        { "$set": {"data": []}  },
        { multi: true }
    )
    .then( () => {
        res.status(204).end();
        console.log("all items were deleted");
    })
    .catch( e => {
        console.error(e);
        res.status(500).end();
    })
});


// =============================================================
// TO MODIFY A SPECIFIC ITEM INSIDE A TO DO LIST BOX
// =============================================================

apiRouter.patch('/:todosid/item/:itemid/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let itemid = req.params.itemid;
    let userId = req.params.user;

    let clientData = req.body;

    if (!todoId || !itemid || !userId) {
        return res.status(400).end();
    }

    db.collection(userId)
    .updateOne( 
            {_id : createObjectId(todoId) , "data.id" : itemid } , 
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


// =============================================================
// TO DELETE A SPECIFIC ITEM INSIDE A TO DO LIST BOX
// =============================================================

apiRouter.delete('/:todosid/item/:itemid/user/:user', (req, res) => {
    const db = getDB();
    let todoId = req.params.todosid;
    let itemid = req.params.itemid;
    let userId = req.params.user;

    if (!todoId || !itemid || !userId) {
        return res.status(400).end();
    }

    db.collection(userId)
    .updateOne(
        {_id : createObjectId(todoId)},
        { $pull: { data: { id: itemid } } },
        { multi: true }
    )
    .then( () => {
        res.status(204).end();
        console.log("an item is deleted");
    })
    .catch( e => {
        console.error(e);
        res.status(500).end();
    })
});


// =============================================================
// TO MOVE A SPECIFIC ITEM FROM ONE TO DO LIST TO ANOTHER 
// =============================================================

apiRouter.patch('/:oldid/newtodo/:newid/item/:itemid/user/:user', (req, res) => {
    const db = getDB();
    let oldDocId = req.params.oldid;
    let newDocId = req.params.newid;
    let itemid = req.params.itemid;
    let userId = req.params.user;

    if (!oldDocId || !newDocId || !itemid || !userId) {
        return res.status(400).end();
    }

    db.collection(userId)
        .findOne({ 
             data: {$elemMatch : {id: itemid}}
         })
        .then( result => {
            let savedData;
            console.log("the result data", result.data)
            let index = result.data.findIndex(x => x.id === itemid);
            savedData = result.data[index];
            console.log("Saved Data", savedData)
            return savedData;
        })
        .then ( response => {
            return db.collection(userId)
            .updateOne( 
                {_id : createObjectId(newDocId)}, 
                {$push: {data: response}}
            )
        })
        .then( () => {
            return db.collection(userId)
            .updateOne( 
                {_id : createObjectId(oldDocId)},
                { $pull: { data: { id: itemid } } },
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
            res.status(500).end();
        })
});

app.use('/todos', apiRouter)


app.listen(port, () => {
    console.log("Started server at ", port)
});