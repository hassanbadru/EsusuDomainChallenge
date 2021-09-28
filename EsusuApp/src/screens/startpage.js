import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import { useGame } from '../contexts/gamecontext'
import EsusuChessboard from './chessgame'
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess not being a constructor


const EsusuChess = props => {
  const [currentState, updateState] = useState("new")
  const [vsComputer, updateVsComputer] = useState(false)
  var { updateGame, currentGame, updateCurrentGame, updateCurrentFen, getGameId, startPlayer } = useGame()

  const onStartGame = async () => {
     let new_game = await startPlayer()
     if (new_game){
         updateState("board")
     }
  }

  const onLoadGame = async game_id => {
      if (game_id == "computer"){
          updateState("board")
          updateVsComputer(true)
          return ;
      }
     let new_game = await getGameId(game_id)
     if (new_game){
         updateState("board")
     }
  }

  const onReStartGame = async player_id => {

      updateCurrentFen("start")
      updateGame(new Chess())
     let new_game = await getGameId(player_id)
     if (new_game){
         updateState("board")
     }
  }

  const onEndGame = async () => {
     // let new_game = await getGameId(player_id)
     updateState("new")
     updateVsComputer(false)
     updateCurrentFen("start")
     updateGame(new Chess())
  }


  const onPauseGame = async () => {
     updateState("existing")
  }

  let current_view = (
      <View style={styles.container}>
          <Button
           title="Start New Game(over Network)"
           color="#17a2b8"
           onPress={() => onStartGame()}
          />
          <br />
          <Button
           title="New Game vs Computer"
           color="#28a745"
           onPress={() => onLoadGame('computer')}
          />
          <br />
          <Button
           title="Load Game 1 (over Network)"
           color="#ccc"
           onPress={() => onLoadGame('1')}
          />
          <br />
          <Button
           title="Load Game 2 (over Network)"
           color="#ccc"
           onPress={() => onLoadGame('1')}
          />
          <br />
      </View>
  )

  if (currentState == "board"){
      current_view = (
          <View style={styles.container}>
              <Button title="Pause Game"  color="#17a2b8"  onPress={() => onPauseGame()} />
              <br />
              <Button title="End Game" color="#dc3545" onPress={onEndGame}/>
              <EsusuChessboard vsComputer={vsComputer} />
          </View>
      )
  } else if (currentState == "existing"){
      current_view = (
          <View style={styles.container}>
              <Button title="Continue Game"  color="#17a2b8"  onPress={() => onLoadGame('1')} />
              <br />
              <Button title="Start New"  color="#28a745"  onPress={() => onReStartGame('0')} />
              <br />
              <Button title="End Game" color="#dc3545" onPress={onEndGame}/>
          </View>
      )
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to Esusu Chess Game</Text>
        {current_view}
      <StatusBar style="auto" />
    </View>
  );
}


// const Timer = (props:any) => {
//     const {initialMinute = 0,initialSeconds = 0} = props;
//     const [ minutes, setMinutes ] = useState(initialMinute);
//     const [seconds, setSeconds ] =  useState(initialSeconds);
//     const [time, setTime ] =  useState(initialSeconds);
//     useEffect(()=>{
//         let interval = setInterval(() => setTime(), 1000)
//     });
//
//     return (
//         <>
//         { minutes === 0 && seconds === 0
//             ? null
//             : <Text style={{color: '#000'}}> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Text>
//         }
//         </>
//     )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '2%'
  },
});


export default EsusuChess
