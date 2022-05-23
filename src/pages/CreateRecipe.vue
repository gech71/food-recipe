<template>
  <div class="bg-slate-200 min-h-screen relative">
    <div
      v-if="showSelectImage"
      class="z-40 w-full h-[calc(100vh-4rem)] fixed flex transition-all duration-500 ease-in-out bg-gray-500 opacity-25"
    ></div>
    <div
      :class="showSelectImage ? 'scale-100' : 'scale-0'"
      class="m-6 z-50 lg:w-[50%] md:w-[70%] w-[80%] h-[50%] bg-white mx-auto overflow-auto fixed lg:right-[calc(25%)] md:right-[calc(15%)] right-[calc(10%)] top-[calc(25%)] rounded-md transition-all duration-500 ease-in-out shadow-xl drop-shadow-xl"
    >
      <div class="flex items-center sticky top-0 z-40">
        <h1
          class="z-20 w-full text-xl font-semibold sticky top-0 bg-white drop-shadow-sm p-2"
        >
        
          {{
            selectedImages.length == 1
              ? "Featured Image Preview"
              : "Please Select Featured Image"
          }}
        </h1>

        <svg
          @click="showSelectImage = !showSelectImage"
          class="group focus:outline-none w-8 h-8 mr-3 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170 hover:cursor-pointer"
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
      </div>
      <div
        ref="imgPreview"
        class="z-10 text-white flex flex-wrap gap-5 p-5 justify-center"
      >
        <div
          v-for="(item, index) in selectedImages"
          :key="item.id"
          class="flex flex-wrap relative"
        >
          <img
            :class="
              featuredImage == index
                ? 'scale-95  p-2 bg-gray-500 rounded-md'
                : 'scale-100  '
            "
            @click="featuredImage = index"
            :src="item"
            class="w-36 h-36 object-cover transition-all duration-200 bg-gray-400"
            alt=""
          />

          <input
            v-if="selectedImages.length > 1 && featuredImage == index"
            v-model="featuredImage"
            :value="index"
            type="radio"
            name="img"
            class="absolute right-2 top-2 form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
        </div>
      </div>
    </div>

    <img
      data-aos="slide-right"
      src="../assets/mask-5876394.svg"
      alt=""
      class="h-60 w-full object-top"
    />
    <h1
      class="w-full text-center font-mono text-4xl text-gray-700 py-6"
      data-aos="zoom-in"
    >
      Create Recipe
    </h1>

    <form @submit.prevent="submit" class="w-[80%] mx-auto pt-3">
      <div class="flex flex-col gap-2 w-full">
        <!-- 1 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-2">
          <div data-aos="zoom-in">
            <h1 class="text-gray-700 text-xl font-semibold p-2">
              Select category
            </h1>
            <div
              class="w-full mx-auto flex items-center rounded-lg overflow-hidden"
            >
              <div
                class="px-3 h-[2.6rem] bg-slate-50 text-gray-400 flex items-center"
              >
                <h1 class="">Select Category</h1>
              </div>
              <div class="flex-grow">
                <select
                  name="r_category"
                  v-model="catValue"
                  class="px-3 h-[2.6rem] text-base font-normal text-gray-700 focus:outline-none w-full bg-slate-50"
                >
                  <option
                    v-for="category in categorys"
                    :key="category"
                    :value="category.name"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <!-- Recipe Name -->
          <div class="relative" data-aos="zoom-in">
            <h1 class="text-gray-700 text-xl font-semibold p-2">Recipe Name</h1>
            <CustomInputField
              name="r_name"
              placeholder="Recipe name"
              type="text"
            />
          </div>
        </div>

        <!-- 2 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div class="w-full relative" data-aos="zoom-in">
            <label
              class="form-label inline-block text-gray-700 text-xl font-semibold p-2"
              >Choose Recipe Image</label
            >
            <CustomInputField name="r_images" type="file" />
          </div>
          <div class="relative" data-aos="zoom-in">
            <label
              class="form-label inline-block text-gray-700 text-xl font-semibold p-2"
              >Time</label
            >
            <div class="flex gap-3">
              <CustomInputField
                name="r_time"
                type="number"
                placeholder="Time"
              />

              <select
                v-model="selectedTimeOption"
                class="w-fit h-fit focus:outline-none p-2 rounded-xl bg-slate-50"
              >
                <option value="sec">sec</option>
                <option value="min">min</option>
                <option value="hr">hr</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 3 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div>
            <div class="flex flex-col relative" data-aos="zoom-in">
              <div class="relative">
                <label
                  class="form-label inline-block text-gray-700 text-xl font-semibold p-2"
                  >Add Ingredients
                </label>
                <div class="flex gap-2">
                  <CustomInputField
                    name="r_ingredients"
                    type="text"
                    placeholder="Ingredients . . ."
                  />
                  <img
                    @click="addIngredient"
                    src="../svgs/add.svg"
                    class="w-fit h-fit p-[0.55rem] bg-slate-50 rounded-xl hover:cursor-pointer hover:bg-slate-100"
                  />
                </div>
              </div>
              <div class="flex flex-col gap-2 px-6 w-full">
                <h1 v-for="ingredient in ingredients" :key="ingredient.id">
                  <div class="bg-slate-300 gap-2 rounded-xl px-2">
                    <div class="flex">
                      <p class="flex-1">{{ ingredient }}</p>

                      <img
                        @click="removeIngredient(ingredient)"
                        class="rounded-full ml-3 hover:cursor-pointer"
                        src="../svgs/delete.svg"
                        alt=""
                        srcset=""
                      />
                    </div>
                  </div>
                </h1>
              </div>
            </div>
          </div>
          <div class="">
            <div class="flex flex-col relative" data-aos="zoom-in">
              <div class="relative">
                <label
                  class="form-label inline-block text-gray-700 text-xl font-semibold p-2"
                  >Add Steps
                </label>
                <div class="flex gap-2">
                  <CustomInputField
                    name="r_steps"
                    type="text"
                    placeholder="Directions . . ."
                  />
                  <img
                    @click="addStep"
                    src="../svgs/add.svg"
                    class="w-fit h-fit p-[0.55rem] bg-slate-50 rounded-xl hover:cursor-pointer hover:bg-slate-100"
                  />
                </div>
              </div>
              <div class="flex flex-col gap-2 px-6 w-full">
                <h1 v-for="step in steps" :key="step.id">
                  <div class="bg-slate-300 gap-2 rounded-xl px-2">
                    <div class="flex">
                      <p class="flex-1">{{ step }}</p>

                      <img
                        @click="removeStep(step)"
                        class="rounded-full ml-3 hover:cursor-pointer"
                        src="../svgs/delete.svg"
                        alt=""
                        srcset=""
                      />
                    </div>
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <!-- 5 -->
        <div>
          <div data-aos="zoom-in">
            <label
              class="form-label inline-block text-gray-700 pb-2 text-xl font-semibold p-2"
              >Description
            </label>
            <div class="relative">
              <textarea
                ref="descRef"
                name="r_description"
                type="text"
                class="border-[1px] focus:border-gray-600 font-mono resize-none focus:outline-none bg-slate-50 rounded-md w-full h-24 p-2 mb-3 border-gray-400"
                placeholder="Description . . ."
                v-model="descValue"
              />
              <ErrorIndicator class="z-10" :msg="descError[0]" />
            </div>
          </div>
        </div>

        <div
          v-if="uploading"
          class="w-fit h-fit mx-auto mb-5 flex gap-1 items-center"
        >
          <Loading />
          <p>
            Uploading Images {{ currentUploading }} of {{ totalUploadings }}
          </p>
        </div>

        <CustomButton v-else class="mb-5" btnName="Create Recipe" />
      </div>
    </form>
  </div>
