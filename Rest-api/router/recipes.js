const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
// const { themeController, postController } = require('../controllers');
const recipeController = require('../controllers/recipeController');

// middleware that is specific to this router

// router.get('/', themeController.getThemes);
router.get('/', recipeController.getRecipes);
// router.post('/', auth(), themeController.createTheme);
router.post('/', auth(), recipeController.createRecipe);

// router.get('/:themeId', themeController.getTheme);
router.get('/:recipeId', recipeController.getRecipe);
// router.post('/:themeId', auth(), postController.createPost);
// router.put('/:themeId', auth(), themeController.subscribe);
router.put('/:recipeId', auth(), recipeController.like);
// router.put('/:themeId/posts/:postId', auth(), postController.editPost);

// router.put('/:recipeId', auth(), recipeController.editRecipe);
// router.delete('/:recipeId', auth(), recipeController.deleteRecipe);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router