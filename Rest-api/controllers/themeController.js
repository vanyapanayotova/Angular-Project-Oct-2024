const { themeModel } = require('../models');
const { newPost } = require('./postController')

function getThemes(req, res, next) {
    themeModel.find()
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

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
}
