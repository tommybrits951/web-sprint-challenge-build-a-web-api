// add middlewares here related to projects
const Proj = require('./projects-model')



async function validateProjId(req, res, next) {
    try {
        const {id} = req.params;
        const proj = await Proj.get(id)
        if (proj) {
            req.proj = proj;
            req.id = id;
            next()
        } else {
            res.status(404).json({message: "project not found"})
        }
    } catch (error) {
        next({status: 500, message: 'Oops! something went wrong'})
    }
}

async function checkProjBody(req, res, next) {
    const {name, description} = req.body;
    if (!name || !description) {
        res.status(400).json({message: `missing required fields!`})
    } else {
        req.name = name;
        req.description = description;
        
        next()
    }
}
module.exports = {
    validateProjId,
    checkProjBody,
}