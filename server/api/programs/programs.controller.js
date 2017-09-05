/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/Programss              ->  index
 * POST    /api/Programss              ->  create
 * GET     /api/Programss/:id          ->  show
 * PUT     /api/Programss/:id          ->  update
 * DELETE  /api/Programss/:id          ->  destroy
 */

 'use strict';

 import _ from 'lodash';
 import Programs from './programs.model';

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

/*// Finds a Programs by ID and store it in the request
export function programs(req, res, next, id) {
  console.log("inside params");
  Programs.findById(id, function(err, Programs) {
    if (err) return next(err);
    if (!Programs) return next(new Error('Failed to load Programs ' + id));
    req.Programs = Programs;
    next();
  });
}*/

// Query a list of Programss
export function query(req, res) {
  
  if(req.query.slug){
    
    Programs.findOne(req.query).sort('-createdAt').exec(function(err, Programss) {
      if (err) return res.json(500, err);
      res.json(Programss);
    });
  }else{
    
    Programs.find().sort('-createdAt').select('name slug').exec(function(err, Programss) {
      if (err) return res.json(500, err);
      res.json(Programss);
    });
  }
}


// Gets a sowingle Programs from the DB
export function show(req, res) {

  
  Programs
  .findOne({
    slug: req.params.slug
  })
  .execAsync()
  .then(handleEntityNotFound(res))
  .then(responseWithResult(res))
  .catch(handleError(res));
  
}

// Creates a new Programs in the DB
export function create(req, res) {
  /*return Programs.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));*/
    Programs.create(req.body, function(err, program) {
      if(err) { return handleError(res, err); }
      
      return res.status(201).json(program);
    });
  }

// Updates an existing Programs in the DB
export function update(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  return Programs.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(saveUpdates(req.body))
  .then(respondWithResult(res))
  .catch(handleError(res));
  /*Programs.update({
    _id: req.Programs._id
  }, req.body, {}, function(err, updatedPrograms) {
    if (err) return res.json(500, err);
    res.json(updatedPrograms);
  });*/

}

// Remove a Programs
export function remove(req, res) {
 return Programs.findById(req.params.id).exec()
 .then(handleEntityNotFound(res))
 .then(removeEntity(res))
 .catch(handleError(res));
}

// Deletes a Programs from the DB
export function destroy(req, res) {
  return Programs.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));
}