import axios from "axios";
export default {
  state: {
    todos: [],
  },
  getters: {
    myTodos(state) {
      return state.todos;
    },
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    setTodo(state, newTodo) {
      state.todos.unshift(newTodo);
    },
    removeTodo(state, removeId) {
      state.todos = state.todos.filter((todo) => {
        return todo.id != removeId;
      });
    },
    upgradeTodo(state, todo) {
      state.todos.forEach((td) => {
        if (td.id == todo.id) {
          td = todo;
        }
      });
    },
  },
  actions: {
    async getTodos({ commit }) {
      let res = await axios.get("http://localhost:3000/todos");
      let todos = res.data;
      commit("setTodos", todos);
    },
    async addTodo({ commit }, newTodo) {
      let res = await axios.post("http://localhost:3000/todos", newTodo);
      commit("setTodo", res.data);
    },
    async deleteTodo(context, removeId) {
      await axios.delete(`http://localhost:3000/todos/${removeId}`);
      context.commit("removeTodo", removeId);
    },
    async filterTodo(context, limit) {
      let res = [];
      if (limit !== "all") {
        res = await axios.get(`http://localhost:3000/todos?_limit=${limit}`);
      } else {
        res = await axios.get("http://localhost:3000/todos");
      }
      context.commit("setTodos", res.data);
    },
    async updateTodo(context, todo) {
      let res = await axios.put(`http://localhost:3000/todos/${todo.id}`, todo);
      console.log(res);
      context.commit("upgradeTodo", res.data);
    },
  },
};
