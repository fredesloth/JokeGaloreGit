const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const joke = new Schema({
    setup: String,
    punchline: String
});

joke.methods.toString = function() {
    return "setup: " + this.setup + ", punchline: " + this.punchline;
};

module.exports = mongoose.model('jokes', joke);