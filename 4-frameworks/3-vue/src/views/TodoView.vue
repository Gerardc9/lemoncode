<template>
  <div class="todo-view">
    <div class="main-container">
      <header class="app-header">
        <h1 class="app-title">Mi lista de tareas</h1>
        <p class="app-subtitle">Organiza tu día de manera eficiente</p>
      </header>

      <main class="app-main">
        <div class="content-card">
          <TodoForm />
          <TodoList />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
</script>

<style scoped>
.todo-view {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 100%;
}

.main-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
}

.app-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.app-subtitle {
  font-size: 1.1rem;
  margin: 0;
  font-weight: 400;
  color: #5a6c7d;
}

.app-main {
  width: 100%;
}

.content-card {
  background-color: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 968px) {
  .main-container {
    max-width: 100%;
  }

  .content-card {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .app-title {
    font-size: 2rem;
  }

  .app-subtitle {
    font-size: 1rem;
  }

  .content-card {
    padding: 1.5rem;
    border-radius: 12px;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 1.75rem;
  }

  .app-subtitle {
    font-size: 0.9rem;
  }

  .content-card {
    padding: 1rem;
    border-radius: 8px;
  }
}
</style>
