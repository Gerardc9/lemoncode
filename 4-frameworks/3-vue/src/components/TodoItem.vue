<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-content">
      <label class="checkbox-container">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="handleToggle"
          class="todo-checkbox"
          :aria-label="`Marcar como ${todo.completed ? 'pendiente' : 'completada'}: ${todo.text}`"
        />
        <span class="checkmark"></span>
      </label>

      <span class="todo-text" :class="{ 'line-through': todo.completed }">
        {{ todo.text }}
      </span>
    </div>

    <button
      @click="handleRemove"
      class="remove-button"
      :aria-label="`Eliminar tarea: ${todo.text}`"
      type="button"
    >
      Eliminar
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Todo } from '@/stores/todos'
import { useTodoStore } from '@/stores/todos'

interface Props {
  todo: Todo
}

const props = defineProps<Props>()
const todoStore = useTodoStore()

const handleToggle = () => {
  todoStore.toggleTodo(props.todo.id)
}

const handleRemove = () => {
  if (confirm(`¿Estás seguro de que quieres eliminar la tarea "${props.todo.text}"?`)) {
    todoStore.removeTodo(props.todo.id)
  }
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.todo-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.todo-item.completed {
  background-color: #f8fafc;
  opacity: 0.8;
  border-color: #e2e8f0;
}

.todo-content {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 0.75rem;
}

.checkbox-container {
  position: relative;
  cursor: pointer;
  user-select: none;
}

.todo-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid #3b82f6;
  border-radius: 4px;
  position: relative;
}

.todo-checkbox:checked ~ .checkmark {
  background-color: #3b82f6;
}

.todo-checkbox:checked ~ .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.todo-text {
  flex: 1;
  font-size: 1rem;
  line-height: 1.5;
  word-break: break-word;
  color: #374151;
}

.todo-text.line-through {
  text-decoration: line-through;
  color: #9ca3af;
}

.remove-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  opacity: 0.6;
}

.remove-button:hover {
  background-color: #fee2e2;
  opacity: 1;
}

.remove-button:focus {
  outline: 2px solid #f87171;
  outline-offset: 2px;
}

@media (max-width: 480px) {
  .todo-item {
    padding: 0.75rem;
  }

  .todo-text {
    font-size: 0.9rem;
  }

  .remove-button {
    font-size: 1rem;
    padding: 0.25rem;
  }
}
</style>
