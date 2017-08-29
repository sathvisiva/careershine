'use strict';

import _ from 'lodash';
var Posts = require('./blog.model').posts;
var Comments = require('./blog.model').comments;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Finds a Programs by ID and store it in the request
export function posts(req, res, next, id) {
  Posts.findById(id, function(err, posts) {
    if (err) return next(err);
    if (!posts) return next(new Error('Failed to load posts ' + id));
    req.posts = posts;
    next();
  });
}

// Finds a Programs by ID and store it in the request
export function comments(req, res, next, id) {
  Comments.findById(id, function(err, comments) {
    if (err) return next(err);
    if (!comments) return next(new Error('Failed to load comments ' + id));
    req.comments = comments;
    next();
  });
}

// Query a list of Programss
export function query(req, res) {
  Posts.find().sort('-createdAt').exec(function(err, posts) {
    if (err) return res.json(500, err);
    res.json(posts);
  });
}

// Query a list of Programss
export function queryComments(req, res) {
  Comments.find().sort('-createdAt').exec(function(err, posts) {
    if (err) return res.json(500, err);
    res.json(posts);
  });
}

// Gets a list of Programss
export function index(req, res) {
  /*return Programs.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));*/
}

// Gets a single Programs from the DB
export function show(req, res) {
  /*return Programs.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));*/
  res.json(req.Programs);
}

// Creates a new Programs in the DB
export function create(req, res) {
 
 Posts.create(req.body, function(err, posts) {
      if(err) { return handleError(res, err); }
           console.log(posts)
      return res.status(201).json(posts);
    });
}

export function createComments(req, res) {
 
 Comments.create(req.body, function(err, comments) {
      if(err) { return handleError(res, err); }
           console.log(comments)
      return res.status(201).json(comments);
    });
}

// Updates an existing Programs in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Posts.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function updatecomments(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Comments.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Remove a Programs
export function remove(req, res) {
  var Programs = req.Programs;

  Posts.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(Programs);
  });
}

export function removeComments(req, res) {
  var Programs = req.Programs;

  Comments.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(Programs);
  });
}

// Deletes a Programs from the DB
export function destroy(req, res) {
  return Posts.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function destroyComments(req, res) {
  return Comments.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
