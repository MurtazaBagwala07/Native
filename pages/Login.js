import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error ,setError] = useState(false)

  


  const testLoginHandler = async()=>{
    const resp = await fetch("https://staging-api.tracknerd.io/v1/auth/login", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "ganesh@arvee.co.in",
        password: "tracknerd@123",
      }),
    })
  
    const user = await resp.json()
    if(user){
        navigation.navigate('Vehicle')
        const storeData = async (token) => {
            try {
              await AsyncStorage.setItem('token', token)
            } catch (e) {
              console.error(e)
            }
          }
          storeData(user.token)
    }
  }

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
            /> 
        </View> 
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          /> 
        </View> 
        <View>
            {error && <Text>Enter Correct Details</Text>}
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.loginBtn} onPress={testLoginHandler}>
          <Text style={styles.loginText}>Test LOGIN</Text> 
        </TouchableOpacity> 
  
      </View> 
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "gray",
    borderRadius: 10,
    width: "80%",
    height: 55,
    marginBottom: 20,
    alignItems: "center",
    color:"#0b1f9e",
    placeholderTextColor:"#0b1f9e"
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color:"#0b1f9e",
    placeholderTextColor:"#0b1f9e"
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color:"#fafcfc"
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "purple",
    color:"black"
  },
  loginText:{
    color: "black",
  },
});