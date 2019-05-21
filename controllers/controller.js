"use strict";

const joke = require('../models/joke');
const registryURL = require('../config').jokeRegistry;
const fetch = require('node-fetch');


exports.otherSiteJokesGet = async function (id) {
    const allSites = await fetch(registryURL + '/api/services');
    const allSitesJSON = await allSites.json();
    const result = allSitesJSON.find(site => site._id == id);


    let url = result.address;

    const regex = /\/$/;
    if (!regex.test(url)) {
        url += '/';
    }
    console.log(result);
    const response = await fetch(url + 'api/jokes');
    const json = await response.json();
    return json;
}


exports.otherSitesGet = async function () {
    const response = await fetch(registryURL + '/api/services');
    const json = await response.json();
    return json;
};


exports.jokeCreate = async function (setup, punchline) {
    let joke = new joke({
        setup,
        punchline
    });
     joke = await joke.save();
    return joke
};


exports.jokeEdit = function(id, setup, punchline) {
    return joke.findOneAndUpdate(
        {_id : id},
        {setup : setup, punchline : punchline},
        {new : true}).exec();
};

exports.jokeGet = function (id) {
    return joke.findOne({_id: id}).exec();
};

exports.jokesGet = function () {
    return joke.find().exec();
};

exports.jokeDelete = function (id) {
    return joke.findOneAndDelete({_id : id}).exec();
};

async function findService (id) {
    const response = await fetch(registryURL + '/api/services');
    const json = await response.json();
    return json.find(site => site._id == id);
};