<script setup>
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import axios from "axios";

const validationSchema = yup.object({
  title: yup.string().required(),
  price: yup.number().required(),
  description: yup.string()
})

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    title: "",
    price: "",
    description: ""
  }
})

const { value: title } = useField('title')
const { value: price } = useField('price')
const { value: description } = useField('description')

const addProduct = handleSubmit(async (values) => {
  await axios.post('https://httpbin.org/post', values)
    .then((response) => {
      if (response.status === 200) {
        alert("Заказ успешно создан")
      }
    });
}, (values) => {
  alert(Object.values(values.errors));
})
</script>

<template>
  <section class="add-product-section">
    <div class="container">
      <h2 class="section-title">Добавить продукт</h2>
      <form @submit.prevent="addProduct">
        <div class="form-group">
          <label for="title">Название *</label>
          <input type="text" id="title" v-model="title">
        </div>
        <div class="form-group">
          <label for="price">Цена *</label>
          <input type="text" id="price" v-model="price">
        </div>
        <div class="form-group">
          <label for="description">Описание</label>
          <textarea id="description" v-model="description"></textarea>
        </div>
        <button class="submit-btn" type="submit">Добавить</button>
      </form>
    </div>
  </section>
</template>

<style scoped>

</style>