<template>
  <main :class="{ 'filed': isLoggedIn }">
    <login-form v-if="!isLoggedIn" />
    <div v-else>
      <the-header />
      <section class="todo-list-section">
        <todo-list />
      </section>
    </div>
  </main>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch("auth/fetchUsers");
  },
  data() {
    return {
      isAuth: true,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
};
</script>

<style lang="scss">
html {
  background: #906cc9;

}
main {
  width: 70vw;
  height: 88vh;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;

  @media (max-width: 1200px) {
    width: 90vw;
    width: 90dvw;
    height: 86vh;
    padding-bottom: 30px;
  }

  .todo-list-section {
    flex: 2;
    // z-index: -1;
  }
}
.filed{
  background: #412d61;
  border: 3px solid #fff;

}
</style>
