import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

export default function Listagem({ data, deleteItem, editItem }){
  return(
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={ () => editItem(data) }>
        <Text style={styles.text}>{data.tarefa}</Text>
      </TouchableWithoutFeedback>
      <TouchableOpacity 
      style={styles.botao}
      onPress={() => deleteItem(data.key)}
      >
        <Feather name="check" color='#fff' size={23} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    flex:1,
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#121212',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  text:{
    color:'#FFF',
    fontSize: 17
  },
  botao:{
    backgroundColor:'green', 
    padding:5, 
    width:35
  }
});