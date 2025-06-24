<template>
  <div class="todo-list-container">
    <!-- Estadísticas -->
    <div v-if="todoStore.totalTodos > 0" class="stats">
      <div class="stat-item">
        <span class="stat-number">{{ todoStore.totalTodos }}</span>
        <span class="stat-label">Total</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ todoStore.pendingTodos }}</span>
        <span class="stat-label">Pendientes</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">{{ todoStore.completedTodos }}</span>
        <span class="stat-label">Completadas</span>
      </div>
    </div>

    <!-- Lista de tareas -->
    <div class="todo-list-wrapper">
      <ul v-if="todoStore.totalTodos > 0" class="todo-list">
        <TodoItem v-for="todo in todoStore.todos" :key="todo.id" :todo="todo" />
      </ul>

      <!-- Estado vacío -->
      <div v-else class="empty-state">
        <div class="empty-icon">✓</div>
        <h3 class="empty-title">¡Tu lista está vacía!</h3>
        <p class="empty-description">Agrega tu primera tarea para comenzar a organizarte.</p>
      </div>
    </div>

    <!-- Progreso -->
    <div v-if="todoStore.totalTodos > 0" class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
      </div>
      <span class="progress-text"> {{ Math.round(progressPercentage) }}% completado </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todos'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()

const progressPercentage = computed(() => {
  if (todoStore.totalTodos === 0) return 0
  return (todoStore.completedTodos / todoStore.totalTodos) * 100
})
</script>

<style scoped>
.todo-list-container {
  width: 100%;
}

.stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 80px;
  border: 1px solid #e2e8f0;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.todo-list-wrapper {
  min-height: 200px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  background-color: #ffffff;
  border-radius: 12px;
  border: 2px dashed #cbd5e1;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.empty-title {
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.empty-description {
  color: #64748b;
  font-size: 1rem;
  margin: 0;
  max-width: 300px;
}

.progress-section {
  margin-top: 1.5rem;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background-color: #3b82f6;
  border-radius: 4px;
}

.progress-text {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

@media (max-width: 480px) {
  .stats {
    gap: 0.5rem;
  }

  .stat-item {
    padding: 0.75rem;
    min-width: 70px;
  }

  .stat-number {
    font-size: 1.25rem;
  }

  .empty-state {
    padding: 2rem 1rem;
  }

  .empty-icon {
    font-size: 3rem;
  }

  .empty-title {
    font-size: 1.25rem;
  }
}
</style>
