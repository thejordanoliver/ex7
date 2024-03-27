import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
  },
  addButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Task 1', completed: false },
    { key: '2', description: 'Task 2', completed: true },
  ]);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleTaskCompletion(item.key)}
        />
        <Text style={[styles.taskText, item.completed && { textDecorationLine: 'line-through', textDecorationStyle: 'solid' }]}>
          {item.description}
        </Text>
      </View>
    );
  };

  const toggleTaskCompletion = (key) => {
    setTasks(tasks.map(task => {
      if (task.key === key) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const addTask = () => {
    if (newTaskDescription.trim() !== '') {
      const newTask = {
        key: String(tasks.length + 1),
        description: newTaskDescription,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskDescription('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
      <View style={styles.addButtonContainer}>
        <TextInput
          style={styles.input}
          value={newTaskDescription}
          onChangeText={text => setNewTaskDescription(text)}
          placeholder="Enter new task"
          onSubmitEditing={addTask}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={addTask}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
