import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';

export default App = ({navigation}) => {

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
           alert("Login Sukes")
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
      <TextInput placeholder="Login Name" style={{width:200, margin:10}} onChangeText={text => setTextInputValueUser(text)} value={txtUserLogin}>
      </TextInput>

      <TextInput placeholder="Password" style={{width:200, margin:10}} onChangeText={text => setTextInputValuePassword(text)} value={txtPassword}>
      </TextInput>

      <TouchableOpacity onPress={getDataUser} style={{width:200,padding:10,backgroundColor:'magenta',alignItems:'center'}}>
        <Text style={{color:'white'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
  
  });