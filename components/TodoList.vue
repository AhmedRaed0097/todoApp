<template>
  <div class="card-wrapper d-flex justify-center align-center">
    <div class="card">
      <h2>ToDo</h2>
      <form class="todos-form">
        <div class="field-wrapper">
          <input
            v-model.trim="form.task"
            class="field"
            type="text"
            placeholder="enter todo text.."
          />
          <button @click.prevent="addTodo" class="action-btn">
            <img width="35" src="../assets/icons/add-icon.svg" alt="add icon" />
          </button>
        </div>
        <div class="todos-list-wrapper">
          <todo-items />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItems.vue";
export default {
  async fetch() {
    await this.$store.dispatch("todos/fetch");
  },
  components: { TodoItem },
  data() {
    return {
      form: {
        task: "",
      },
    };
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
  },
};
</script>
<style lang="scss">
.field-wrapper {
  width: 90%;
  margin: 0 auto;
  background: #fff;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  padding: 0 10px;
  margin-bottom: 10px;


}
.field {
  width: 90%;
  padding: 15px 10px;
  outline: none;
  border: none;
}
.action-btn {
  border: none;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    cursor: auto;
  }
}
.todo {
  width: 86%;
  height: 55px;
  margin: 50px auto;
  padding: 0 20px;
  border-radius: 10px;
  background: #ebebeb;
  box-shadow: 1px 5px 5px #c5c5c5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
