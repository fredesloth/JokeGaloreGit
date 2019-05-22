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

    .post('/jokes', async function (req, res) {
        const newJoke = await (controller.createJoke(req.body.setup, req.body.punchline));
        console.log(newJoke);
          res.send({
              type: 'POST',
              setup: req.body.setup,
              punchline: req.body.punchline
          })
          })

    .get('/jokes/:id', (req, res) => {
        controller.jokeGet(req.params.id)
            .then(val => res.json(val))
            .catch(err => {
                console.log("Error: " + err);
                if(err.stack) console.error(err.stack);
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
module.exports = router;