</template>
<route lang="yaml">
meta:
  layout: app_bar
</route>

<script setup>
import { ref } from "@vue/reactivity";
import {
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  onUpdated,
  watchEffect,
} from "@vue/runtime-core";
import { useForm, useField } from "vee-validate";
import { createRecipeValidationSchema } from "../composables/validationSchema";
import { categorys, ingredients, steps } from "../composables/data";
import useGenerateImageLink from "../composables/useGenerateImageLink.js";
import { useStore } from "vuex";
import { useMutation } from "@vue/apollo-composable";
import { CREATE_RECIPE } from "../composables/mutations/";
// import { apolloClient } from "../main";

const store = useStore();
const isLoading = ref(false);
let currentUploading = ref(1);
let totalUploadings = ref(0);
let uploading = ref(false);
const descRef = ref(null);
const selectedImages = ref([]);
const selectedImageNames = ref([]);
const selectedTimeOption = ref("sec");
const showSelectImage = ref(false);
const featuredImage = ref(0);

function addIngredient() {
  if (!ingValue.value || ingErrors.value[0]) return;
  ingredients.value.push(ingValue.value);
  ingValue.value = "";
}

function removeIngredient(e) {
  ingredients.value = ingredients.value.filter((ing) => ing !== e);
}
function addStep() {
  if (!stepValue.value || stepErrors.value[0]) return;
  steps.value.push(stepValue.value);
  stepValue.value = "";
}

