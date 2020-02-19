const express = require('express');

const db = require("./data/dbConfig.js");

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome'})
})

server.post('/api/cars', (req, res) => {
    db('cars')
    .insert(req.body)
    .then( resp => {
        console.log('insert', resp);
        res.status(201).json({id: resp[0], ...req.body});
    })
    .catch( err => {
        res.status(500).json({errorMessage: 'There was an error creating the account.'})
    })
})

server.get('/api/cars', (req, res) => {
    db('cars')
    .then( cars => {
        console.log('get all', cars);
        res.status(200).json(cars);
    })
    .catch( err => {
        res.status(500).json({errorMessage: "Failed to get accounts."})
    })
})

server.get('/api/cars/:id', (req, res) => {
    const { id } = req.params;
    
    db('cars')
    .where({id})
    .then( car => {
        console.log('get id', car);
        if(car.length) {
            res.status(200).json(car[0]);
        } else {
            res.status(404).json({errorMessage: 'User does not exist.'})
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: 'Failed to get the specified user.'})
    })
})

module.exports = server;