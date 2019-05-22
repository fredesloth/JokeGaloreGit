const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Joke = require('../models/joke');


router

    .get('/jokes', (req, res) => {
        controller.jokesGet()
            .then(val => res.json(val))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
    })

    .post('/jokes', (req, res) => {
        // Create new joke to own db
        const {setup, punchline} = req.body;
        controller.createJoke(setup, punchline)
            .then(result => res.json({message: 'Joke saved!', joke: result}))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            })

    .get('/jokes/:id', (req, res) => {
        controller.jokeGet(req.params.id)
            .then(val => res.json(val))
            .catch(err => {
                console.log("Error: " + err);
                if(err.stack) console.error(err.stack);
                //res.sendStatus(404); Not found!
                res.status(500).send(err);
            });
    })

    .put('/jokes/:id', (req, res) => {
        const {setup, punchline} = req.body;
        controller.jokeEdit(req.params.id, setup, punchline)
            .then(result => res.json({message: 'Joke edited!', joke: result}))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
    })

    .get('/othersites', (req, res) => {

        controller.otherSitesGet()
            .then(result => res.json(result))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
    })

    .get('/otherjokes/:site', (req, res) => {
        controller.otherSiteJokesGet(req.params.site)
            .then(result => res.json(result))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
    })

    .delete('/jokes/:id', (req, res) => {
        controller.jokeDelete(req.params.id)
            .then(result => res.json({message: 'Joke deleted!', joke: result}))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
    });

module.exports = router;
