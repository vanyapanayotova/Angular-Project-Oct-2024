const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { themeController, postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', themeController.getThemes);
router.get('/my/:userId', themeController.getMyThemes);
router.post('/', auth(), themeController.createTheme);

router.get('/:themeId', themeController.getTheme);
router.post('/:themeId', auth(), postController.createPost);
router.put('/:themeId', auth(), themeController.editTheme);
router.put('/:themeId/subscribe', auth(), themeController.subscribe);
router.delete('/:themeId', auth(), themeController.deleteTheme);

router.put('/:themeId/posts/:postId', auth(), postController.editPost);
router.delete('/:themeId/posts/:postId', auth(), postController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router