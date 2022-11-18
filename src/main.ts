import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores";

import "tdesign-vue-next/es/style/index.css";
import "./style.css";

createApp(App).use(store).use(router).mount("#app");
