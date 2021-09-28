import React, {useState, useEffect, useContext, createContext} from 'react'
import { updateGame, saveNewGame, findGameById, updateGameInStore, deleteGame } from '../api/chessapi'
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess not being a constructor

const GameContext = createContext();

const GameProvider = props => {
    const [currentGame, updateCurrentGame] = useState(null)

    const [game, updateGame] = useState(new Chess())

    const [paused, updatePaused] = useState(null)
    // current board position
    const [currentFen, updateCurrentFen] = useState("start")
    // array of past game moves
    const [currentHistory, updateCurrentHistory] = useState([])
    // square with the currently clicked piece
    const [pieceSquare, updatePieceSquare] = useState("")
    // currently clicked square
    const [square, updateSquare] = useState("")
    // square styles for active drop square
    const [dropSquareStyle, updateDropSquareStyle] = useState({})
    // custom square styles
    const [squareStyles, updateSquareStyles] = useState({})

    const saveGame = async game_history => {
        let new_game = await saveNewGame(game_history)
        if (new_game){
            console.log("new_game", new_game)
            updateCurrentGame(new_game)
            localStorage.setItem('new_game', new_game)
            localStorage.setItem('new_player', player_id)
            return new_game
        }
        return null
    }

    const refreshGame = async () => {
        var game = await updateGameInStore()
        if(game){
            updateCurrentGame(game)
        }
    }

    const getGameId = async id => {
        var game = await findGameById(id)
        console.log("game", game)
        if(game){
            updateCurrentGame(game)
            return game
        }
        return {}
    }

    var data = { game, updateGame, currentGame, currentFen, currentHistory, updateCurrentGame, updateCurrentFen, saveGame, square, updateSquare, getGameId, pieceSquare, updatePieceSquare, updateCurrentHistory, dropSquareStyle, updateDropSquareStyle, squareStyles, updateSquareStyles }

    return <GameContext.Provider value={data} {...props} />
}

const useGame = () => {
    const context = useContext(GameContext)
    if (context === undefined ){
        throw new Error(`useGame must be used within GameProvider`)
    }
    return context
}

export { GameProvider, useGame }
