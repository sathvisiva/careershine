'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

/**
 * Todo Schema
 */
var PostSchema = new Schema({
	title: String,
  content: String,
  author: String,
  comments: [{  type: Schema.Types.ObjectId,
    ref: 'Comments' }],
   createdAt : {
    type: Date, 
    default: Date.now
  }
});

var CommentSchema = new Schema({
  author: String,
  email: String,
  comment : String
  post: { type: Schema.Types.ObjectId, ref: 'Posts' }
});

// keep track of when todos are updated and created
PostSchema.pre('save', function(next, done) {
	if (this.isNew) {
		this.createdAt = Date.now();
	}
	this.updatedAt = Date.now();
	next();
});

module.exports = {
  posts: mongoose.model('Posts', PostSchema),
  comments: mongoose.model('Comments', CommentSchema)
}
