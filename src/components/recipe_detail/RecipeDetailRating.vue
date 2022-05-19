<template>
  <div
    class="flex items-center justify-start gap-6 bg-slate-200 w-full h-fit py-3 rounded-xl"
  >
    <p class="text-xl font-bold text-slate-600">
      Total Recipe Rating ({{
        Number.isInteger(totalRating) ? totalRating : totalRating.toFixed(1)
      }})
    </p>
    <div class="flex items-center">
      <p class="flex">
        <svg
          v-for="rate in Math.ceil(totalRating)"
          :key="rate"
          class="focus:outline-none w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="GradeIcon"
          tabindex="-1"
          title="Grade"
        >
          <path
            style="fill: #ff9900; stroke-width: 1; stroke: #ff9900"
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          ></path>
        </svg>
      </p>

      <p v-if="Math.ceil(totalRating) < 5" class="flex">
        <svg
          v-for="rate in 5 - Math.ceil(totalRating)"
          :key="rate"
          class="focus:outline-none w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="GradeIcon"
          tabindex="-1"
          title="Grade"
        >
          <path
            style="fill: none; stroke-width: 1; stroke: #ff9900"
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          ></path>
        </svg>
      </p>
    </div>
  </div>
  <hr class="w-[75%] mx-auto h-[2px] bg-gray-300" />

  <div
    v-if="!userRate || !store.state.user"
    class="bg-slate-200 rounded-xl h-full py-2"
  >
    <div class="grid grid-cols-1 gap-4">
      <div class="flex gap-4">
        <h1 class="text-xl font-bold text-slate-600 text-center">
          Rate This Recipe
        </h1>

        <p class="flex flex-1 justify-around items-center">
          <svg
            v-for="(filled, index) in ratingVal"
            :key="index"
            @click="handleRatingClick(index)"
            class="focus:outline-none w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="GradeIcon"
            tabindex="-1"
            title="Grade"
          >
            <path
              :style="
                filled
                  ? 'fill: #ff9900; stroke-width: 1; stroke: #ff9900'
                  : 'fill: none; stroke-width: 1; stroke: #ff9900'
              "
              d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            ></path>
          </svg>
        </p>

        <CustomButton btnName="Post" v-if="btnShow" @click="postRate" />
      </div>
    </div>
  </div>
  <!-- User Already Rated It -->
  <div v-else class="bg-slate-200 rounded-xl h-full">
    <div class="flex gap-5 items-center py-2">
      <h1 class="text-xl font-bold text-slate-600">Your Rating</h1>
      <div class="flex items-centers flex-1">
        <p
          class="bg-slate-200 drop-shadow-lg w-[2rem] h-[2rem] flex items-center justify-center rounded-full uppercase font-mono"
        >
          {{ store.state.user?.username.charAt(0) }}
        </p>
        <div class="flex items-start flex-col ml-4">
          <p class="lowercase">
            {{ store.state.user?.username.split(" ")[0] }}
          </p>
          <div class="flex items-center">
            <p class="flex">
              <svg
                v-for="rate in userRate"
                :key="rate"
                class="focus:outline-none w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="GradeIcon"
                tabindex="-1"
                title="Grade"
              >
                <path
                  style="fill: #ff9900; stroke-width: 1; stroke: #ff9900"
                  d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                ></path>
              </svg>
            </p>

            <p v-if="userRate < 5" class="flex">
              <svg
                v-for="rate in 5 - userRate"
                :key="rate"
                class="focus:outline-none w-5 h-5 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="GradeIcon"
                tabindex="-1"
                title="Grade"
              >
                <path
                  style="fill: none; stroke-width: 1; stroke: #ff9900"
                  d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                ></path>
              </svg>
            </p>
            <p class="text-3xl font-bold text-slate-600"></p>
          </div>
        </div>
      </div>
      <button
        @click="handleEditButton"
        class="underline text-gray-400 hover:text-gray-700"
      >
        Edit Your Rating
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { GIVE_RECIPE_A_RATE } from "../../composables/mutations/";
import { useMutation } from "@vue/apollo-composable";
const route = useRoute();
const router = useRouter();

const store = useStore();

const props = defineProps({
  data: Object,
  refresh: Function,
  comment_refresher: Function,
});

const totalRating = ref(0);
const userRate = ref(0);

watchEffect(() => {
  totalRating.value = props.data[0]?.rating_count ?? 0;
  userRate.value = props.data[0]?.my_review[0]?.rating ?? 0;
});

// User Rating Logic
const ratingVal = ref([false, false, false, false, false]);
const btnShow = ref(false);

const handleEditButton = () => {
  userRate.value = 0;
  ratingVal.value.forEach((bool, index) => {
    ratingVal.value[index] = false;
  });
};

const handleRatingClick = (index) => {
  for (let i = 0; i <= index; i++) {
    ratingVal.value[i] = true;
  }
  if (index + 1 < 5) {
    for (let j = index + 1; j < 5; j++) {
      ratingVal.value[j] = false;
    }
  }

  btnShow.value = ratingVal.value.filter((rating) => rating).length
    ? true
    : false;
};

const postRate = () => {
  if (store.state.user) {
    const number_rate = ratingVal.value.filter((rating) => rating).length;
    if (!number_rate) return;
    userRate.value = number_rate;
    const { mutate: giveRecipeRate, likeMutationError } = useMutation(
      GIVE_RECIPE_A_RATE,
      {
        variables: {
          recipeid: route.query.id,
          userid: store.state.user?.id ?? null,
          user_rate_value: userRate.value,
        },
      }
    );

    giveRecipeRate().then((res) => {
      props.refresh();
      props.comment_refresher();
    });
  } else {
    const message = confirm(
      "In Order To Rate A Recipe You First Need To Log In. Want To Log In?"
    );

    if (message) {
      router.push("/Authentication");
    } else {
      userRate.value = 0;
      ratingVal.value.forEach((bool, index) => {
        ratingVal.value[index] = false;
        btnShow.value = false;
      });
    }
  }
};
</script>
