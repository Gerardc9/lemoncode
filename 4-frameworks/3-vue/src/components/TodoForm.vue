<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <div class="input-container">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="¿Qué necesitas hacer?"
        class="todo-input"
        maxlength="100"
        required
        :disabled="isSubmitting"
      />
      <button
        type="submit"
        class="add-button"
        :disabled="!newTodoText.trim() || isSubmitting"
        aria-label="Agregar tarea"
      >
        <span v-if="!isSubmitting">+</span>
        <span v-else>...</span>
        Agregar
      </button>
    </div>
    <small class="counter">{{ newTodoText.length }}/100</small>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todos'

const todoStore = useTodoStore()
const newTodoText = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!newTodoText.value.trim()) return

  isSubmitting.value = true

  try {
    todoStore.addTodo(newTodoText.value)
    newTodoText.value = ''
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.todo-form {
  margin-bottom: 2rem;
}

.input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #ffffff;
}

.todo-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.todo-input:disabled {
  background-color: #f8fafc;
  cursor: not-allowed;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.add-button:hover:not(:disabled) {
  background-color: #2563eb;
}

.add-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.counter {
  color: #64748b;
  font-size: 0.875rem;
  display: block;
  text-align: right;
}

@media (max-width: 480px) {
  .input-container {
    flex-direction: column;
  }

  .add-button {
    justify-content: center;
  }
}
</style>
