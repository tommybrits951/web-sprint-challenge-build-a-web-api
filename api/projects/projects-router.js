const express = require("express")
const Proj = require("./projects-model")
const {validateProjId, checkProjBody} = require("./projects-middleware")
const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const projects = await Proj.get()
        if (!projects) {
            res.status(404).json({message: "projects not found"})
        } else {
            res.status(200).json(projects)
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:id', validateProjId, async (req, res, next) => {
    try {
        res.status(200).json(req.proj)
    } catch (error) {
        next(error)
    }
})

router.post('/', checkProjBody, async (req, res, next) => {
    try {
        const proj = await Proj.insert(req.body)
        res.status(201).json(proj)
    } catch (error) {
        next(error)
    }
})



router.put("/:id", validateProjId, async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name, description, completed} = req.body
        if (!name || !description || completed === undefined) {
            res.status(400).json({message: "missing required fields"})
        } else {

            const proj = await Proj.update(req.params.id, {name: req.body.name, description: req.body.description, completed: req.body.completed})   
            res.status(201).json(proj)
        }
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", validateProjId, async (req, res, next) => {
    try {
        const {id} = req.params;
        const deletedProj = await Proj.remove(id)
        res.json(req.proj)
    } catch (error) {
        next(error)
    }
})


router.get("/:id/actions", validateProjId, async (req, res, next) => {
    try {
        
        const actions = await Proj.getProjectActions(req.id)
        res.status(200).json(actions)
    } catch (error) {
        next(error)
    }
})





router.use((error, req, res, next) => {
    res.status(error.status || 500).json({message: error.message, customMessage: "I don't care what they say, I'm in love with you!"})
})


module.exports = router


