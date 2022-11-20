import React, {useState, useEffect}  from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';

import firebase from '../../services/firebaseConnection';

export default function Header(props){

  const [nome, setNome] = useState('...Carregando...');

  const navigation = useNavigation();
  let hash = props.data;

  useEffect(()=> {
  async function dados(){
    let usuario = await firebase.database().ref('usuarios/'+hash+'').once('value', (snapshot)=>{
        setNome(snapshot.val().nome);
    });
  }
  dados();


  }, []);
  
  return(
    <View style={styles.header}>
      <Text style={styles.text}>Olá {nome} </Text>
      <TouchableOpacity
        onPress={ () => navigation.goBack()}
      >
        <Feather name="log-out" color={'#FF0000'} size={25}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        height: 55,
        backgroundColor: '#121212',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 0.2,
        shadowColor: '#000',
        elevation: 2,
        width:'100%',
        marginTop:0
      },
      text:{
        color:'#fff',
        fontSize:18        
      }
})