<template>
  <div>
    <div v-for="(todo, index) in todosList" :key="index" class="todo">
      <p :class="{ 'completed-todo-text': todo.completed }">
        {{ todo.task }}
      </p>

      <div class="actions">
        <button
          :disabled="todo.completed"
          @click.prevent="setToDoToCompleted(todo)"
          class="action-btn"
        >
          <img
            v-if="!todo.completed"
            width="28"
            src="../assets/icons/done-icon-active.svg"
            alt="done icon"
          />
          <img
            v-else
            width="28"
            src="../assets/icons/done-icon-unactive.svg"
            alt="done icon"
          />
        </button>
        <button
          :disabled="!todo.completed"
          @click.prevent="setToDoToUncompleted(todo)"
          class="action-btn"
        >
          <img
            v-if="todo.completed"
            width="28"
            src="../assets/icons/undo-icon-active.svg"
            alt="undone icon"
          />
          <img
            v-else
            width="28"
            src="../assets/icons/undo-icon-unactive.svg"
            alt="undone icon"
          />
        </button>
        <button @click.prevent="deleteTodo(todo.id)" class="action-btn">
          <img
            width="28"
            src="../assets/icons/delete-icon.svg"
            alt="delete icon"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch(){
    await this.$store.dispatch('todos/fetch')
  },
  computed: {
    todosList() {
      return this.$store.state.todos.todos;
    },
  },

  methods: {
    async addTodo() {
      if (this.form.task.length > 0) {
        const formData = new FormData();
        formData.append("task", this.form.task);
        await this.$store.dispatch("todos/createTodo", {
          task: this.form.task,
        });

        this.form.task = "";
      }
    },
    async setToDoToCompleted(todo) {
      if (!todo.completed) {
        await this.$store.dispatch("todos/toggleToDoCompleted", todo.id);
      }
    },
    async setToDoToUncompleted(todo) {
      if (todo.completed) {
        await this.$store.dispatch("todos/toggleToDoCompleted", todo.id);
      }
    },
    async deleteTodo(todoId) {
      await this.$store.dispatch("todos/deleteTodo", todoId);
    },
  },
};
</script>
