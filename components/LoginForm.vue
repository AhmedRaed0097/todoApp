<template>
  <div class="card-wrapper login-wrapper">
    <div class="card">
      <div class="login-form-wrapper d-flex">
        <form class="login-form d-flex flex-column justify-center">
          <h2>Login</h2>
          <div
            class="login-fields-wrapper d-flex flex-column justify-center align-center"
          >
            <div class="form-inner-wrapper">
              <small class="text-bold"> User Name </small>
              <input
                v-model="form.username"
                readonly
                class="field username-field"
                type="text"
                placeholder="user name ..."
              />
            </div>
            <div class="form-inner-wrapper">
              <small class="text-bold"> Password </small>
              <div class="field-wrapper">
                <input
                  v-model="form.password"
                  @keydown.enter="login"
                  class="field password-field"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="password .."
                />
                <button
                  @click.prevent="showPassword = !showPassword"
                  class="action-btn"
                >
                  <img
                    v-if="!showPassword"
                    width="30"
                    src="~/assets/icons/show-icon.svg"
                    alt="show icon"
                  />
                  <img
                    v-else
                    width="25"
                    src="~/assets/icons/hide-icon.svg"
                    alt="hide icon"
                  />
                </button>
              </div>
            </div>
          </div>
          <small v-if="!isValid" class="error-message">{{
            erorrMessage
          }}</small>
          <button @click.prevent="login" class="login-btn select-btn">
            Login
          </button>
        </form>
        <div class="users-list-wrapper">
          <h2>Available users</h2>
          <div class="avatar-wrapper d-flex justify-around wrap">
            <div
              v-for="user in users"
              :key="user.id"
              class="avalibal-user d-flex flex-column align-center"
            >
              <img width="120" :src="user.avatar" alt="user avatar" />
              <span>
                Name:
                <strong>
                  {{ user.name }}
                </strong>
              </span>
              <span
                >User Name:
                <strong>
                  {{ user.username }}
                </strong>
              </span>
              <button @click="selectUser(user)" class="select-btn">
                select user
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async fetch(){
    await this.$store.dispatch('auth/fetchUsers')
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      erorrMessage: "",
      isValid: true,
      showPassword: false,
    };
  },
  computed: {
    users() {
      return this.$store.state.auth.users;
    },
  },
  methods: {
    selectUser(user) {
      this.form.username = user.username;
    },
    async login() {
      if (this.form.username.length && this.form.password.length) {
        const user = this.users.find(
          (user) =>
            (user.username === "zucker" && this.form.password === "123456") ||
            (user.username === "felon" && this.form.password === "123123") ||
            (user.username === "robon" && this.form.password === "secret")
        );
        if (user) {
          await this.$store.dispatch("auth/login", user);
        } else {
          this.erorrMessage = "password not correct , please try again !";
          this.isValid = false;
        }
      } else {
        this.erorrMessage = "please complete data !";
        this.isValid = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  margin: 35px auto 0 auto;
  @media (max-width: 460px) {
    margin-top: 10px;
  }
  .card {
    width: 750px;
    margin-top: 60px;

    @media (max-width: 880px) {
      width: 83vw;
    }
    @media (max-width: 650px) {
      width: 91vw;
    }
    @media (max-width: 370px) {
      height: max-content;
      margin-top: -40px;
    }
  }
}
.login-fields-wrapper {
  flex-direction: column;
  gap: 40px;

  .field {
    width: 80%;
    border: 1px solid #dfdfdf;
    border-radius: 8px;
    // padding: 0 10px;
  }
  .password-field {
    border: none;
  }
}

.login-form-wrapper {
  margin-top: 30px;
  height: 100%;

  @media (max-width: 650px) {
    flex-direction: column;
    justify-content: space-between;
  }

  .login-form {
    width: 50%;

    @media (max-width: 650px) {
      width: 100%;
    }
  }
  .users-list-wrapper {
    padding: 20px;
    background: rgb(144, 180, 180);
    border-radius: 0 8px 8px 0;
    width: 50%;
    @media (max-width: 650px) {
      border-radius: 0 0 8px 8px;
      width: 100%;
      margin: 0;
      padding: 0;
      padding-bottom: 10px;
      margin-top: 30px;
    }
  }
}
.form-inner-wrapper {
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  .password-field{
    padding-left: 0;

  }
  .username-field{
    width: 90%;
    margin-left: 7px;

  }
  small{
    margin-left: 10px;
  }
}
.avalibal-user {
  margin-bottom: 10px;
  margin-top: 37px;
  img {
    background: #dfdfdf;
    border-radius: 50%;
    margin-bottom: 5px;

    @media (max-width: 650px) {
      width: 72px;
      height: 72px;
    }
  }
  span {
    margin: 4px 0;
    font-size: 14px;
    @media (max-width: 650px) {
      font-size: 12px;
    }
  }
}
.avatar-wrapper {
  @media (max-width: 650px) {
    flex-direction: row;
  }
}
.select-btn {
  background: #6c9a9c;
  margin-top: 8px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  color: #fff;
  box-shadow: 1px 2px 5px #8a8a8a;
  cursor: pointer;
}

.login-btn {
  border-radius: 4px;
  margin: 30px 45px 0 45px;
  padding: 13px;
}
</style>
