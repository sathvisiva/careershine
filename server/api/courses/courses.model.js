'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

/**
 * Todo Schema
 */
var CourseSchema = new Schema({
	college: String,
	program: String,
	course: String,
	overview : String,
	fees : String,
	details : String,
	createdAt: Date,
	updatedAt: Date,
	enablement : Boolean
});

// keep track of when todos are updated and created
CourseSchema.pre('save', function(next, done) {
	if (this.isNew) {
		this.createdAt = Date.now();
	}
	this.updatedAt = Date.now();
	next();
});

export default mongoose.model('Course', CourseSchema);
