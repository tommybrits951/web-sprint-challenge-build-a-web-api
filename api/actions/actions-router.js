const {validateActionId, checkActionBody} = require('./actions-middlware')
const express = require('express');
const Actions = require("./actions-model")
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions)
    } catch (error) {
        next(error)
    } 
})

router.get('/:id', validateActionId, async (req, res, next) => {
    try {
        res.status(200).json(req.action)
    } catch (error) {
        next(error)
    }
})


router.post("/", checkActionBody, async (req, res, next) => {
    try {
        const action = await Actions.insert(req.body);
        res.status(201).json(action)
    } catch (error) {
        next(error)
    }
})

router.put("/:id", checkActionBody, validateActionId, async (req, res, next) => {
    try {
        const {id} = req.params;
        const action = await Actions.update(id, req.body)
        res.status(201).json(action)
    } catch (error) {
        next(error)
    }
})


router.delete("/:id", validateActionId, async (req, res, next) => {
    try {
        const {id} = req.params;
        const action = await Actions.remove(id)
        res.json(req.action)
    } catch (error) {
        next(error)
    }
})


router.use((error, req, res, next) => {
    res.status(error.status || 500).json({message: error.message})
})

module.exports = router