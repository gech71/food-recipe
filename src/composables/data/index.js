import { ref } from "vue";

export const categorys = [
  { id: "1", name: "Breakfast", quantity: 10 },
  { id: "2", name: "Lunch", quantity: 11 },
  { id: "3", name: "Dinner", quantity: 12 },
  { id: "4", name: "Appetizer", quantity: 13 },
  { id: "5", name: "Dessert", quantity: 14 },
  { id: "6", name: "Holiday", quantity: 15 },
  { id: "7", name: "Vegetarian", quantity: 16 },
];

export const ingredients = ref([]);
export const steps = ref([]);
export const privateRoutes = [
  "/Bookmark",
  "/CreateRecipe",
  "/Favorite",
  "/MyRecipes",
];
