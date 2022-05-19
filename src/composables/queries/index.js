import { gql } from "graphql-tag";
export const GET_FILTERED_RECIPES = gql`
  query ($category_name: String, $search_by: String, $search_value: String) {
    get_filtered_recipes(
      args: {
        category_name: $category_name
        search_by: $search_by
        search_value: $search_value
      }
    ) {
      title
      comment_count
      rating_count
      like_count
      id
      duration
      description
      createdby
      image
      my_review(args: { user_id: null }) {
        isliked
      }
    }
  }
`;
// export const GET_RECIPE_VARS = gql`
//   is_favorited(args: { user_id: $userid })
//   is_bookmarked(args: { user_id: $userid })
//   like_count
//   comment_count
//   my_review(args: { user_id: $userid }) {
//     isliked
//   }
// `;

// export const GET_RECIPE_VARS2 = gql`
// get_recipe_by_id(args: { recipe_id: $recipeid }) {
//   reviews {
//   rating
//   comment
//   user {
//     username
//     }
//   }
//   rating_count
//   my_review(args: { user_id: $userid }) {
//     rating
//   }
// }
// `;
export const GET_RECIPE_DETAIL = gql`
  query ($recipeid: uuid!) {
    get_recipe_by_id(args: { recipe_id: $recipeid }) {
      image
      images {
        images
      }
      title
      createdby

      description
      duration

      get_ingredients {
        ingredients
      }
      get_directions {
        steps
      }
    }
  }
`;

export const GET_RECIPE_VARS = gql`
  query ($recipeid: uuid!, $userid: uuid) {
    get_recipe_by_id(args: { recipe_id: $recipeid }) {
      is_favorited(args: { user_id: $userid })
      is_bookmarked(args: { user_id: $userid })
      like_count
      comment_count
      my_review(args: { user_id: $userid }) {
        isliked
      }
    }
  }
`;

export const GET_COMMENTS_AND_REVIEWS = gql`
  query ($recipeid: uuid) {
    get_review(args: { recipe_id: $recipeid }) {
      id
      rating
      comment
      user {
        username
      }
    }
  }
`;

export const RATING_VAR = gql`
  query ($recipeid: uuid!, $userid: uuid) {
    get_recipe_by_id(args: { recipe_id: $recipeid }) {
      rating_count
      my_review(args: { user_id: $userid }) {
        rating
      }
    }
  }
`;

export const GET_BOOKMARKS = gql`
  query ($userId: uuid) {
    get_bookmarks_by_id(args: { user_id: $userId }) {
      title
      image
      id
    }
  }
`;

export const GET_FAVORITES = gql`
  query ($userId: uuid) {
    get_favorites_by_id(args: { user_id: $userId }) {
      title
      image
      id
    }
  }
`;

export const GET_MY_RECIPES = gql`
  query ($userid: uuid) {
    get_my_recipes(args: { user_id: $userid }) {
      image
      title
      id
    }
  }
`;
