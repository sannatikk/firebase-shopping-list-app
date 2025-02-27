import { Text, StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore, TASKS } from '../firebase/Config';

export default function Row({ item }) {
  const toggleStrikethrough = async () => {
    try {
      await updateDoc(doc(firestore, TASKS, item.id), {
        isStruckThrough: !item.isStruckThrough,
      });
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async () => {
    try {
      await deleteDoc(doc(firestore, TASKS, item.id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <View style={styles.rowContainer}>
      <Pressable onPress={toggleStrikethrough} style={styles.row}>
        <Text style={[styles.itemText, item.isStruckThrough && styles.strikethrough]}>
          {item.text}
        </Text>
      </Pressable>

      {item.isStruckThrough && (
        <Ionicons name="trash" size={24} onPress={deleteItem} style={styles.trashIcon} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    rowContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingHorizontal: 16,
      marginBottom: 10,
      maxWidth: "100%",
    },
    row: {
      flexDirection: "row",
      padding: 8,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#989ea6",
      flexShrink: 1,
      maxWidth: "100%",
      backgroundColor: "#fff",
    },
    itemText: {
      fontSize: 16,
      flex: 1,
    },
    strikethrough: {
      textDecorationLine: "line-through",
      color: "#808080",
    },
    trashIcon: {
      marginLeft: 12,
      color: "#808080",
    },
  });