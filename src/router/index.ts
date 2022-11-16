import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style/
import { useAuthStore } from "../stores/auth";
import Auth from "../views/auth/Index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/auth",
    redirect: "/auth/login",
    component: () => import("../views/auth/Index.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("../views/auth/Login.vue"),
        beforeEnter: (to, from) => {
          const { token } = useAuthStore();
          if (token) return false;
        },
      },
    ],
  },
  {
    path: "/",
    name: "Dash",
    component: () => import("../views/dash/index.vue"),
  },
  {
    path: "/:w+",
    name: "404Page",
    redirect: "/error/404",
  },
];

NProgress.configure({ showSpinner: true });
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      el: "#app",
      top: 0,
      behavior: "smooth",
    };
  },
});

const loginPath = "/auth/login";
router.beforeEach((to) => {
  NProgress.start();
  const authStore = useAuthStore();
  const { token } = authStore;
  if (!token && to.path !== loginPath) {
    return loginPath;
  } else if (token && to.path == loginPath) {
    authStore.reset();
  }

  NProgress.done();
});

export default router;
