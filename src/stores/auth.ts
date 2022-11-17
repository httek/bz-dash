import { defineStore } from "pinia";
import { Admin } from "../models/admin.model";
import { Menu } from "../models/menu.model";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    bearerToken: "",
    admin: null as Admin | null,
    permissions: [] as string[],
    menus: [] as Menu[],
  }),
  getters: {
    token: (state) => state.bearerToken,
  },
  actions: {
    setToken(token: string, admin: Admin | null = null) {
      this.bearerToken = token;
      admin && (this.admin = admin);
    },
    reset() {
      this.$reset();
      localStorage.removeItem(this.$id);
    },
  },
  persist: {},
});
