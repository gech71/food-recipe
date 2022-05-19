import { gql } from "graphql-tag";
export const CREATE_RECIPE = gql`
  mutation (
    $category: String!
    $title: String!
    $featuredImage: String!
    $images: String!
    $dutation: String!
    $ingredients: String!
    $directions: String!
    $description: String!
    $userid: uuid!
    $owner: String!
  ) {
    add_recipe(
      args: {
        recipe_category: $category
        recipe_title: $title
        recipe_image: $featuredImage
        recipe_images: $images
        recipe_duration: $dutation
        recipe_ingredients: $ingredients
        recipe_steps: $directions
        recipe_description: $description
        recipe_userid: $userid
        recipe_owner: $owner
      }
    ) {
      id
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation ($recipeid: uuid!, $userid: uuid) {
    like_dislike_recipe(args: { recipe_id: $recipeid, user_id: $userid }) {
      isliked
    }
  }
`;

export const TOGGLE_BOOKMARK = gql`
  mutation ($recipeid: uuid!, $userid: uuid) {
    toggle_bookmark(args: { recipe_id: $recipeid, user_id: $userid }) {
      recipeid
    }
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation ($recipeid: uuid!, $userid: uuid) {
    toggle_favorite(args: { recipe_id: $recipeid, user_id: $userid }) {
      recipeid
    }
  }
`;

export const GIVE_RECIPE_A_RATE = gql`
  mutation ($recipeid: uuid!, $userid: uuid, $user_rate_value: Int!) {
    give_rate_for_recipe(
      args: {
        recipe_id: $recipeid
        user_id: $userid
        user_rate_value: $user_rate_value
      }
    ) {
      rating
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation ($comment: String, $uid: uuid, $rid: uuid) {
    add_comment(
      args: { recipe_id: $rid, user_comment: $comment, user_id: $uid }
    ) {
      recipeid
    }
  }
`;

export const DELETE_MY_RECIPE = gql`
  mutation ($recipeid: uuid) {
    delete_my_recipe(args: { recipe_id: $recipeid }) {
      id
    }
  }
`;
