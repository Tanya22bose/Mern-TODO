const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoControllers');

router.get('/ShowTask', todoController.showTask)

router.post('/AddTask', todoController.addTask)


router.post('/deleteTask/:id', todoController.deleteTask)

router.put('/EditTask/:id',todoController.EditTask)

module.exports = router;

//mongoose is a ORM : Object Relation Model
