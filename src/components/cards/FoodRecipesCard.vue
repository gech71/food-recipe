<template>
  <div data-aos="slide-up" class="group">
    <div
      class="group flex relative hover:drop-shadow-2xl transition-all duration-300 ease-out overflow-x-hidden cursor-default"
    >
      <img
        class="rounded-l-md w-32 min-h-[8rem] object-cover transition-all duration-200"
        :src="foodProperty.image"
        alt=""
      />
      <div
        class="w-full bg-white flex flex-col px-2 py-1 justify-between rounded-r-md gap-1"
      > 
        <div class="flex w-full">
          <div class="flex flex-col flex-1 truncate w-32">
            <h1 class="text-sm font-bold flex-1">
              {{ foodProperty.title }}
            </h1>
            <h1 class="text-[10px] pl-1 text-gray-400">
              {{ foodProperty.createdby }}
            </h1>
          </div>
          <p class="text-xs pl-2">{{ foodProperty.duration }}</p>
        </div>

        <h1 class="text-[0.75rem] font-semibold text-gray-400 flex-1 indent-2 break-all">
          {{
            foodProperty.description.length > 105
              ? foodProperty.description.substring(0, 105) + "..."
              : foodProperty.description
          }}
        </h1>

        <div class="flex gap-1 justify-between">
          <span class="flex items-center rounded-full gap-2">
            <svg
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
            <p class="text-sm">
              {{
                Number.isInteger(foodProperty.rating_count ?? 0)
                  ? foodProperty.rating_count
                  : foodProperty.rating_count.toFixed(1)
              }}
            </p>
          </span>
          <span class="flex items-center rounded-full gap-2">
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
                  false
                    ? 'fill: #ff9900; stroke-width: 1; stroke: #ff9900'
                    : 'fill: none; stroke-width: 1; stroke: #696969'
                "
                d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"
              ></path>
            </svg>

            <p class="text-sm">{{ foodProperty.like_count }}</p>
          </span>

          <span class="flex items-center rounded-full gap-2">
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

            <p class="text-sm">{{ foodProperty.comment_count }}</p>
          </span>
        </div>
      </div>

      <div
        class="absolute w-6/12 h-full bg-slate-200 flex items-center justify-center right-0 translate-x-96 duration-300 ease-out group-hover:translate-x-0 rounded-l-sm bg-opacity-95"
      >
        <CustomButton
          @click="showDetailPage(foodProperty.id)"
          btnName="Show Detail"
        />
        <h1
          v-if="route.path === '/MyRecipes'"
          class="absolute bottom-1 text-sm hover:underline hover:text-red-900 hover:cursor-pointer"
        >
          Delete
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
defineProps({
  foodProperty: Object,
});

const showDetailPage = (id) => {
  // router.push({ name: "Details", params: { id } });
  router.push(`/Details?id=${id}`);
};
</script>
