/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Collegess              ->  index
 * POST    /api/Collegess              ->  create
 * GET     /api/Collegess/:id          ->  show
 * PUT     /api/Collegess/:id          ->  update
 * DELETE  /api/Collegess/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Colleges from './colleges.model';

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

// Finds a Colleges by ID and store it in the request
export function colleges(req, res, next, id) {
  Colleges.findById(id, function(err, Colleges) {
    if (err) return next(err);
    if (!Colleges) return next(new Error('Failed to load Colleges ' + id));
    req.Colleges = Colleges;
    next();
  });
}

// Query a list of Collegess
export function query(req, res) {
  Colleges.find().sort('-createdAt').exec(function(err, Collegess) {
    if (err) return res.json(500, err);
    res.json(Collegess);
  });
}

// Gets a list of Collegess
export function index(req, res) {
  /*return Colleges.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));*/
}

// Gets a single Colleges from the DB
export function show(req, res) {
  /*return Colleges.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));*/
  res.json(req.Colleges);
}

// Creates a new Colleges in the DB
export function create(req, res) {
  console.log(req)
  /*return Colleges.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));*/
/*  var Colleges = new Colleges(req.body);

  Colleges.save(function(err) {
    if (err) return res.json(500, err);
    res.json(Colleges);
  });*/

  Colleges.create(req.body, function(err, college) {
      if(err) { return handleError(res, err); }
           console.log(college)
      return res.status(201).json(college);
    });
}

// Updates an existing Colleges in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Colleges.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
  /*Colleges.update({
    _id: req.Colleges._id
  }, req.body, {}, function(err, updatedColleges) {
    if (err) return res.json(500, err);
    res.json(updatedColleges);
  });*/

}

// Remove a Colleges
export function remove(req, res) {
  var Colleges = req.Colleges;

  Colleges.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(Colleges);
  });
}

// Deletes a Colleges from the DB
export function destroy(req, res) {
  return Colleges.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}