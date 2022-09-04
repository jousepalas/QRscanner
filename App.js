import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not scanned')
  
const askForCameraPermission = () => {
  (async () => {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status == 'granted')
  })()
}

//Camera permission

useEffect(() => {
  askForCameraPermission();
}, []);


//Scan bar code

const handleBarCodeScanned = ({type, data}) => {
  setScanned(true);
  setText(data);
  console.log('Type: ' + type + '\nData: ' + data);
}

//Check permission and return the screen
if (hasPermission === null) {
return (
<View style={styles.container}>
      <Text>Camera permission</Text>
    </View>
)
}

if (hasPermission === false) {
  return (
    <View style={styles.container}>
      <Text style={{margin: 10}}> No camera access </Text>
    <Button title={'Allow camera'} onPress={()=> askForCameraPermission()}/>
    </View>
  )
}

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ height: 400, width: 400}} />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  barcodebox: {
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  }
});
