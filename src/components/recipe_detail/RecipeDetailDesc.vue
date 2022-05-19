<template>
  <div
    data-aos="zoom-in-up"
    class="relative bg-slate-200 drop-shadow-lg rounded-lg flex flex-col justify-between p-2"
  >
    <div class="flex items-baseline">
      <h1 class="text-3xl font-semibold flex-1 text-slate-600">{{ title }}</h1>
      <h1 class="text-center lowercase pl-4 text-sm">by {{ createdby }}</h1>
      <div class="absolute -top-6 right-3">
        <div class="flex">
          <button
            @click="favoriteUnFavoriteRecipe"
            class="text-sm px-3 py-2 rounded-full bg-slate-200 mr-2 drop-shadow-md hover:scale-x-105 duration-300 hover:drop-shadow-2xl text-red-600"
          >
            <svg
              class="focus:outline-none w-6 h-6 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="FavoriteIcon"
              tabindex="-1"
              title="Favorite"
            >
              <path
                :style="
                  isFavorited
                    ? 'fill: #FF4949; stroke-width: 2; stroke: #FF4949 '
                    : 'fill: none; stroke-width: 2; stroke: #000000'
                "
                d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              ></path>
            </svg>
          </button>
          <button
            @click="bookmarkUnbookmarkRecipe"
            class="text-sm px-3 py-2 rounded-full bg-slate-200 mr-2 drop-shadow-md hover:scale-x-105 duration-300 hover:drop-shadow-2xl"
          >
            <!-- Add To Fav -->
            <svg
              class="w-6 h-6 focus:outline-none MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="BookmarkIcon"
              tabindex="-1"
              title="Bookmark"
            >
              <path
                :style="
                  isBookmarked
                    ? 'fill: #FF8D29; stroke-width: 2; stroke: #FF8D29 '
                    : 'fill: none; stroke-width: 2; stroke: #000000'
                "
                d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="px-4">
      <h2 class="text-xl font-semibold text-slate-500">description</h2>
      <p class="text-sm indent-4 my-2">
        {{ description }}
      </p>
    </div>

    <h1 class="py-1 px-4 flex gap-3">
      <svg
        class="w-6 h-6 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="AccessTimeIcon"
        tabindex="-1"
        title="AccessTime"
      >
        <path
          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        ></path>
        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
      </svg>
      <p>{{ duration }}</p>
    </h1>

    <div>
      <div class="flex justify-between p-2 bg-slate-200 drop-shadow-sm">
        <div
          @click="likeDislikeRecipe"
          class="hover:cursor-pointer flex flex-col items-center"
        >
          <svg
            class="focus:outline-none w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ThumbUpAltIcon"
            tabindex="-1"
            title="ThumbUpAlt"
          >
            <path
              :style="
                isUserLikedIt
                  ? 'fill: #2155CD; stroke-width: 1; stroke: #2155CD'
                  : 'fill: none; stroke-width: 1; stroke: #696969'
              "
              d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"
            ></path>
          </svg>
          <h1 class="text-xs">
            {{ likeCount }} {{ likeCount > 1 ? "likes" : "like" }}
          </h1>
        </div>
        <div class="hover:cursor-default flex flex-col items-center">
          <svg
            class="w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ChatBubbleIcon"
            tabindex="-1"
            title="ChatBubble"
          >
            <path
              style="fill: none; stroke-width: 1; stroke: #696969"
              d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
            ></path>
          </svg>
          <h1 class="text-xs">
            {{ commentCount }} {{ commentCount > 1 ? "comments" : "comment" }}
          </h1>
        </div>
        <div class="hover:cursor-default nter flex flex-col items-center">
          <svg
            class="w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ShoppingBasketIcon"
            tabindex="-1"
            title="ShoppingBasket"
          >
            <path
              style="fill: none; stroke-width: 1; stroke: #696969"
              d="m17.21 9-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
            ></path>
          </svg>

          <h1 class="text-xs">
            {{ ingredientCount }}
            {{ ingredientCount > 1 ? "ingredients" : "ingredient" }}
          </h1>
        </div>
        <div class="hover:cursor-default flex flex-col items-center">
          <svg
            class="w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="FactCheckIcon"
          >
            <path
              style="fill: none; stroke-width: 1; stroke: #696969"
              fill-rule="evenodd"
              d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM10 17H5v-2h5v2zm0-4H5v-2h5v2zm0-4H5V7h5v2zm4.82 6L12 12.16l1.41-1.41 1.41 1.42L17.99 9l1.42 1.42L14.82 15z"
            ></path>
          </svg>

          <h1 class="text-xs">
            {{ stepsCount }} {{ stepsCount > 1 ? "setps" : "step" }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useMutation } from "@vue/apollo-composable";
import {
  TOGGLE_BOOKMARK,
  TOGGLE_FAVORITE,
  TOGGLE_LIKE,
} from "../../composables/mutations";
import { watchEffect } from "@vue/runtime-core";
// import router from "../../routes";

const router = useRouter();

const route = useRoute();
const store = useStore();

const props = defineProps({
  title: String,
  createdby: String,
  description: String,
  duration: String,
  ingredientCount: Number,
  stepsCount: Number,
  data: Object,
  refresh: Function,
});

const commentCount = ref(0);
const likeCount = ref(0);
const isFavorited = ref(false);
const isBookmarked = ref(false);
const isUserLikedIt = ref(false);

watchEffect(() => {
  if (props.data) {
    commentCount.value = props.data[0]?.comment_count;
    isBookmarked.value = props.data[0]?.is_bookmarked;
    isFavorited.value = props.data[0]?.is_favorited;
    likeCount.value = props.data[0]?.like_count;
    isUserLikedIt.value = props.data[0]?.my_review[0]?.isliked ?? false;
  }
});

const { mutate: toggleLike, likeMutationError } = useMutation(TOGGLE_LIKE, {
  variables: {
    recipeid: route.query.id,
    userid: store.state.user?.id ?? null,
  },
});
const { mutate: toggleBookmark, bookmarkMutationError } = useMutation(
  TOGGLE_BOOKMARK,
  {
    variables: {
      recipeid: route.query.id,
      userid: store.state.user?.id ?? null,
    },
  }
);
const { mutate: toggleFavorite, favoriteMutationError } = useMutation(
  TOGGLE_FAVORITE,
  {
    variables: {
      recipeid: route.query.id,
      userid: store.state.user?.id ?? null,
    },
  }
);

const likeDislikeRecipe = () => {
  if (store.state.user) {
    toggleLike()
      .then((res) => {
        props.refresh();
      })
      .catch((err) => {});
  } else {
    const msg = confirm("You Need To Log In First. Want To Log In?");
    if (msg) router.push("/Authentication");
  }
};
const bookmarkUnbookmarkRecipe = () => {
  if (store.state.user) {
    toggleBookmark().then((res) => {
      props.refresh();
    });
  } else {
    const msg = confirm("You Need To Log In First. Want To Log In?");
    if (msg) router.push("/Authentication");
  }
};
const favoriteUnFavoriteRecipe = () => {
  if (store.state.user) {
    toggleFavorite().then((res) => {
      props.refresh();
    });
  } else {
    const msg = confirm("You Need To Log In First. Want To Log In?");
    if (msg) router.push("/Authentication");
  }
};
</script>
