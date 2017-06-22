const mongoose = require('mongoose');


var publicationSchema = mongoose.Schema({
	id: { type: Number, unique: true },
	articles: Object,
    updated: { type: Date, default: Date.now },
});


var Publication = mongoose.model('editions', publicationSchema);

module.exports = Publication;