import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, StatusBar, Modal, Button } from 'react-native';

export default function App() {
    const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [txtUserLogin, setTextInputValueUser] = React.useState('');
  const [txtPassword, setTextInputValuePassword] = React.useState('');

  const getDataUser = async () => {
     if(txtUserLogin == "" || txtPassword == ""){
        alert("LOGIN NAME atau PASSWORD tidak boleh kosong");
     }
     else{
        try 
        {
         const response = await fetch('http://103.58.100.219:7071/api/Mobile/GetUser?loginName='+txtUserLogin+'&password='+txtPassword+'');
         const json = await response.json();
         setData(json.returnValue);
         if(json.message == "Success"){
           alert("Login Sukes, Tapi belum belajar route navigasi :(")
         }
         else{
             alert("Login Gagal. Periksa kembali LOGIN NAME dan PASSWORD Anda")
         }
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }
  }
   
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/Logo.png")} />
   
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Login Name"
            placeholderTextColor="#ffffff"
            onChangeText={text => setTextInputValueUser(text)}
            value={txtUserLogin}
          />
        </View>
   
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#ffffff"
            secureTextEntry={true}
            onChangeText={text => setTextInputValuePassword(text)} 
            value={txtPassword}
          />
        </View>
   
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
   
        <TouchableOpacity style={styles.loginBtn} onPress={getDataUser}>
          <Text style={styles.loginText}>LOGIN</Text>
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
      backgroundColor: "#abdbe3",
      borderRadius: 10,
      width: "90%",
      height: 45,
      marginBottom: 20,
   
      alignItems: "flex-start",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      width: 100,
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
   
    loginBtn: {
      width: "40%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#2596be",
    },
    loginText: {
        color: "white",
        fontWeight: "bold",
    }
  });