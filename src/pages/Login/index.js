import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Feather from 'react-native-vector-icons/Feather';

import firebase from '../../services/firebaseConnection';

export default function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const [statusLogin, setStatusLogin] = useState(true);
  const [statusConta, setStatusConta] = useState(false);

  const navigation = useNavigation();

  function mudaStatus(){
    if(statusLogin === true){
      setStatusLogin(false);
    }
    else{
      setStatusLogin(true);
    }
    if(statusConta === true){
      setStatusConta(false);
    }
    else{
      setStatusConta(true);
    }
  }

  async function login(){
    setLoading(true);
    await firebase.auth().signInWithEmailAndPassword(email, senha)
    .then( (value) => {
      navigation.navigate('TaskInit', {id:value.user.uid});
      setLoading(false);
    })
    .catch( (error) => {
        alert('Ops algo deu errado!');
        setLoading(false);
        return;
    })

    setEmail('');
    setSenha('');
    setLoading(false);
  }

  async function createUser(){
    setLoading(true);
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then( (value) => {
      alert('Usuario criado com Sucesso !');
      firebase.database().ref('usuarios').child(value.user.uid).set({
        nome: nome
      });
      setNome('');
      setEmail('');
      setSenha('');
      mudaStatus();
      setLoading(false);
    })
    .catch( (error) => {
      if(error.code === 'auth/weak-password'){
        alert('Sua senha deve ter pelo menos 6 caracteres');
        setLoading(false);
        return;
      }
      if(error.code === 'auth/invalid-email'){
        alert('Email invalido');
        setLoading(false);
        return;
      }else{
        alert('Ops algo deu errado!');
        setLoading(false);
        return;
      }
      setLoading(false);
    })

    setEmail('');
    setSenha('');
  }

 return (
   <View style={styles.container}>
    <Image 
      source={require('../../image/logo.png')}
      style={styles.logo}
    />
    <Text style={styles.titulo}>Simple Task</Text>

    { statusLogin &&
    <View style={styles.containerLogin}>
      <Text style={[styles.text,{fontWeight:'bold'}]}>Seja bem vindo ! Faça seu Login</Text>
      <View style={styles.inputLogo}>
      <Feather name="at-sign" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Ex: seuemail@email.com"
          value={email}
          onChangeText={ (texto) => setEmail(texto) }
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputLogo}>
      <Feather name="lock" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Ex: *****"
          value={senha}
          onChangeText={ (texto) => setSenha(texto) }
          secureTextEntry={true}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.botao} onPress={login}>
        {
          loading ? (
            <ActivityIndicator color="#ffffff" size={22} />
          ) : (
            <Text style={styles.botaoText}>Acessar</Text>
          )
        }
        </TouchableOpacity>
        <TouchableOpacity onPress={mudaStatus}>
          <Text style={styles.botaoTextLink}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    }
    { statusConta &&
      <View style={styles.containerLogin}>
      <Text style={[styles.text,{fontWeight:'bold'}]}>Seja bem vindo ! Crie sua Conta</Text>
      <View style={styles.inputLogo}>
      <Feather name="user" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Ex: Seu Nome"
          value={nome}
          onChangeText={ (texto) => setNome(texto) }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputLogo}>
      <Feather name="at-sign" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Ex: seuemail@email.com"
          value={email}
          onChangeText={ (texto) => setEmail(texto) }
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputLogo}>
      <Feather name="lock" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Ex: *****"
          value={senha}
          onChangeText={ (texto) => setSenha(texto) }
          secureTextEntry={true}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.botao} onPress={createUser}>
        {
          loading ? (
            <ActivityIndicator color="#ffffff" size={22} />
          ) : (
            <Text style={styles.botaoText}>Criar Conta</Text>
          )
        }
        </TouchableOpacity>
        <TouchableOpacity onPress={mudaStatus}>
          <Text style={styles.botaoTextLink}>Fazer Login</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    }
   </View>
    
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#dcdcdc'
    },
    logo:{
      width:150,
      height:150
    },
    titulo:{
      fontSize:30,
      fontWeight:'bold',
      padding:15
    },
    text:{
      fontSize:16,
      padding:5
    },
    containerLogin:{
      alignItems:'flex-start',
      justifyContent:'flex-start',
      padding:15,
      marginTop:15,
      width:'95%',
      borderColor:'#121212',
      borderRadius:5,
      borderWidth:2
    },
    inputLogo:{
      flexDirection:'row',
      marginTop:10
    },
    input:{
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#DDD',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      width: '87%',
      padding: 8,
      fontSize: 18
    },
    icon:{
      backgroundColor: '#121212',
      borderWidth: 1,
      borderColor: '#121212',
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      width: '13%',
      padding: 9,
      fontSize: 25,
      color:'#fff'
    },
    areaBtn:{
      width:'100%',
      alignItems: 'center',
      marginTop: 15,
      justifyContent: 'center'
    },
    botao:{
     width:'100%',
     height: 50,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 10,
     borderRadius: 5,
     backgroundColor:'#ff0000'
    },
    botaoText:{
      fontSize: 18,
      color:'#FFF'
    },
    botaoTextLink:{
      fontSize: 16,
      color:'#47667b',
      marginTop:10
    }
  })