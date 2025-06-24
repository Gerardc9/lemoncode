import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export const useTodoStore = defineStore('todos', () => {
  // Estado
  const todos = ref<Todo[]>([])

  // Getters computados
  const totalTodos = computed(() => todos.value.length)
  const completedTodos = computed(() => todos.value.filter((todo) => todo.completed).length)
  const pendingTodos = computed(() => todos.value.filter((todo) => !todo.completed).length)

  // Acciones
  const addTodo = (text: string) => {
    if (text.trim() === '') return

    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    }

    todos.value.push(newTodo)
  }

  const removeTodo = (id: string) => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }

  const toggleTodo = (id: string) => {
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  const updateTodoText = (id: string, newText: string) => {
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo && newText.trim() !== '') {
      todo.text = newText.trim()
    }
  }

  return {
    // Estado
    todos,
    // Getters
    totalTodos,
    completedTodos,
    pendingTodos,
    // Acciones
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodoText,
  }
})
