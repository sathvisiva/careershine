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
 import Course from './courses.model';

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
  
  Course.findOne({shortname : id }, function(err, Course) {
    if (err) return next(err);
    if (!Course) return next(new Error('Failed to load Course ' + id));
    req.Course = Course;
    next();
  });
}

// Query a list of Courses
export function query(req, res) {
  if(req.query){
    var q = isJson(req.query.where);
    
    Course.find(q).sort('-createdAt').select('college shortname course').exec(function(err, Courses) {
      if (err) return res.json(500, err);
      res.json(Courses);
    });
  }
  else{
    Course.find().sort('-createdAt').select('college shortname course').exec(function(err, Courses) {
      if (err) return res.json(500, err);
      res.json(Courses);
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
    return Course.findOne({shortname : req.params.id }).exec()
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
 Course.create(req.body, function(err, college) {
  if(err) { return handleError(res, err); }
  
  return res.status(201).json(college);
});
}

// Updates an existing Course in the DB
export function update(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  return Course.findById(req.params.id).exec()
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
 return Course.findById(req.params.id).exec()
 .then(handleEntityNotFound(res))
 .then(removeEntity(res))
 .catch(handleError(res));
}

// Deletes a Course from the DB
export function destroy(req, res) {
  
  return Course.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));
}