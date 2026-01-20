<script setup>
import * as yup from 'yup';
import {useField, useForm} from "vee-validate";

definePageMeta({
  layout: 'auth'
});

const router = useRouter()
const authStore = useAuthStore()

const validationSchema = yup.object({
  login: yup.string().required(),
  password: yup.string().required()
})

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    login: "",
    password: ""
  }
})

const { value: login } = useField('login');
const { value: password } = useField('password');

const auth = handleSubmit(async (values) => {
  await authStore.login(values.login, values.password)
  await router.push('/products/add')
}, (values) => {
  alert(Object.values(values.errors));
})
</script>

<template>
  <div class="container">
    <div class="auth-form">
      <h2 class="section-title">Авторизация</h2>
      <form @submit.prevent="auth">
        <div class="form-group">
          <label for="login">Логин *</label>
          <input type="text" id="login" v-model="login">
        </div>
        <div class="form-group">
          <label for="password">Пароль *</label>
          <input type="password" id="password" v-model="password">
        </div>
        <button class="submit-btn" type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>