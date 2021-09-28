import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';

import Chessboard from "chessboardjsx";
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess not being a constructor

import { useGame } from '../contexts/gamecontext'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const parsePGN = png_str => {
    const pgnParser = require('pgn-parser');

    try {
       const [result] = pgnParser.parse(png_str);
       return result
    } catch (err) {
       if (!err.hasOwnProperty('location')) throw(err);
       // Slice `text` with a little context before and after the error offset
       console.log('Error:', err);
    }

    return {}
}


const squareStyling = ({ pieceSquare, history }) => {

  // console.log("squareStyling", squareStyling)
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    })
  }
}


const EsusuChessboard = props => {


    var { currentFen, currentHistory, currentGame,
        game, updateGame,
        updateCurrentGame, updateCurrentHistory, updateCurrentFen, pieceSquare,
        squareStyles, updateSquareStyles,
        updatePieceSquare, getGameId, square, updateSquare,
        dropSquareStyle, updateDropSquareStyle } = useGame()

    const [nextOMove, updateNextOMove] = useState(0)
    const [opponentMOves, updateopponentMOves] = useState([])

    let game_id = (currentGame && currentGame.id != null) ? currentGame.id : null
    let name = (currentGame && currentGame.name) ? currentGame.name : null
    let pgn = (currentGame && currentGame.pgn) ? currentGame.pgn : null

    var { vsComputer } = props

    // console.log("game_id", game_id)
    // console.log("name", name)
    // console.log("pgn", pgn)
    useEffect(() => {
        if (!vsComputer){
            let pgn = (currentGame && currentGame.pgn) ? currentGame.pgn : null
            if (pgn){
                var parsed_pgn = parsePGN(pgn)
                let valid_o_moves = parsed_pgn.moves.filter((_, index) => index%2 !== 0)
                console.log("valid_o_moves", valid_o_moves)
                updateopponentMOves(valid_o_moves)
            }
        }

        // window.addEventListener = x => x
        window.addEventListener("click", onSquareClick)
    }, [])




    // pgn = '[White "me"]\n[Black "you"]\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 (3. ...Nf6 {is the two knights}) 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *'
    // let result = parsePGN(pgn)
    const onDrop = ({ sourceSquare, targetSquare }) => {
      // console.log("*onDrop: \n sourceSquare, targetSquare", sourceSquare, targetSquare)
      // see if the move is legal
      let move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q" // always promote to a queen for example simplicity
      })

      updateGame(game)
      // console.log("move", move)
      // illegal move
      if (move === null) return;

      // updateFen(game.fen())
      updateCurrentFen(game.fen())
      updateCurrentHistory(game.history({ verbose: true }))
      updateSquareStyles(squareStyling({pieceSquare, history: currentHistory}))

      if (vsComputer){
          makeRandomMove()
      } else {
          opponentMove()
      }

    }

    const opponentMove = () => {
        let possibleMoves = game.moves();
        console.log("possibleMoves", possibleMoves)
        console.log("opponentMOves", opponentMOves)

        // exit if the game is over
        if (
          game.game_over() === true ||
          game.in_draw() === true ||
          possibleMoves.length === 0
        )
          return;

          let pgn = (currentGame && currentGame.pgn) ? currentGame.pgn : null
          if (pgn){
              let nextMoveIndex = nextOMove
              game.move(opponentMOves[nextMoveIndex].move)
              console.log("nextMoveIndex", nextMoveIndex)
              // updateFen(game.fen())
              updateCurrentFen(game.fen())
              updateCurrentHistory(game.history({ verbose: true }))
              updateNextOMove(nextMoveIndex+1)
          }
    }



  const makeRandomMove = () => {
      // console.log("makeRandomMove", makeRandomMove)
      let possibleMoves = game.moves();

      // exit if the game is over
      if (
        game.game_over() === true ||
        game.in_draw() === true ||
        possibleMoves.length === 0
      )
        return;

      let randomIndex = Math.floor(Math.random() * possibleMoves.length);
      game.move(possibleMoves[randomIndex])
      // updateFen(game.fen())
      updateCurrentFen(game.fen())
      updateCurrentHistory(game.history({ verbose: true }))
  }

  const onMouseOutSquare = square => {
      // console.log("*onMouseOutSquare", square)
      removeHighlightSquare(square)
  }

  // keep clicked square style and remove hint squares
  const removeHighlightSquare = () => {
      // console.log("removeHighlightSquare", removeHighlightSquare)
      updateSquareStyles(squareStyling({ pieceSquare, history: currentHistory }))
  }

  const onDragOverSquare = square => {
    // console.log("*onDragOverSquare", square)
    updateDropSquareStyle({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    })
  }

  const onSquareClick = square => {
     // console.log("*onSquareClick", square)
     updateSquareStyles(squareStyling({pieceSquare: square, history: currentHistory }))
     updatePieceSquare(square)

     let move = game.move({
       from: pieceSquare,
       to: square,
       promotion: "q" // always promote to a queen for example simplicity
     });
     // illegal move
     if (move === null) return;
     // updateFen(game.fen())
     updateCurrentFen(game.fen())
     updateCurrentHistory(game.history({ verbose: true }))
     updatePieceSquare("")
   }

  const onSquareRightClick = square => {
      // console.log("*onSquareRightClick", square)
      updateSquareStyles({[square]: { backgroundColor: "deepPink" } })
  }



  const onMouseOverSquare = square => {
    // console.log("*onMouseOverSquare", square)
    // get list of possible moves for this square
    let moves = game.moves({
      square: square,
      verbose: true
    });
    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    let squaresToHighlight = []
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to)
    }
    highlightSquare(square, squaresToHighlight);
  }

  // show possible moves
  const highlightSquare = (sourceSquare, squaresToHighlight) => {
    // console.log("highlightSquare", highlightSquare)
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: currentHistory,
            pieceSquare: pieceSquare
          })
        };
      },
      {}
    )

    updateSquareStyles({ ...squareStyles, ...highlightStyles })
  }

  let visual = ""
  if (!vsComputer){
      visual = (opponentMOves && opponentMOves[nextOMove]) ? `Next Move: ${opponentMOves[nextOMove].move}` : null
  }

  console.log("visual", opponentMOves)

    // var divs = document.getElementsByTagName("DIV")
    // for (const div of divs) {
    //     div.addEventListener("click", onSquareClick)
    // }

  return (
    <View style={styles.container}>
      <Text>{visual ? visual : ""}</Text>
      <Chessboard
        id="esusuboard"
        width={500}
        position={currentFen}
        onDrop={onDrop}
        onMouseOverSquare={onMouseOverSquare}
        onMouseOutSquare={onMouseOutSquare}
        boardStyle={{
          borderRadius: "5px",
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
        }}
        squareStyles={squareStyles}
        dropSquareStyle={dropSquareStyle}
        onDragOverSquare={onDragOverSquare}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        />
      <StatusBar style="auto" />
    </View>
  );
}

export default EsusuChessboard
