import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import { useGame } from '../contexts/gamecontext'
import EsusuChessboard from './chessgame'
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess not being a constructor


const EsusuChess = props => {
  const [currentState, updateState] = useState("new")
  const [loadedGame, updateLoadedGame] = useState(null)
  const [vsComputer, updateVsComputer] = useState(false)
  var { updateGame, currentGame, currentHistory, updateCurrentGame, updateCurrentFen, getGameId, saveGame } = useGame()

  const onSaveGame = async () => {
     let new_game = await saveGame(currentHistory)
     if (new_game){
         updateState("existing")
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
         updateLoadedGame(game_id)
     }
  }

  const onReStartGame = async () => {

     updateCurrentFen("start")
     updateGame(new Chess())

     if (loadedGame){
         let new_game = await getGameId(loadedGame)
         if (new_game){
             updateState("board")
         }
     } else {
         updateState("board")
     }
  }



  const onEndGame = async () => {
     // let new_game = await getGameId(player_id)
     updateState("new")
     updateVsComputer(false)
     updateCurrentFen("start")
     updateGame(new Chess())
     updateLoadedGame(null)
  }


  const onPauseGame = async () => {
     updateState("existing")
  }

  let current_view = (
      <View style={styles.body}>
          <View style={styles.button}>
              <Button
               title="New Game vs CPU"
               color="#28a745"
               onPress={() => onLoadGame('computer')}
              />
          </View>

          <View style={styles.button}>
              <Button
               title="Load Game 1 vs Human (over Network)"
               color="#777"
               onPress={() => onLoadGame('0')}
               style={styles.button}
              />
          </View>

          <View style={styles.button}>
              <Button
               title="Load Game 2 vs Human (over Network)"
               color="#777"
               onPress={() => onLoadGame('1')}
               style={styles.button}
              />
          </View>
      </View>
  )

  if (currentState == "board"){
      current_view = (

          <View style={styles.body}>
              <View style={styles.button}>
                  <Button title="Pause Game"  color="#ccc"  onPress={() => onPauseGame()} />
              </View>

              <View style={styles.button}>
                  <Button title="Save Game" color="#17a2b8" onPress={() => onSaveGame()} />
              </View>

              <View style={styles.button}>
                  <Button title="End Game" color="#dc3545" onPress={onEndGame}/>
              </View>
              <EsusuChessboard vsComputer={vsComputer} />
          </View>
      )
  } else if (currentState == "existing"){
      current_view = (
          <View style={styles.body}>
              <View style={styles.button}>
                  <Button title="Continue Game"  color="#17a2b8"  onPress={() => updateState("board")} />
              </View>

              <View style={styles.button}>
                  {<Button title="Restart Game"  color="#28a745"  onPress={() => onReStartGame()} />}
              </View>

              <View style={styles.button}>
                  <Button title="End Game" color="#dc3545" onPress={onEndGame}/>
              </View>
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
    padding: '2%',
    margin: 5,
    marginTop: '7%'
  },
  body: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  button: {
      margin: 5
  }
});


export default EsusuChess
