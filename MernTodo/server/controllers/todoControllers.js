const HttpResponse = require('../models/http-response');
const todos = require('../models/todos');

const showTask = async(req, res) => {
    let list = [];

    try {
        list = await todos.find();
    }

    catch (err) {
        const error = new HttpResponse('Something went wrong while checking user email',500);
        return res.status(500).json({ response: error })
    }
    res.status(200).json(list)
}
var addTask = async(req,res) => {
    const data = req.body;
    var createTask = new todos(data);
    console.log('created');

    try{
        await createTask.save();
    }

    catch (err){
        console.log(err);
        const error = new HttpResponse(
            err,
            500
        );
        return res.status(500).json({ response: error })
    }

    res.status(201).json({
        data
    });
}

var deleteTask= async(req,res) => {
    const {id} = req.params;
    console.log(id)
    try {
        await todos.findByIdAndDelete(id);
        console.log('deleted');
        res.send({success : true});
    }
    catch(error) {
        console.log(error);
        res.status(500).send({success : false });
        return;
    }
}

 var EditTask = async(req, res) =>{
    const id = req.params.id;
    const data = req.body;
    try{
        await todos.findByIdAndUpdate(id,data, {new : true});
        res.status(200).send({success: true});
        console.log('updated')
    }
    catch (error) {
        console.log(error);
        res.status(500).send({success: false});
        return;
        }
}

exports.deleteTask = deleteTask;
exports.addTask = addTask;
exports.EditTask = EditTask;
exports.showTask = showTask;


   /* try{
        titansDb
    .collection("todoItems")
    .find()
    .toArray()
    .then(result => {
        res.status(200).send(result);
    })}
    
    catch(err) {
        console.log(error);
        res.status(500).send();
    }
}

var createTodoItem = (req,res) => {
    titansDb.collection("todoItems").insertOne(req.body, (err, result) => {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(200).send(result);
    })
}
var deleteTodoItem = (req,res) => {
    
    titansDb
    .collection("todoItems").deleteOne(req.body, (err) => {
        if (err) {
            res.status(500).send();
            return;
        }
        res.status(200).send();
    })
}

var editTodoItem = (req,res) => {

}
*/

