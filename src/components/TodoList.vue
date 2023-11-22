<template>
  <div>
    <h1 class="text-primary">All Todo</h1>
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-spacebetween">
          <AddTodo> </AddTodo>
          <FilterTodo></FilterTodo>
        </div>
      </div>
      <div class="row" v-if="myTodos">
        <div class="col-md-4 my-4" v-for="todo in myTodos" :key="todo.id">
          <b-card
            @dblclick="completeTodo(todo)"
            :bg-variant="dynamicBackground(todo)"
            text-variant="white"
            class="text-center div-card"
          >
            <b-card-text class="d-flex justify-content-between">
              <span>{{ todo.title }}</span>
              <span @click="deleteTodo(todo.id)"
                ><b-icon icon="trash-fill" variant="danger"></b-icon
              ></span>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilterTodo from "./FilterTodo";
import AddTodo from "./AddTodo";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    FilterTodo,
    AddTodo,
  },
  computed: mapGetters(["myTodos"]),
  methods: {
    completeTodo(todo) {
      todo.completed = !todo.completed;
      this.updateTodo(todo);
    },
    dynamicBackground(todo) {
      return todo.completed ? "success" : "primary";
    },
    ...mapActions(["getTodos", "deleteTodo", "updateTodo"]),
  },
  mounted() {
    this.getTodos();
  },
};
</script>

<style scoped>
.div-card {
  cursor: pointer;
}
</style>
