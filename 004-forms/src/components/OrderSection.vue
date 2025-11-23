<script setup>
import axios from "axios";
import * as yup from 'yup';
import {useField, useForm} from "vee-validate";
import {ref} from "vue";

const showAddressForm = ref(false);

const validateAddress = (value) => {
  if (!showAddressForm.value) {
    return true;
  } else {
    return value !== '';
  }
}

const validateCity = (value) => {
  if (!showAddressForm.value) {
    return true;
  } else {
    return value !== '';
  }
}

const validatePostalCode = (value) => {
  if (!showAddressForm.value) {
    return true;
  } else {
    return value !== '';
  }
}

const validationSchema = yup.object({
  email: yup.string().email('Email incorrect').required('Email is required'),
  name: yup.string().required('Name is required'),
  address: yup.string().test('address', 'Address is required', validateAddress),
  city: yup.string().test('city', 'City is required', validateCity),
  postalCode: yup.string().test('postalCode', 'PostalCode is required', validatePostalCode)
});

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    email: "",
    name: "",
    city: "",
    address: "",
    postalCode: "",
  }
});

const { value: email, errorMessage: emailErrors } = useField('email');
const { value: name, errorMessage: nameErrors } = useField('name');
const { value: city, errorMessage: cityErrors } = useField('city');
const { value: address, errorMessage: addressErrors } = useField('address');
const { value: postalCode, errorMessage: postalCodeErrors } = useField('postalCode');

const createOrder = handleSubmit(async (values) => {
  await axios.post(' https://httpbin.org/post', values)
    .then((response) => {
      if (response.status === 200) {
        alert("Заказ успешно создан")
      }
    });
}, (values) => {
  alert(Object.values(values.errors));
});
</script>


<template>
  <section class="order-section">
    <div class="container">
      <h2 class="section-title">Оформление заказа</h2>
      <form class="order-form" id="orderForm" @submit="createOrder">

        <div class="form-group">
          <label for="name">Имя *</label>
          <input type="text" id="name" v-model="name">
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input type="email" id="email" v-model="email">
        </div>

        <div class="form-group">
          <div class="checkbox-group">
            <input type="checkbox" id="needAddress" v-model="showAddressForm">
            <label for="needAddress">Указать адрес доставки</label>
          </div>
          <div class="address-fields" id="addressFields" v-show="showAddressForm">
            <div class="form-group">
              <label for="address">Адрес</label>
              <textarea id="address" rows="3" placeholder="Улица, дом, квартира..." v-model="address"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="country">Страна</label>
                <select id="country" name="country">
                  <option value="ru">Россия</option>
                  <option value="kz">Казахстан</option>
                  <option value="by">Беларусь</option>
                  <option value="other">Другая</option>
                </select>
              </div>
              <div class="form-group">
                <label for="city">Город</label>
                <input type="text" id="city" v-model="city">
              </div>
            </div>
            <div class="form-group">
              <label for="postalCode">Почтовый индекс</label>
              <input type="text" id="postalCode" v-model="postalCode">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="comments">Комментарий к заказу</label>
          <textarea id="comments" rows="4" placeholder="Дополнительные пожелания..."></textarea>
        </div>
        <button type="submit" class="submit-btn">Оформить заказ</button>
      </form>
    </div>
  </section>
</template>

<style scoped>

</style>