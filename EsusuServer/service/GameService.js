'use strict';
const fs = require("fs")
const shortid = require('shortid');

const readFromFile = async (file_str, gameId) => {
    let rawdata = await fs.readFileSync(file_str);
    let db_data = JSON.parse(rawdata);
    // console.log(db_data);
    if (gameId){
        return db_data.games[gameId]
    }
    return db_data.games[0]
}

const readEntireFile = async (file_str) => {
    let rawdata = await fs.readFileSync(file_str);
    let db_data = JSON.parse(rawdata);
    return db_data
}

const writeEntireFile = async (file_str, content) => {
    // let written = await fs.writeFile(file_str, JSON.stringify(content))
    await fs.writeFileSync(file_str, JSON.stringify(content));
    // let written_data = JSON.parse(written);
    // console.log("written", written)
    // return written_data
}


/**
 * Start a new game
 *
 * body Game  (optional)
 * returns Game
 **/
exports.addGame = async body => {
    // console.log("addGame service", body)
  return new Promise(async (resolve, reject) => {
    var data = {};
    let all_games = await readEntireFile("./games.db.json")
    let games = all_games.games
    // let new_id = shortid.generate()
    let new_id = Math.random().toString(36).slice(2)
    // console.log("new_id", new_id)
    // console.log("games", games)
    let new_game = {...body,
        "name": `game_${new_id}`,
        "id": new_id
    }

    all_games.games[new_id] = new_game

    await writeEntireFile("./games.db.json", all_games)

    data['application/json'] = new_game

    if (Object.keys(data).length > 0) {
      resolve(data[Object.keys(data)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Deletes a game
 *
 * gameId Long Game id to delete
 * api_key String  (optional)
 * no response value expected for this operation
 **/
exports.deleteGame = (gameId,api_key) => {
  return new Promise(async (resolve, reject) => {
      var data = {};
      let all_games = await readEntireFile("./games.db.json")
      let games = all_games.games

      let old_game = games[gameId]
      delete games[gameId]
      all_games.games = games

      await writeEntireFile("./games.db.json", all_games)
      data['application/json'] = all_games

      if (Object.keys(data).length > 0) {
        resolve(data[Object.keys(data)[0]]);
      } else {
        resolve();
      }
  });
}


/**
 * Find game by ID
 * Returns a single game
 *
 * gameId Long ID of game to return
 * returns Game
 **/
exports.getGameById = async (gameId) => {

  let fetched_game = {}

  return new Promise(function(resolve, reject) {
    var examples = {};
    let fetched_game = readFromFile("./games.db.json", gameId)
    console.log("fetched_game", fetched_game)

    examples['application/json'] = fetched_game

    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing game
 *
 * body Game Game object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.updateGame = body => {
  return new Promise(async (resolve, reject) => {
      var data = {};
      let all_games = await readEntireFile("./games.db.json")
      let games = all_games.games

      let existing_id = body.id
      // console.log("existing_id", existing_id)
      let old_game = games[existing_id]
      // console.log("old_game", old_game)

      let updated_game = {
          ...body,
          "name": `game_${existing_id}`,
          "id": existing_id
      }

      // console.log("updated_game", updated_game)
      all_games.games[existing_id] = updated_game
      await writeEntireFile("./games.db.json", all_games)

      data['application/json'] = updated_game

      if (Object.keys(data).length > 0) {
        resolve(data[Object.keys(data)[0]]);
      } else {
        resolve();
      }
  });
}


/**
 * Updates a game in the store with form data
 *
 * gameId Long ID of game that needs to be updated
 * no response value expected for this operation
 **/
exports.updateGameWithForm = function(gameId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}
