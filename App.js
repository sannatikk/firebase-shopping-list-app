import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { firestore, TASKS, query, collection, orderBy, onSnapshot } from './firebase/Config';
import { useEffect, useState } from 'react';
import Add from './components/Add';
import Row from './components/Row';
import { convertFirebaseTimestampToJS } from './helpers/Functions';

export default function App() {

  const [tasks, setTasks] = useState([])     // state for the tasks

  useEffect(() => {

    const q = query(
      collection(firestore, TASKS), 
      orderBy('isStruckThrough', 'asc'),
      orderBy('created', 'asc'))          // this is the query for the collection

    const unsubscribe = onSnapshot(q, (querySnapshot) => {    // this is the listener for the query
      const tempTasks = []                                 // temporary array for messages
      querySnapshot.forEach((doc) => {                        // loop through the documents in the query
        tempTasks.push({
          ...doc.data(), 
          id: doc.id, 
          created: convertFirebaseTimestampToJS(doc.data().created)})        // add the document data to the array
      })
      setTasks(tempTasks)                               // set the messages state to the array
    })
    return () => {
      unsubscribe()                                           // unsubscribe from the listener when the component is unmounted
    }
  }, [])

  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>S H O P P I N G  L I S T</Text>
      <Add />
      <ScrollView>
        {tasks.map((task) => (
            <Row key={task.id} item={task} />
          ))}
      </ScrollView>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f3f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginTop: 50,
    marginBottom: 20,
  },
})

