import axios from 'axios'

var host = "http://localhost:8000"
// var host = ""

const axiosInstance = axios.create({
    baseURL: host,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Headers': 'Content-Type'
    }
})


const updateGame = async game_update => {
    let data = null
    let end_point = `${host}/game`
    let response = await axios.put(end_point, {game_update})
    if (response){
        data = response.data
        return data
    }
    return data
}


const saveNewGame = async game_history => {
    let data = null
    let new_game = {
      pgn: "[Event \"F/S Return Match\"]\n[Site \"Belgrade, Serbia JUG\"]\n[Date \"1992.11.04\"]\n[Round \"29\"]\n[White \"Fischer, Robert J.\"]\n[Black \"Spassky, Boris V.\"]\n[Result \"1/2-1/2\"]\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 {This opening is called the Ruy Lopez.} 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1/2-1/2",
      name: "newgame"
    }

    // update_game_history
    game_history = game_history ? game_history : new_game.pgn
    new_game = {...new_game, pgn: game_history}

    let end_point = `${host}/game`

    // let axiosConfig = ;
    let response = await axios.post(end_point, new_game, {
      headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
      }
    })

    console.log("start response", response)
    if (response){
        data = response.data
        return data
        console.log("start data", data)
    }
    return data
}

const findGameById = async id => {
    let data = null

    let end_point = `${host}/game/${id}`
    let response = await axios.get(end_point, {headers: {
       accept: 'application/json'
     }})
    if (response){
        data = response.data
        console.log("data", data)
        return data
    }
    return data
}

const updateGameInStore = async () => {

    let game_update = {
      pgn: "[Event \"F/S Return Match\"]\n[Site \"Belgrade, Serbia JUG\"]\n[Date \"1992.11.04\"]\n[Round \"29\"]\n[White \"Fischer, Robert J.\"]\n[Black \"Spassky, Boris V.\"]\n[Result \"1/2-1/2\"]\n1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 {This opening is called the Ruy Lopez.} 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1/2-1/2",
      name: "updategame"
    }
    let data = null
    let end_point = `${host}/game/${id}`
    let response = await axios.post(end_point, game_update)
    if (response){
        data = response.data
        return data
    }
    return data
}

const deleteGame = async () => {
    let data = null
    let end_point = `${host}/game/${id}`
    let response = await axios.delete(end_point)
    if (response){
        data = response.data
        return data
    }
    return data
}

export { updateGame, saveNewGame, findGameById, updateGameInStore, deleteGame }
