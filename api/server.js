const express = require('express');
const server = express();
const morgan = require('morgan');
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router')


server.use(express.json());
server.use(morgan('dev'));
server.use("/api/projects", projectsRouter)
server.use("/api/actions", actionsRouter)

server.get('/love', (req, res) => {
    res.json({message: "I love you."})
})



module.exports = server;
