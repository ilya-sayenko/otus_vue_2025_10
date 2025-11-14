<script setup>
import {reactive, ref} from "vue";

const color = "green";
const showUserList = ref(false);
const users = reactive([
  {
    id: 1,
    name: 'John',
    position: 'Manager',
    dateOfBirth: new Date(1995, 1, 1),
    show: true
  },
  {
    id: 2,
    name: 'Peter',
    position: 'Manager',
    dateOfBirth: new Date(1994, 1, 1),
    show: true
  },
  {
    id: 3,
    name: 'Michael',
    position: 'Manager',
    dateOfBirth: new Date(1993, 1, 1),
    show: true
  }
]);

function toggleShowUser(user) {
  user.show = !user.show;
}

function toggleShowUserList() {
  showUserList.value = !showUserList.value;
}
</script>

<template>
  <div class="card">
    <h1 class="card-title">Пользователи</h1>
    <button class="btn" @click="toggleShowUserList">Показать/Скрыть</button>
    <div v-show="showUserList">
      <div class="user" v-for="user in users" @click="toggleShowUser(user)">
        <div class="user-title">{{ user.name }}</div>
        <div v-show="user.show">
          <div>Дата рождения: {{user.dateOfBirth.toLocaleDateString() }}</div>
          <div>Должность: {{user.position }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user:hover {
  color: v-bind("color");
}
</style>
