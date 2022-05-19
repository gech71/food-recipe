<template>
  <nav
    class="sticky top-0 z-40 h-[3rem] flex bg-slate-200 opacity-[0.98] items-center shadow-md px-4"
  >
    <div
      @click="toggleSideBar"
      class="group lg:hidden flex-col gap-1 hover:cursor-pointer flex pr-4 lg:w-0"
    >
      <div
        class="group-active:scale-x-75 w-8 h-1 bg-black rounded-md transition-all duration-200"
      ></div>
      <div
        class="group-active:scale-x-75 w-8 h-1 bg-black rounded-md transition-all duration-200"
      ></div>
      <div
        class="group-active:scale-x-75 w-4 group-active:w-8 h-1 bg-black rounded-md transition-all duration-200"
      ></div>
    </div>
    <div class="flex h-full flex-1 gap-5 relative items-center">
      <div class="flex-1 lg:flex-initial">
        <h1 class="text-2xl font-semibold text-black">Food Recipe App</h1>
      </div>
      <div
        @click.self="toggleSideBar"
        ref="backDrop"
        class="absolute z-10 top-[3rem] -translate-x-full -left-[calc(4rem+3px)] w-[calc(100vw)] h-[100vh] bg-gray-900 opacity-[0.5] lg:w-0"
      ></div>
      <ul
        ref="sideBar"
        class="flex flex-col z-20 pl-2 -translate-x-52 w-52 top-[3rem] bg-slate-100 -left-16 absolute h-[calc(100vh)] lg:flex-row lg:w-full lg:static lg:justify-around lg:flex-1 lg:h-full lg:items-center lg:bg-inherit gap-1 lg:translate-x-0 transition-transform duration-300"
      >
        <li
          @click="goToHome"
          :class="
            isActive && currentPath === '/' ? activeStyle : notActiveStyle
          "
        >
          Home
        </li>
        <li
          @click="goToFavorite"
          :class="
            isActive && currentPath.match(/Favorite/i)
              ? activeStyle
              : notActiveStyle
          "
        >
          Favorite
        </li>
        <li
          @click="goToBookmark"
          :class="
            isActive && currentPath === '/Bookmark'
              ? activeStyle
              : notActiveStyle
          "
        >
          Bookmark
        </li>
        <li
          @click="goToMyRecipe"
          :class="
            isActive && currentPath === '/MyRecipes'
              ? activeStyle
              : notActiveStyle
          "
        >
          My Recipes
        </li>
        <li
          @click="goCreateRecipe"
          :class="
            isActive && currentPath === '/CreateRecipe'
              ? activeStyle
              : notActiveStyle
          "
        >
          Create Recipes
        </li>
      </ul>
      <CustomButton v-if="!user" @click="handleLogIn" btnName="Log In" />
      <div v-else class="relative cursor-default">
        <div class="flex gap-2">
          <p
            ref="showDRef"
            @click.self="showUserDetail = !showUserDetail"
            class="bg-gray-100 w-[2rem] h-[2rem] rounded-full uppercase font-mono border-[1px] border-black text-2xl hover:cursor-pointer active:scale-105 duration-300 hover:animate-pulse flex items-center justify-center"
          >
            {{ user.username[0] }}
          </p>
        </div>
        <div
          @click.self="showUserDetail = !showUserDetail"
          :class="showUserDetail ? 'scale-100' : 'scale-0'"
          class="absolute top-[3.5rem] right-0 h-32 w-48 bg-gray-100 flex flex-col text-center gap-2 rounded-md transition-all duration-500 drop-shadow-2xl"
        >
          <svg
            @click="showUserDetail = !showUserDetail"
            class="absolute right-1 top-1 group focus:outline-none w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170 hover:cursor-pointer"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="CloseSharpIcon"
            tabindex="-1"
            title="CloseSharp"
          >
            <path
              class="group-hover:fill-black fill-gray-400 transition-all duration-200"
              d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            ></path>
          </svg>

          <h1 class="font-semibold text-xl mt-3">{{ user?.username }}</h1>
          <h1 class="text-gray-500 text-sm">{{ user?.email }}</h1>
          <CustomButton @click="handleLogOut" btnName="Log Out" />
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { onMounted, ref, onUnmounted, watch } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import axios from "../axios/axiosConfig";
import { useStore } from "vuex";
import { useClickOutside } from "../composables/useClickOutside";
import useRefresh from "../composables/useRefresh";
import { privateRoutes } from "../composables/data";
const showUserDetail = ref(false);
const store = useStore();
const router = useRouter();
const route = useRoute();
const isActive = ref(true);
const currentPath = ref(route.path);
const links = ["/", "/Favorite", "/Bookmark", "/CreateRecipe", "/MyRecipes"];

const user = ref(store.state.user);

const showDRef = ref(null);

useClickOutside(showDRef, () => {
  showUserDetail.value = false;
});

const userWatcher = watch(
  () => store.state.user,
  () => {
    user.value = store.state.user;
  }
);

const pathWatcher = watch(
  () => route.path,
  () => {
    currentPath.value = ref(route.path).value;
    isActive.value = links.includes(currentPath.value);
  }
);

const backDrop = ref(null);
const sideBar = ref(null);

const activeStyle =
  "text-xl font-semibold border-r-4  border-r-gray-700 cursor-pointer py-2 px-2 lg:bg-inherit lg:border-b-2 lg:border-b-gray-700 lg:border-r-0";
const notActiveStyle =
  "text-black hover:text-gray-500 cursor-pointer py-2 px-2 lg:bg-inherit lg:border-b-2";

function toggleSideBar() {
  if (backDrop.value.classList.contains("-translate-x-full")) {
    backDrop.value.classList.remove("-translate-x-full");
    sideBar.value.classList.remove("-translate-x-52");
  } else {
    backDrop.value.classList.add("-translate-x-full");
    sideBar.value.classList.add("-translate-x-52");
  }
}
function resizeHandler() {
  if (window.innerWidth >= 1024) {
    if (!backDrop.value.classList.contains("-translate-x-full")) {
      backDrop.value.classList.add("-translate-x-full");
      sideBar.value.classList.add("-translate-x-52");
    }
  }
}
onMounted(() => {
  window.addEventListener("resize", resizeHandler);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeHandler);
});

function goToHome() {
  toggleSideBar();
  router.push("/");
}
function goToFavorite() {
  toggleSideBar();
  router.push("/Favorite");
}
function goToBookmark() {
  toggleSideBar();
  router.push("/Bookmark");
}
function goToMyRecipe() {
  toggleSideBar();
  router.push("/MyRecipes");
}
function goCreateRecipe() {
  toggleSideBar();
  router.push("/CreateRecipe");
}

function handleLogIn() {
  router.push("/Authentication");
}
async function handleLogOut() {
  store.dispatch("SET_USER", null);
  user.value = null;
  showUserDetail.value = !showUserDetail.value;
  if (privateRoutes.includes(route.path)) {
    router.push("/");
  }
  axios.get("/logout").then((res) => {
    // Reset Access Token
    store.dispatch("SET_ACCESS_TOKEN", res.accessToken);
  });
}
</script>
<style></style>
