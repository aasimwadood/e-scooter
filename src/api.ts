import axios from "axios";
import type { Product } from "./data/products";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Types ───────────────────────────────────────────────────

export interface StockHistoryEntry {
  id: string;
  productId: string;
  productName: string;
  oldStock: number;
  newStock: number;
  change: number;
  timestamp: string;
  unitPrice: number;
  stockValueChange: number;
}

export interface FinancialSummary {
  totalMoney: number;
  totalStockCost: number;
  cashInHand: number;
  totalSales: number;
  totalUnitsSold: number;
  avgOrderValue: number;
}

// ─── Public API ──────────────────────────────────────────────

export async function fetchProducts(params?: {
  search?: string;
  filter?: string;
  brand?: string;
}): Promise<Product[]> {
  const { data } = await api.get("/products", { params });
  return data;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

// ─── Admin API ───────────────────────────────────────────────

export async function adminLogin(
  email: string,
  password: string
): Promise<{ token: string }> {
  const { data } = await api.post("/admin/login", { email, password });
  return data;
}

export async function adminGetProducts(token: string | null): Promise<Product[]> {
  const { data } = await api.get("/admin/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function adminUpdateStock(
  token: string | null,
  productId: string,
  newStock: number
): Promise<Product> {
  const { data } = await api.put(
    `/admin/products/${productId}/stock`,
    { stock: newStock },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}

export async function adminAddProduct(
  token: string | null,
  productData: Omit<Product, "_id" | "createdAt">
): Promise<Product> {
  const { data } = await api.post("/admin/products", productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function adminDeleteProduct(
  token: string | null,
  productId: string
): Promise<void> {
  await api.delete(`/admin/products/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function adminGetStockHistory(
  token: string | null
): Promise<StockHistoryEntry[]> {
  const { data } = await api.get("/admin/stock-history", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}

export async function adminResetData(token: string | null): Promise<void> {
  await api.post("/admin/reset", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ─── Financial Data (client-side computed for now) ───────────

const COST_RATIO = 0.55;

export function getFinancialSummary(products: Product[]): FinancialSummary {
  // Simulated sales data - in production this would come from DB
  const salesData = [
    { date: "2025-01-15", amount: 1899, product: "Eveons Urban Glide", qty: 1 },
    { date: "2025-01-16", amount: 1199, product: "Evee City Cruiser", qty: 1 },
    { date: "2025-01-18", amount: 5598, product: "Eveons Trail Master", qty: 2 },
    { date: "2025-01-20", amount: 1799, product: "Evee Road Racer", qty: 1 },
    { date: "2025-01-22", amount: 2499, product: "Eveons Cargo Hauler", qty: 1 },
    { date: "2025-01-25", amount: 2398, product: "Evee City Cruiser", qty: 2 },
    { date: "2025-01-28", amount: 1899, product: "Eveons Urban Glide", qty: 1 },
    { date: "2025-02-01", amount: 2799, product: "Eveons Trail Master", qty: 1 },
    { date: "2025-02-05", amount: 1799, product: "Evee Road Racer", qty: 1 },
    { date: "2025-02-10", amount: 1499, product: "Eveons Urban Glide", qty: 1 },
  ];

  const totalMoney = salesData.reduce((sum, s) => sum + s.amount, 0);
  const totalStockCost = products.reduce(
    (sum, p) => sum + p.stock * p.price * COST_RATIO,
    0
  );
  const totalUnitsSold = salesData.reduce((sum, s) => sum + s.qty, 0);

  return {
    totalMoney,
    totalStockCost,
    cashInHand: totalMoney - totalStockCost,
    totalSales: salesData.length,
    totalUnitsSold,
    avgOrderValue: totalMoney / salesData.length,
  };
}

// ─── Auth Helpers ────────────────────────────────────────────

export function getAuthToken(): string | null {
  return localStorage.getItem("escooter_kohat_admin_token");
}

export function setAuthToken(token: string): void {
  localStorage.setItem("escooter_kohat_admin_token", token);
}

export function removeAuthToken(): void {
  localStorage.removeItem("escooter_kohat_admin_token");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
