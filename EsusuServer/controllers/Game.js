'use strict';

var utils = require('../utils/writer.js');
var Game = require('../service/GameService');


module.exports.addGame = function addGame (req, res, next, body) {
  Game.addGame(body)
    .then(function (response) {
      res.setHeader("Access-Control-Allow-Origin", "*")
      // res.header("Access-Control-Allow-Origin", "*")
      // res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT")
      // res.setHeader("Access-Control-Allow-Headers", "Content-Type")
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteGame = function deleteGame (req, res, next, gameId, api_key) {
  Game.deleteGame(gameId, api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGameById = function getGameById (req, res, next, gameId) {
  Game.getGameById(gameId)
    .then(function (response) {
      res.setHeader("Access-Control-Allow-Origin", "*")
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateGame = function updateGame (req, res, next, body) {
  Game.updateGame(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateGameWithForm = function updateGameWithForm (req, res, next, gameId) {
  Game.updateGameWithForm(gameId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
