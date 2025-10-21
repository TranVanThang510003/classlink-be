const express = require('express');
const routeAPI = express.Router();
const {createUser, handleLogin, getUser ,updateAccountType,getAllUser } = require('../controllers/userController');
const auth = require("../middleware/auth");
const {createMovie, deleteMovie,updateMovie,getMovieById,getMovies } = require("../controllers/movieController");
const { getRecommendations } = require("../controllers/recommendController");
const {createEpisode, deleteEpisode,updateEpisode,increaseViews} = require("../controllers/episodeController");
const { handleRating ,postComment,getComments } = require('../controllers/ratingController');
const { addFavorite, removeFavorite, getUserFavorites} = require("../controllers/favoriteController");
const { createHistory , getWatchHistory, getWatchedMovies,getMovieWatchHistory} = require('../controllers/watchHistoryController')
 // routeAPI.all('/{*any}', auth);
routeAPI.post('/register',createUser)
routeAPI.post('/login',handleLogin)
routeAPI.get('/user', getAllUser)
routeAPI.get('/me',auth, getUser)
routeAPI.post('/movies',createMovie)
routeAPI.post('/movies/:movieId/episodes',createEpisode)
routeAPI.delete('/episodes/:id',deleteEpisode)
routeAPI.delete('/movies/:id',deleteMovie)
routeAPI.put('/episodes/:id', updateEpisode);
routeAPI.put('/movies/:id', updateMovie);
routeAPI.get('/movies/filter', getMovies);
routeAPI.get('/movies/:id', getMovieById);
routeAPI.get('/recommendations',auth, getRecommendations);
routeAPI.post('/episodes/:id/increase-views', increaseViews);


routeAPI.put('/user/update-account-type', auth, updateAccountType);
routeAPI.post('/ratings', auth, handleRating);
routeAPI.post('/comments', auth, postComment);
routeAPI.get('/comments/:movieId', getComments);

routeAPI.post('/favorites/:movieId', auth, addFavorite);
routeAPI.delete('/favorites/:movieId', auth, removeFavorite);
routeAPI.get('/favorites', auth, getUserFavorites);

//history
routeAPI.patch('/history/:movieId/:episodeId',auth,createHistory)
routeAPI.get('/history/:movieId/:episodeId',auth,getWatchHistory)
routeAPI.get('/history/:movieId',auth,getMovieWatchHistory)
routeAPI.get('/history/',auth,getWatchedMovies)
module.exports= routeAPI;
