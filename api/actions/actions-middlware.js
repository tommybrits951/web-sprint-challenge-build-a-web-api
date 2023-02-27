const Actions = require('./actions-model');


async function validateActionId(req, res, next) {
    try {
        const {id} = req.params;
        const action = await Actions.get(id);
        if (!action) {
            res.status(404).json({message: "action not found"})
        } else {
            req.action = action;
            req.id = id
            next()
        }
    } catch (error) {
        next({status: 500, message: 'Whoops e daisy. Somethings wrong'})
    }
}

async function checkActionBody(req, res, next) {
    try {
        const {description, notes, project_id} = req.body;
        if (!description || !notes || !project_id) {
            res.status(400).json({message: "missing required field"})
        } else {
            next()
        }
    } catch (error) {
        next({status: 500, message: error.message})
    }
}



module.exports = {
    validateActionId,
    checkActionBody   
}