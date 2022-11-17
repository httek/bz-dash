import { Response } from "../models/response.model";
import http from "../utils/http";

export async function login(params: {
  mobile: string;
  password: string;
}): Promise<Response> {
  return http.post("/auth/login", params);
}

export async function fetchMeta(): Promise<Response> {
  return http.get("auth/meta");
}
