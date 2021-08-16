import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Alert, TouchableWithoutFeedback, Touchable, Keyboard } from 'react-native';
import {db} from './config';
import firebase from 'firebase';
import SingleTodo from './SingleTodo';

export default function App() {

  const [ input,setInput] = useState("")
  const [ todos, setTodos ] = useState([])
 
  useEffect(()=>{
    getTodo()
  },[])

  const addingTodo=(input)=>{
    if(input.length>0){
      db.collection("todos").add({ todo: input, complete:false , timestamp: firebase.firestore.FieldValue.serverTimestamp() });
      setInput("")
    }else{
      Alert.alert('Empty Input', 'Please type something to make a todo', [{
      text : 'Ok', onPress:()=>console.log("empty value")
      }])
    }
    
  }

  const getTodo = () => {
    db.collection("todos").orderBy("timestamp", "desc").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          complete : doc.data().complete
        }))
      );
    });
  };

  

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.heading}>Todo App</Text>
          
          <View style={styles.inputComponent}>
            <TextInput 
            style={styles.inputField}
            value={input}
            onChangeText={(value)=>setInput(value)}
            />
            <Button title="add Todo"
            onPress={()=>addingTodo(input)}/>
        

            <View style={styles.itemContainer}>
                    <FlatList
                    keyExtractor={(item)=>item.id}
                    data={todos}
                    renderItem={({item})=>(
                      <SingleTodo todo={item.todo} id={item.id} complete={item.complete}/>
                )}
                    />
                      </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputComponent:{
  
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding:50
  },
  heading:{
    fontSize:25,
    fontWeight:'bold',
  },
  inputField:{
    width:200,
    borderWidth:1,
    padding:5,
    margin:5,
    borderRadius:5,
    borderColor:'#777'
  },
  itemContainer:{
    flex:1,
    margin:10
  }

});
