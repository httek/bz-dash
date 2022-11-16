import { defineStore } from "pinia";
import { AdminModel } from "../models/admin.model";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    bearerToken: "",
    admin: null as AdminModel | null,
  }),
  getters: {
    token: (state) => state.bearerToken,
  },
  actions: {
    setToken(token: string, admin: AdminModel | null = null) {
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
