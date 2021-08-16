import React from 'react'
import { View, Text, TouchableOpacity, FlatList, Button, StyleSheet } from 'react-native'
import { db } from "./config";


 

export default function SingleTodo({todo, id, complete}) {
    const deleteTodo = () => {
        db.collection("todos").doc(id).delete();
      };

      const updateTodo=()=>{
          db.collection("todos").doc(id).update({
              complete:!complete
          })
      }

    return (
        
               
                <View style={styles.list}>
                    {complete ?  <Text style={styles.todoStrike}>{todo}</Text> : <Text style={styles.todo}>{todo}</Text>}
              
                    <TouchableOpacity  onPress={updateTodo}>{complete ? <Text style={styles.text}>Undone</Text> :<Text style={styles.text}>Done</Text>}</TouchableOpacity>

                   <TouchableOpacity  onPress={deleteTodo}><Text style={styles.button}>X</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    list:{
        flexDirection:'row',
        marginBottom:5
    },
    todo:{
        fontSize:20
    },
    button:{
        marginLeft:10,
        paddingLeft:5,
        backgroundColor:'red',
        width:20,
        fontWeight:'bold',
        color:'white',
        borderRadius:5
    },
    todoStrike:{
        textDecorationLine: 'line-through',
        fontSize:20
    },
    text:{
        flexDirection:'column',
        backgroundColor:'black',
        color:'white',
        fontWeight:'bold',
        padding:5,
        marginLeft:5,
        borderRadius:5
    }
})
