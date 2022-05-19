import { ingredients, steps } from "../data";

export const logInValidationSchema = {
  email(value) {
    if (!value) return "Email Is Required";
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim()))
      return "Invalid Email Address";
    return true;
  },

  password(value) {
    if (!value) return "Password Is required";
    else if (value.trim().length < 6) return "Enter at least 6+ chars";
    return true;
  },
};

export const createRecipeValidationSchema = {
  r_name(value) {
    if (!value) return "Recipe name required";
    if (value.length < 3) return "Recipe name must be 3+ chars";

    return true;
  },
  r_images(value) {
    if (!value) return "Image required";
    return true;
  },
  r_time(value) {
    if (!value) return "Time is required";
    if (value < 0) return "Time Cant be Negative";
    return true;
  },
  r_ingredients(value) {
    if (!value && ingredients.value.length > 0) return true;
    if (!value) return "Ingredient is required";
    if (value.length <= 10) return "Ingredient is too short";
    return true;
  },
  r_steps(value) {
    if (!value && steps.value.length > 0) return true;
    if (!value) return "Step is required";
    if (value.length <= 10) return "Step is too short";
    return true;
  },
  r_description(value) {
    if (!value) return "Description is required";
    if (value.trim().length <= 80)
      return `Description is too short add (${81 - value.length}) characters`;
    return true;
  },
};
