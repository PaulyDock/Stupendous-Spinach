'use strict';
const express = require('express');
const router = express.Router();
const PhotosController = require('../controllers').Photos;
const CommentsController = require('../controllers').Comments;
const LikesController = require('../controllers').Likes;


router.post('/imageUpload', (req, res) => {
  
  const { url } = req.body;
  const { latitude, longitude } = req.body.location;
  const { caption } = req.body;
  const { shareSelection } = req.body; //currently unused
  
  console.log('request body to /imageUpload: ', req.body);
  //save url, lat, long to database

  PhotosController.savePhoto({ latitude, longitude, url, profile_id: req.user.id, caption })
    .then(() => {
      //upon success, send URL back to client
      res.status(201).send(url);
    })
    .catch(() => {
      res.status(500).send("Sorry, your photo failed to upload");
    });

});


router.post('/nearbyPhotos', (req, res) => {
  let coordinates;

  if (req.body.location) {
    coordinates = req.body.location.coords;
  } else {
    coordinates = {latitude: 37.8837339, longitude: -122.5090785};
  }

  console.log('coordinates', coordinates);

  PhotosController.getNearbyPohotos(coordinates)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((data) => {
      //send empty object if error
      res.status(400).send([]);
    });
});


router.post('/saveComment/:photoID', (req, res) =>{

  console.log('user id', req.user);
  const userID = req.user ? req.user.id : 1;

  CommentsController.saveComment(req.body.text, req.params.photoID, userID)
    .then(()=> {
      res.status(200).send('Successfully saved your comment');
    })
    .catch(() => {
      res.status(400).send('Something went wrong with saving your comment');
    });
});


router.post('/addlike', (req, res) => {
  console.log(req.body.photoId);
  console.log(req.user.id);

  LikesController.addLike(req.body.photoId, req.user.id)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      console.log(error);
      //send empty object if error
      res.status(400).send("Sorry something went wrong with saving your like");
    });
});


router.get('/getAllComments/:photoID', (req, res) =>{
  console.log('req params ', req.params);
  CommentsController.getAllComments(req.params.photoID)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
