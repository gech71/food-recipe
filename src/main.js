import App from "./App.vue";
import "./index.css";
import router from "./routes/";
import { store } from "./store/store";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import { createApp, provide, h } from "vue";
import {
  DefaultApolloClient,
  provideApolloClient,
} from "@vue/apollo-composable";
import { setContext } from "@apollo/client/link/context";
import useRefresh from "./composables/useRefresh";
const refresh = useRefresh();
refresh().then((res) => {
  store.dispatch("SET_USER", res.user);
  store.dispatch("SET_ACCESS_TOKEN", res.accessToken);
  const httpLink = createHttpLink({
    uri: "https://f-recipe-app.herokuapp.com/v1/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = store.state.accessToken;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const app = createApp({
    setup() {
      // provide(DefaultApolloClient, apolloClient);
      provideApolloClient(apolloClient);
    },

    render: () => h(App),
  });
  app.use(router);
  app.use(store);
  app.mount("#app");
});
