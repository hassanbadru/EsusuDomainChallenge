import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import ApplicationProvider from './src/contexts'
import EsusuChess from './src/screens/startpage'

const App = props => {
  const [currentState, updateState] = useState("new")

  return (
    <ApplicationProvider>
        <EsusuChess />
    </ApplicationProvider>
  );
}


export default App
