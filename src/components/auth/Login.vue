<template>
  <form
    @submit.prevent="submit"
    method="post"
    class="w-full h-full rounded-r-md flex flex-col items-center justify-center"
  >
    <h1
      v-if="showError"
      class="mb-4 text-sm font-mono text-red-900 text-center"
    >
      {{ errMsg }}
    </h1>
    <h1 class="text-3xl font-semibold mb-4 text-slate-600">Sign In</h1>

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

    <Loading v-if="isLoading" />
    <CustomButton v-else @click="submit" btnName="Sign In" />
  </form>
</template>
<script setup>
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { logInValidationSchema } from "../../composables/validationSchema";
import axios from "../../axios/axiosConfig";
import Loading from "../Loading.vue";

const isLoading = ref(false);

const store = useStore();

const showError = ref(false);
const errMsg = ref("");

const router = useRouter();
const { handleSubmit } = useForm({ validationSchema: logInValidationSchema });

const submit = handleSubmit(
  async (values) => {
    const { email, password } = values;
    isLoading.value = true;
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      isLoading.value = false;

      if (response.data.success) {
        store.dispatch("SET_USER", response.data.user);
        store.dispatch("SET_ACCESS_TOKEN", response.data.accessToken);
        router.push("/");
      } else {
        errMsg.value = response.data.error;
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
  (err) => {
    errMsg.value = error.message;
    showError.value = true;
    setTimeout(() => {
      showError.value = false;
    }, 2000);
  }
);
</script>
<style></style>
