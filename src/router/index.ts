import {
  RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style/
import { useAuthStore } from "../stores/auth";
import { fetchMeta } from "../apis/auth";
import { Menu } from "../models/menu.model";

const routes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    name: "-",
    redirect: "/error/404",
  },
  {
    path: "/auth",
    redirect: "/auth/login",
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

  // Auth
  {
    path: "/system/auth/roles",
    name: "RoleIndex",
    component: () => import("../views/system/Role.vue"),
  },

  {
    path: "/error/404",
    name: "PageNotFound",
    component: () => import("../views/error/NotFound.vue"),
  },
];

NProgress.configure({ showSpinner: false });
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
router.beforeEach(async (to) => {
  NProgress.start();
  const authStore = useAuthStore();
  const { token } = authStore;
  if (!token && to.path !== loginPath) {
    return loginPath + "?redirct=" + to.path;
  } else if (token && to.path == loginPath) {
    authStore.reset();
  }

  if (token && authStore.permissions.length <= 0) {
    const metaRes = await fetchMeta();

    const { permissions, menus } = metaRes.data as {
      permissions: string[];
      menus: Menu[];
    };

    authStore.permissions = permissions;
    authStore.menus = menus;
    console.log("获取权限了", metaRes);
  }

  NProgress.done();
});

export default router;
