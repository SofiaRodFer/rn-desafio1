import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0

    const task = {
      id,
      title: newTaskTitle,
      done: false
    } as Task

    setTasks([...tasks, task])
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = tasks.map(tsk => ({ ...tsk }))

    const foundTask = newTasks.find(tsk => tsk.id === id)

    if (!foundTask) {
      return
    }

    foundTask.done = !foundTask.done

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    const task = tasks.find(tsk => tsk.id !== id)

    if (!task) {
      return
    }

    const newTasks = tasks.map(tsk => ({ ...tsk })).filter(tsk => tsk.id === task.id)

    setTasks(newTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})