import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator ();

import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';

import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';



const App = ()=> {
  const firebaseConfig = {
    apiKey: "AIzaSyA4n7oUnnLdIXH2kpW9zilbRO7uUPRqsaM",
    authDomain: "shopping-list-demo-c6d06.firebaseapp.com",
    projectId: "shopping-list-demo-c6d06",
    storageBucket: "shopping-list-demo-c6d06.appspot.com",
    messagingSenderId: "298471126292",
    appId: "1:298471126292:web:d89d469429723b4ede3e01"
  };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
   //function will display an alert popup if connection is lost 
   const connectionStatus = useNetInfo();
  
   useEffect(() => {
     if (connectionStatus.isConnected === false)
    { Alert.alert("Connection lost!");
    disableNetwork(db);
    } else if (connectionStatus.isConnected=== true)
    { enableNetwork(db);
   }} , [connectionStatus.isConnected]);


  return (
    <NavigationContainer>
      <Stack.Navigator 
       initialRouteName="Welcome">
        <Stack.Screen
        name= "Welcome"
         component = {Welcome} 
         />
        <Stack.Screen
        name= "ShoppingLists">
         {props => <ShoppingLists isConnected={connectionStatus.isConnected}
         db={db} {...props} /> }
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