function removeStep(e) {
  steps.value = steps.value.filter((s) => s !== e);
}

const { handleSubmit, resetForm } = useForm({
  validationSchema: createRecipeValidationSchema,
});
const { value: catValue } = useField("r_category");
catValue.value = categorys[0].name;
const { value: ingValue, errors: ingErrors } = useField("r_ingredients");
const { value: stepValue, errors: stepErrors } = useField("r_steps");
const { value: descValue, errors: descError } = useField("r_description");

onUpdated(() => {
  if (
    descError.value.length &&
    !descRef.value.classList.contains("border-red-600")
  ) {
    descRef.value.classList.add("border-red-600");
    descRef.value.classList.remove("focus:border-gray-400");
  } else if (!descError.value.length) {
    descRef.value.classList.remove("border-red-600");
    descRef.value.classList.add("focus:border-gray-400");
  }
});

const { mutate: uploadRecipe, error } = useMutation(CREATE_RECIPE);

const submit = handleSubmit(
  async (value) => {
    // Validation Successful
    const r_category = value.r_category;
    const r_name = value.r_name;
    let r_featuredImageLink = "";
    const r_imagesLink = [];
    const r_duration = value.r_time + ` ${selectedTimeOption.value}`;
    const r_ingredients = [];

    ingredients.value.forEach((ingredient) => {
      r_ingredients.push(ingredient);
    });

    if (value.r_ingredients) {
      r_ingredients.push(value.r_ingredients);
    }

    const r_steps = [];

    steps.value.forEach((step) => {
      r_steps.push(step);
    });
    if (value.r_steps) {
      r_steps.push(value.r_steps);
    }

    const r_description = descValue.value;

    currentUploading.value = 1;
    totalUploadings.value = selectedImageNames.value.length;
    uploading.value = true;
    for (let index = 0; index < selectedImageNames.value.length; index++) {
      currentUploading.value = index + 1;
      const imgLink = await useGenerateImageLink(
        selectedImageNames.value[index],
        selectedImages.value[index]
      );
      if (index === featuredImage.value) {
        r_featuredImageLink += imgLink;
      } else {
        r_imagesLink.push(imgLink);
      }
    }

    uploading.value = false;

    watchEffect(() => {});
    uploadRecipe({
      category: r_category,
      title: r_name,
      featuredImage: r_featuredImageLink,
      images: r_imagesLink.join("@img@"),
      dutation: r_duration,
      ingredients: r_ingredients.join("@ing@"),
      directions: r_steps.join("@step@"),
      description: r_description,
      userid: store.state.user.id,
      owner: store.state.user.username,
    }).then((res) => {
      ingredients.value = [];
      steps.value = [];
      resetForm();
    });
  },
  (err) => {}
);

function previewImages() {
  if (this.files) {
    const files = [...this.files];
    selectedImages.value = [];
    selectedImageNames.value = [];
    featuredImage.value = 0;
    files.forEach((file) => {
      selectedImageNames.value.push(file.name);
      readAndPreview(file);
    });
    showSelectImage.value = true;
  }

  function readAndPreview(file, index) {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      selectedImages.value.push(this.result);
    });

    reader.readAsDataURL(file);
  }
}

onMounted(() => {
  document
    .querySelector("#multi-file-input")
    .addEventListener("change", previewImages);
  // provideApolloClient(apolloClient);
});

onBeforeUnmount(() => {
  document
    .querySelector("#multi-file-input")
    ?.removeEventListener("change", previewImages);
  ingredients.value = [];
  steps.value = [];
});
</script>
<style></style>
