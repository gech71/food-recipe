import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
const routes = setupLayouts(generatedRoutes);
import { store } from "../store/store";

import path from "path";
import { privateRoutes } from "../composables/data/";

// import routes from "~pages";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (store.state.user == null && privateRoutes.includes(to.path.toString().toLocaleLowerCase())) {
    next("/Authentication");
  } else next();
});


export default router;
