  import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
  import React from 'react'
  import { useState } from 'react'
  import { Keyboard } from 'react-native'
  import { TASKS, firestore, collection, addDoc, serverTimestamp } from '../firebase/Config'

  export default function Add() {
  
      const [task, setTask] = useState('')
  
      const saveToFirestore = async() => {
          if (task.trim() === '') return // don't save empty strings
          
          try {
            console.log("Saving task...")
            const docRef = await addDoc(collection(firestore, TASKS), {
              text: task,
              isStruckThrough: false,
              created: serverTimestamp(),
            })
            console.log("Task saved: " + task)
            setTask("") // clear the input field
      
          } catch (error) {
            console.error("Error saving task: ", error)
          }
          Keyboard.dismiss() // hide the keyboard
        }
  
      return (
          <View style={styles.wrapper}>
              <View style={styles.container}>
                  <TextInput
                  style={styles.form}
                  value={task}
                  onChangeText={text => setTask(text)}
                  placeholder='Add item' 
                  />
                  <TouchableOpacity style={styles.button} onPress={saveToFirestore}>
                      <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
              </View>
          </View>
      )
  }
  
  const styles = StyleSheet.create({
      wrapper: {
          width: "100%",
          paddingLeft: 16,
          paddingRight: 24,
      },
      container: {
          flexDirection: 'row',
          alignItems: 'center', // keep input and button aligned
          marginBottom: 16,
      },
      form: {
          flex: 1, // allows TextInput to take up available space without pushing the button offscreen
          flexShrink: 1, // prevents TextInput from growing indefinitely
          minWidth: 150, // ensures TextInput has a minimum width
          borderWidth: 1,
          borderColor: "#989ea6",
          borderRadius: 5,
          padding: 8,
          backgroundColor: "#fff",
      },
      button: {
          marginLeft: 16,
          backgroundColor: "#cfd6e3",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: "#989ea6",
          borderRadius: 5,
      },
      buttonText: {
          color: "#000",
          textAlign: "center",
      }
  })