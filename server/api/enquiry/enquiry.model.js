'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

/**
 * Todo Schema
 */
 var EnquirySchema = new Schema({
 	name: String,
 	email : String,
 	phone : Number,
 	city	: String,
 	college: {
 		type: Schema.Types.ObjectId,
 		ref: 'Colleges',
 		index: true
 	},
 	course: {
 		type: Schema.Types.ObjectId,
 		ref: 'Course',
 		index: true
 	},
 	comments: String,
 	createdAt: Date,
 	updatedAt: Date,
 	enablement : Boolean
 });

// keep track of when todos are updated and created
EnquirySchema.pre('save', function(next, done) {
	if (this.isNew) {
		this.createdAt = Date.now();
	}
	this.updatedAt = Date.now();
	next();
});

export default mongoose.model('Enquiry', EnquirySchema);
