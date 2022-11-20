import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Keyboard} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import Header from '../../component/Header';
import firebase from '../../services/firebaseConnection';
import Listagem from '../../component/Listagem';

export default function TaskInit({route}) {

 const [tarefa, setTarefa] = useState('');
 const [tarefas, setTarefas] = useState([]);
 const [loading, setLoading] = useState(true);

 const [key, setKey] = useState('');
 const inputRef = useRef(null);

 let hash_user = route.params.id;
 
 useEffect(()=>{

  async function loadTasks(){
    await firebase.database().ref('tarefas').orderByChild('uid').equalTo(hash_user).once('value', (snapshot)=> {
        setTarefas([]);

        snapshot.forEach((chilItem) => {
          let data = {
            key: chilItem.key,
            tarefa: chilItem.val().tarefa
          };
          setTarefas(oldArray => [...oldArray, data]);
        })
        setLoading(false);
      });
    }

    loadTasks();
  },[]);
async function addTask(){
  setLoading(true);

  if(key !== ''){
    firebase.database().ref('tarefas/'+key).update({
      tarefa: tarefa
    })
    .then(()=> {
      const taskIndex = tarefas.findIndex( (item) => item.key === key);
      const taskClone = tarefas;
      taskClone[taskIndex].tarefa = tarefa

      setTarefas([...taskClone]);


    })

    Keyboard.dismiss();
    setTarefa('');
    setKey('');
    setLoading(false);
    return;
  }

  if(tarefa !== ''){
    let tarefas = await firebase.database().ref('tarefas');
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      tarefa: tarefa,
      uid: hash_user
    })
    .then(()=>{
      const data = {
        key: chave,
        tarefa: tarefa
      };
      setTarefas(oldArray => [...oldArray, data])

    });
    Keyboard.dismiss();
    setTarefa('');
    setLoading(false);
  }
}

function taskDelete(key){
  Alert.alert(
    'Simple Task',
    'Deseja finalizar esta tarefa?',  
    [
       {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'OK', onPress: () => firebase.database().ref('tarefas').child(key).remove()
       .then(() => {
         const findTasks = tarefas.filter( item => item.key !== key)
         setTarefas(findTasks)
       })},
    ],
    { cancelable: false }
)

  
}

function taskEdit(data){
  setKey(data.key);
  setTarefa(data.tarefa);
  inputRef.current.focus();
}

function cancelaEdit(){
  setKey('');
  setTarefa('');
  Keyboard.dismiss();
}

 return (
  
  <View style={styles.container}>
    <Header data={route.params.id}/>
    <View style={styles.areaIncluir}>
    <TextInput
      style={styles.input}
      placeholder="Digite sua Tarefa"
      value={tarefa}
      ref={inputRef}
      onChangeText={ (texto) => setTarefa(texto) }
      keyboardType="default"
    />
      <TouchableOpacity 
        style={styles.icon}
        onPress={addTask}
      >
        <Feather name="plus" color='#fff' size={25}/>
      </TouchableOpacity>
    </View>
    { key.length > 0 && (
      <View style={{ flexDirection: 'row', marginBottom: 8, marginLeft:15, width:'98%'}}>
        <TouchableOpacity onPress={cancelaEdit}>
          <Feather name="x-circle" size={25} color="#FF0000"/>
        </TouchableOpacity>
        <Text style={{ margin: 5, marginTop:-5, color: '#FF0000', textAlign:'justify' }}>
          Você está editando uma tarefa ! Clique no 'X' pra cancelar ...
        </Text>
      </View>
    )}
      <Text style={styles.titulo}><Feather name="clock" color='#000' size={25} /> Tarefas para Fazer</Text>
      {loading ? 
      (
        <ActivityIndicator color="#121212" size={45} />
      ) :
      (
        <FlatList
        keyExtractor={item => item.key}
        style={{width:'90%'}}
        data={tarefas}
        renderItem={ ({item}) => ( <Listagem data={item} deleteItem={taskDelete} editItem={taskEdit} /> )  }
        />
      )
      }

  
  </View>
  
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor:'#dcdcdc'
    },
    areaIncluir:{
      flexDirection:'row',
      alignItems:'center',
      padding:10,
      marginTop:5,
      marginBottom:5
    },
    titulo:{
      width:'95%',
      height:50,
      fontSize: 16,
      color:'#000',
      fontWeight:'bold',
      textAlign:'center',
      justifyContent:'center',
      padding:10,
      backgroundColor:'#ff0',
      borderColor:'#000',
      borderWidth:1.5
    },
    input:{
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#DDD',
      width: '87%',
      padding: 8,
      fontSize: 18
    },
    icon:{
      backgroundColor: '#121212',
      borderWidth: 1,
      borderColor: '#121212',
      width: '13%',
      padding: 9,
      fontSize: 25,
      color:'#fff'
    },
  })