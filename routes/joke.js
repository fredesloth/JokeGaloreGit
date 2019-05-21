const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

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

    .post(function(req, res) {
        controller.createJoke(req.body.setup, req.body.punchline)
          .then(function() {
            res.json({message: 'Joke saved!'});
          })
          .catch(function(error) {
            console.error('Error: ' + error);
            if (error.stack) console.error(error.stack);
            res.status(500).send(error);
          });
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
