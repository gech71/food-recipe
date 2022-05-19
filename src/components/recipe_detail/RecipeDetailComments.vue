<template>
  <div data-aos="slide-up">
    <div
      class="w-full md:w-[80%] lg:w-[70%] mx-auto md:px-10 transition-all duration-300"
      data-aos="slide-up"
    >
      <div class="flex w-full justify-center items-center">
        <p
          v-if="store.state.user"
          class="drop-shadow-lg bg-slate-200 px-4 py-2 text-xl rounded-full uppercase font-mono mr-4"
        >
          {{ store.state.user.username.charAt(0) }}
        </p>
        <textarea
          v-model="commentRef"
          type="text"
          class="drop-shadow-lg flex-1 text-sm font-mono px-4 py-2 resize-none bg-slate-200 focus:outline-none focus:bg-slate-50 transition-color duration-500 border-b-2 rounded-md"
          placeholder="Leave Your Comment Here(atleast 3 characters)..."
        />
        <button
          v-if="commentRef.trim().length >= 3"
          @click="handleSendComment"
          class="ml-4 px-4 py-1 bg-slate-200 drop-shadow-lg rounded-md hover:drop-shadow-xl hover:cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>

    <h1
      v-if="reviews.length !== 0"
      class="text-3xl font-semibold flex-1 text-slate-600 mt-5"
    >
      Reviews And Comments
    </h1>

    <div
      data-aos="zoom-in"
      v-for="review in reviews"
      :key="review.id"
      class="flex items-start my-4"
    >
      <div class="flex flex-col w-[90vw] mx-auto">
        <div class="flex flex-col items-start px-4 gap-2">
          <div class="flex gap-2 items-center">
            <p class="bg-slate-300 px-3 py-1 rounded-full uppercase font-mono">
              {{ review.user?.username?.charAt(0) }}
            </p>
            <div class="flex flex-col">
              <p>{{ review.user?.username }}</p>
              <!--  -->

              <div v-if="review.rating" class="flex items-center">
                <p class="flex">
                  <svg
                    v-for="rate in review.rating"
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

                <p v-if="review.rating < 5" class="flex">
                  <svg
                    v-for="rate in 5 - review.rating"
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
              <!--  -->
            </div>
          </div>
          <p class="pb-3 indent-6">
            {{ review.comment }}
          </p>
        </div>
        <hr class="w-[85%] mx-auto h-[2px] bg-gray-300" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMutation } from "@vue/apollo-composable";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ADD_COMMENT } from "../../composables/mutations";
const props = defineProps({
  data: Object,
  refresh: Function,
  refresh_comment: Function,
});

const reviews = ref([]);

watchEffect(() => {
  reviews.value = [...props.data];
});

const commentRef = ref("");
const route = useRoute();

const store = useStore();
const router = useRouter();

const { mutate: addComment } = useMutation(ADD_COMMENT);

const handleSendComment = () => {
  if (store.state.user) {
    addComment({
      comment: commentRef.value,
      uid: store.state.user.id,
      rid: route.query.id,
    })
      .then((res) => {
        props.refresh();
        props.refresh_comment();
      })
      .catch((error) => {});
  } else {
    const message = confirm(
      "TO Give Comment On A Recipe You Must Log In First. Want To Log In?"
    );
    if (message) {
      router.push("/Authentication");
    }
  }
};
</script>
