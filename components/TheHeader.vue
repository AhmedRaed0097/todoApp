<template>
  <div class="side-nav-wrapper">
    <header class="d-flex justify-between align-center">
      <div class="user-info d-flex align-center">
        <img class="avatar" :src="authUser.avatar" alt="avatar image" />
        <div class="d-flex flex-column">
          <span class="text-bold">{{ authUser.name }}</span>
          <small class="text-bold">{{ authUser.username }}</small>
        </div>
      </div>
      <div class="logout-wrapper d-flex align-center">
        <button @click.prevent="logout" class="logout-btn action-btn">
         Logout
        </button>
        <img
          width="30"
          src="../assets/icons/logout-icon.svg"
          alt="logout icon"
        />
      </div>
    </header>
  </div>
</template>

<script>
export default {
  computed: {
    authUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.side-nav-wrapper {
  background: #fff;
  height: 80px;
  width: 100%;

  header {
    height: 100%;
    padding: 0 10px;
    border-bottom: 2px solid #dfdfdf;
    .user-info {
      gap: 5px;
      padding: 10px;
      border-right: 2px solid #a9a9a9;

      img {
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
    }
    small {
      margin-top: 5px;
    }
  }
}
</style>
