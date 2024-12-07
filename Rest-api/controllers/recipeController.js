// const { themeModel } = require('../models');
const { recipeModel } = require('../models');
// const recipeModel = require('../models/recipeModel');
// const { newPost } = require('./postController')

function getRecipes(req, res, next) {
    recipeModel.find()
        .populate('userId')
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getRecipe(req, res, next) {
    const { recipeId } = req.params;

    recipeModel.findById(recipeId)
        .populate({
            path : 'recipes',
            populate : {
              path : 'userId'
            }
          })
        .then(theme => res.json(theme))
        .catch(next);
}

function createRecipe(req, res, next) {
    const { name, products, description, imgUrl } = req.body;
    const { _id: userId } = req.user;

    recipeModel.create({  name, products, description, imgUrl, likes: [userId] })
        .then(recipe => {
            res.status(200).json(recipe)
        })
        .catch(next);
}

function like(req, res, next) {
    const recipeId = req.params.recipeId;
    const { _id: userId } = req.user;
    recipeModel.findByIdAndUpdate({ _id: recipeId }, { $addToSet: { likes: userId } }, { new: true })
        .then(updatedRecipe => {
            res.status(200).json(updatedRecipe)
        })
        .catch(next);
}

//TODO
// function editPost(req, res, next) {
//     const { postId } = req.params;
//     const { postText } = req.body;
//     const { _id: userId } = req.user;

//     // if the userId is not the same as this one of the post, the post will not be updated
//     postModel.findOneAndUpdate({ _id: postId, userId }, { text: postText }, { new: true })
//         .then(updatedPost => {
//             if (updatedPost) {
//                 res.status(200).json(updatedPost);
//             }
//             else {
//                 res.status(401).json({ message: `Not allowed!` });
//             }
//         })
//         .catch(next);
// }

// function deletePost(req, res, next) {
//     const { postId, themeId } = req.params;
//     const { _id: userId } = req.user;

//     Promise.all([
//         postModel.findOneAndDelete({ _id: postId, userId }),
//         userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
//         themeModel.findOneAndUpdate({ _id: themeId }, { $pull: { posts: postId } }),
//     ])
//         .then(([deletedOne, _, __]) => {
//             if (deletedOne) {
//                 res.status(200).json(deletedOne)
//             } else {
//                 res.status(401).json({ message: `Not allowed!` });
//             }
//         })
//         .catch(next);
// }

module.exports = {
    getRecipes,
    createRecipe,
    getRecipe,
    like,
}
