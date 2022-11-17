<template>
  <form
    method="post"
    @submit.prevent="submitForm"
    class="w-full h-full rounded-r-md flex flex-col items-center justify-center"
  >
    <h1 v-if="showError" class="mb-4 text-sm font-mono text-red-900">
      {{ errMsg }}
    </h1>
    <h1 class="text-3xl font-semibold mb-4 text-slate-600">Sign Up</h1>
    <div class="w-10/12 relative">
      <CustomInputField name="fullName" placeholder="Name" type="text" />
    </div>
    <div class="w-10/12 relative">
      <CustomInputField name="email" placeholder="Email" type="text" />
    </div>
    <div class="w-10/12 relative">
      <CustomInputField
        name="password"
        placeholder="Password"
        type="password"
      />
    </div>
    <div class="w-10/12 relative">
      <CustomInputField
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
      />
    </div>
    <Loading v-if="isLoading" />
    <CustomButton v-else @click="submitForm" btnName="Sign Up" />
  </form>
</template>
<script setup>
import { useField, useForm } from "vee-validate";
import axios from "../../axios/axiosConfig";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import Loading from "../Loading.vue";

const isLoading = ref(false);

const store = useStore();

const showError = ref(false);
const errMsg = ref("");
const router = useRouter();

const signUpValidationSchema = {
  fullName(value) {
    if (!value) return "Name Is Required";
    if (value.length < 3) return "Names must be >= 3 chars";
    return true;
  },
  email(value) {
    if (!value) return "Email is Required";
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim()))
      return "Invalid email address";
    return true;
  },

  password(value) {
    if (!value) return "Password is required";
    else if (value.trim().length < 6) return "Enter at least 6+ chars";
    return true;
  },
  confirmPassword(value) {
    if (!value) return "Required Field";
    if (password.value !== value.trim()) return "Password Doesn't match";
    return true;
  },
};

const { handleSubmit } = useForm({ validationSchema: signUpValidationSchema });
const { value: password } = useField("password");

const submitForm = handleSubmit(
  async (values) => {
    const { email, password, fullName } = values;

    isLoading.value = true;
    try {
      const response = await axios.post("/register", {
        username: fullName,
        email,
        password,
      });

      isLoading.value = false;
      if (response.data.success) {
        store.dispatch("SET_USER", response.data.user);
        store.dispatch("SET_ACCESS_TOKEN", response.data.accessToken);
        router.push("/");
      } else {
        errMsg.value = response.data.error[0].message;
        showError.value = true;
        setTimeout(() => {
          showError.value = false;
        }, 2000);
      }
    } catch (error) {
      isLoading.value = false;
      errMsg.value = error.message;
      showError.value = true;
      setTimeout(() => {
        showError.value = false;
      }, 2000);
    }
  },

  (err) => {}
);
</script>
<style></style>
