/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'nprogress' {
  import { NProgress } from 'nprogress'

  export default NProgress
}