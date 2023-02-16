export const state = () => ({
  todos: [],
  loading: false,
});

export const mutations = {
  SETTODOS(state, payload) {
    state.todos = payload;
  },
  SETTODO(state, payload) {
    state.todos.push(payload);
  },

  SETLOADING(state, payload) {
    state.loading = payload;
  },
};

export const actions = {
  async fetch({ commit, dispatch }, payload) {
    commit("SETLOADING", true);
    return await this.$axios
      .$get(
        "/todos",
        {},
        {
          auth: {
            username: "zucker",
            password: "123456",
          },
        }
      )
      .then((response) => {
        commit("SETLOADING", false);
        commit("SETTODOS", response);
      })
      .catch(() => {
        commit("SETLOADING", false);
      });
  },

  async createTodo({ commit },todoData) {
    commit("SETLOADING", true);
    return await this.$axios
      .$post('/todos/',todoData)
      .then((response) => {
        commit("SETLOADING", false);
        commit("SETTODO", response);
      })
      .catch(() => {
        commit("SETLOADING", false);
      });
  },
  async toggleToDoCompleted({ commit, dispatch }, todoId) {
    commit("SETLOADING", true);
    return await this.$axios
      .$put(`/todos/${todoId}`)
      .then((_) => {
        commit("SETLOADING", false);
        dispatch('fetch')
      })
      .catch(() => {
        commit("SETLOADING", false);
      });
  },

  async deleteTodo({ dispatch }, todoId) {
    const response  = await this.$axios.$delete(`/todos/${todoId}`);
    dispatch('fetch')
    return response
  },
};
