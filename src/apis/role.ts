import { PaginateResponse } from "../models/response.model";
import http from "../utils/http";

export interface RoleQuery {
  name: string;
  page: number;
  size: number;
  status: number;
}

export async function fetchRoles(
  params?: RoleQuery
): Promise<PaginateResponse> {
  return http.get("setting/roles", { params });
}
