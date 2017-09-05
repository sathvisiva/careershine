'use strict';

import mongoose from 'mongoose';
var slugs = require('mongoose-url-slugs');


var Schema = mongoose.Schema;

/**
 * Todo Schema
 */
var CollegesSchema = new Schema({
	name: String,
	about: String,
	logo: String,
	createdAt: Date,
	updatedAt: Date
});

// keep track of when todos are updated and created
CollegesSchema.pre('save', function(next, done) {
	if (this.isNew) {
		this.createdAt = Date.now();
	}
	this.updatedAt = Date.now();
	next();
});

CollegesSchema.plugin(slugs('name'));

export default mongoose.model('Colleges', CollegesSchema);
