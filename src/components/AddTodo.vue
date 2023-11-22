<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      v-model="newTodo.title"
      placeholder="Text your todo!"
    />
    <div class="input-group-append">
      <button class="btn btn-primary" @click="addTodo(newTodo), removeText()">
        Add Todo
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      newTodo: {
        title: "",
        completed: false,
      },
    };
  },
  methods: {
    removeText() {
      this.newTodo.title = "";
    },
    ...mapActions(["addTodo"]),
  },
};
</script>

<style></style>
