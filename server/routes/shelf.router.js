const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  console.log('/shelf GET route');
  console.log('is authenticated?', req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log('user', req.user);
    let queryText = `SELECT * FROM "item"`;
    pool.query(queryText).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  }
  });

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  console.log('/shelf POST route');
  console.log(req.body);
  // req.isAuthenticated() is a function provided 
  // by passport. It returns either true or false.
  console.log('is authenticated?', req.isAuthenticated());
  if (req.isAuthenticated()) { 
      console.log('user', req.user);    
      // Add the pet to database
      let queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
                       VALUES ($1, $2, $3);`;
                       // ! req.user.id is the current logged in user's id
      pool.query(queryText, [req.body.description, req.body.image_url, req.user.id])
          .then(results => {
              res.sendStatus(201)
          }).catch(error => {
              console.log(error);
              res.sendStatus(500);
          })
  } else {
      res.sendStatus(401);
  }
});


/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
