'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

/**
 * Todo Schema
 */
var ProgramsSchema = new Schema({
	name: String,
	about: String,
	createdAt: Date,
	updatedAt: Date
});

// keep track of when todos are updated and created
ProgramsSchema.pre('save', function(next, done) {
	if (this.isNew) {
		this.createdAt = Date.now();
	}
	this.updatedAt = Date.now();
	next();
});

export default mongoose.model('Programs', ProgramsSchema);
