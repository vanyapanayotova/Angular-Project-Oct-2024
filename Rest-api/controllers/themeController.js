const { themeModel, userModel } = require('../models');
const { newPost } = require('./postController')

function getThemes(req, res, next) {
    themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getMyThemes(req, res, next) {
    console.log(req.user);
    const { userId } = req.params;
    themeModel.find({userId: userId})
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .populate('userId')
        .populate('posts')
        .then(theme => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    console.log(req.body);
    // const { themeName, postText } = req.body;
    const { recipeName, products, description, imgUrl  } = req.body;
    const { _id: userId } = req.user;

    themeModel.create({ recipeName, products, description, imgUrl, subscribers: [userId], userId })
        .then(theme => {
            newPost(recipeName, userId, theme._id)
                .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}


function editTheme(req, res, next) {
    const { themeId } = req.params;
    const { recipeName, products, description, imgUrl } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    themeModel.findOneAndUpdate(
        { _id: themeId, userId }, 
        { recipeName, products, description, imgUrl }, 
        { new: true }
    )
        .then(updatedTheme => {
            if (updatedTheme) {
                res.status(200).json(updatedTheme);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deleteTheme(req, res, next) {
    const { themeId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        themeModel.findOneAndDelete({ _id: themeId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { themes: themeId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    editTheme,
    subscribe,
    deleteTheme,
    getMyThemes
}
