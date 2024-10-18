/* @refresh reload */
import { Router } from "@solidjs/router";
import { render } from "solid-js/web";
import "~/assets/styles/index.css";
import AppContainer from "~/containers/app-container";
import { Provider } from "~/stores/manage";
import Routes from "~/routes/index";

const root = document.getElementById("root");

render(
  () => (
    <Provider>
      <Router root={AppContainer}>
        <Routes />
      </Router>
    </Provider>
  ),
  root!
);
