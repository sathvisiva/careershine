/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Courses              ->  index
 * POST    /api/Courses              ->  create
 * GET     /api/Courses/:id          ->  show
 * PUT     /api/Courses/:id          ->  update
 * DELETE  /api/Courses/:id          ->  destroy
 */

 'use strict';

 import _ from 'lodash';
 import Enquiry from './enquiry.model';

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


function isJson(str) {
  try {
    str = JSON.parse(str);
  } catch (e) {
    str = str;
  }
  return str
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Finds a Course by ID and store it in the request
export function course(req, res, next, id) {
  
  Enquiry.findOne({shortname : id }, function(err, enquiry) {
    if (err) return next(err);
    if (!enquiry) return next(new Error('Failed to load Course ' + id));
    res.json(enquiry);
  });
}

// Query a list of Courses
export function query(req, res) {
  if(req.query){
    var q = isJson(req.query.where);
    Enquiry.find(q).sort('-createdAt').exec(function(err, enquiry) {
      if (err) return res.json(500, err);
      res.json(enquiry);
    });
  }
  else{
    Enquiry.find().sort('-createdAt').exec(function(err, enquiry) {
      if (err) return res.json(500, err);
      res.json(enquiry);
    });
  }
}

// Gets a list of Courses
export function index(req, res) {
  
  /*return Course.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));*/
  }

// Gets a single Course from the DB
export function show(req, res) {
  
  /*return Course.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));*/
    return Enquiry.findOne({shortname : req.params.id }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));

  /*  Course.findOne({shortname : id }, function(err, Course) {
      if (err) return next(err);
      if (!Course) return next(new Error('Failed to load Course ' + id));
      req.Course = Course;
      next();
    });


    res.json(req.Course);*/
  }

// Creates a new Course in the DB
export function create(req, res) {
 Enquiry.create(req.body, function(err, enquiry) {
  if(err) { return handleError(res, err); }
  
  return res.status(201).json(enquiry);
});
}

// Updates an existing Course in the DB
export function update(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  return Enquiry.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(saveUpdates(req.body))
  .then(respondWithResult(res))
  .catch(handleError(res));
  /*Course.update({
    _id: req.Course._id
  }, req.body, {}, function(err, updatedCourse) {
    if (err) return res.json(500, err);
    res.json(updatedCourse);
  });*/

}

// Remove a Course
export function remove(req, res) {
 return Enquiry.findById(req.params.id).exec()
 .then(handleEntityNotFound(res))
 .then(removeEntity(res))
 .catch(handleError(res));
}

// Deletes a Course from the DB
export function destroy(req, res) {
  
  return Enquiry.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));
}