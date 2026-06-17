import axios from "axios";
import { seedProducts } from "./data/products";
import type { Product } from "./data/products";

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

// ─── Backend Detection ───────────────────────────────────────

const API_URL = import.meta.env.VITE_API_URL || "/api";
let _backendOnline: boolean | null = null;

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 2000,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

async function checkBackend(): Promise<boolean> {
  if (_backendOnline !== null) return _backendOnline;
  try {
    const res = await axios.get(API_URL + "/health", { timeout: 1500 });
    _backendOnline = res.status === 200 && res.data?.status === "ok";
  } catch {
    _backendOnline = false;
  }
  return _backendOnline;
}

// ─── Mock Data Layer ─────────────────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function loadMockProducts(): Product[] {
  const stored = localStorage.getItem("esk_products");
  if (stored) {
    try { return JSON.parse(stored); } catch { /* ignore */ }
  }
  const copy: Product[] = JSON.parse(JSON.stringify(seedProducts));
  localStorage.setItem("esk_products", JSON.stringify(copy));
  return copy;
}

function saveMockProducts(p: Product[]) {
  localStorage.setItem("esk_products", JSON.stringify(p));
}

function loadMockHistory(): StockHistoryEntry[] {
  const stored = localStorage.getItem("esk_history");
  if (stored) {
    try { return JSON.parse(stored); } catch { /* ignore */ }
  }
  const history: StockHistoryEntry[] = [];
  seedProducts.forEach((p) => {
    history.push({
      id: `hist-${p._id}-init`,
      productId: p._id,
      productName: p.name,
      oldStock: 0,
      newStock: p.stock,
      change: p.stock,
      timestamp: p.createdAt,
      unitPrice: p.salePrice || p.price,
      stockValueChange: p.stock * (p.salePrice || p.price),
    });
  });
  localStorage.setItem("esk_history", JSON.stringify(history));
  return history;
}

function saveMockHistory(h: StockHistoryEntry[]) {
  localStorage.setItem("esk_history", JSON.stringify(h));
}

// ─── Public API ──────────────────────────────────────────────

export async function fetchProducts(params?: {
  search?: string;
  filter?: string;
  brand?: string;
}): Promise<Product[]> {
  if (await checkBackend()) {
    const { data } = await api.get("/products", { params });
    return data;
  }
  await delay(200);
  let result = loadMockProducts();
  if (params?.filter === "new") result = result.filter((p) => p.isNewArrival);
  if (params?.filter === "sale") result = result.filter((p) => p.isOnSale);
  if (params?.brand) result = result.filter((p) => p.brand === params.brand);
  if (params?.search) {
    const t = params.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(t) || p.description.toLowerCase().includes(t)
    );
  }
  return result;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  if (await checkBackend()) {
    const { data } = await api.get(`/products/${id}`);
    return data;
  }
  await delay(300);
  return loadMockProducts().find((p) => p._id === id) || null;
}

// ─── Admin API ───────────────────────────────────────────────

export async function adminLogin(
  email: string,
  password: string
): Promise<{ token: string }> {
  if (await checkBackend()) {
    const { data } = await api.post("/admin/login", { email, password });
    return data;
  }
  await delay(300);
  // Check mock admins stored in localStorage
  const mockAdmins: { email: string; password: string }[] = JSON.parse(
    localStorage.getItem("esk_admins") || '[{"email":"admin@escooter-kohat.com","password":"KohatEbike2024!"}]'
  );
  const found = mockAdmins.find((a) => a.email === email && a.password === password);
  if (found) {
    return { token: "mock-jwt-escooter-kohat" };
  }
  throw new Error("Invalid credentials");
}

export async function adminSignup(
  name: string,
  email: string,
  password: string
): Promise<{ token: string }> {
  if (await checkBackend()) {
    const { data } = await api.post("/admin/signup", { name, email, password });
    return data;
  }
  await delay(300);
  // Mock signup — store in localStorage
  const mockAdmins: { email: string; password: string; name: string }[] = JSON.parse(
    localStorage.getItem("esk_admins") || '[{"email":"admin@escooter-kohat.com","password":"KohatEbike2024!","name":"Admin"}]'
  );
  if (mockAdmins.find((a) => a.email === email)) {
    throw new Error("Email already registered");
  }
  mockAdmins.push({ email, password, name });
  localStorage.setItem("esk_admins", JSON.stringify(mockAdmins));
  return { token: "mock-jwt-escooter-kohat" };
}

export async function adminGetProducts(): Promise<Product[]> {
  if (await checkBackend()) {
    const { data } = await api.get("/admin/products");
    return data;
  }
  await delay(200);
  return loadMockProducts();
}

export async function adminUpdateStock(
  productId: string,
  newStock: number
): Promise<Product> {
  if (await checkBackend()) {
    const { data } = await api.put(`/admin/products/${productId}/stock`, { stock: newStock });
    return data;
  }
  await delay(200);
  const products = loadMockProducts();
  const product = products.find((p) => p._id === productId);
  if (!product) throw new Error("Product not found");
  const oldStock = product.stock;
  product.stock = newStock;
  saveMockProducts(products);

  const history = loadMockHistory();
  history.unshift({
    id: `hist-${Date.now()}`,
    productId,
    productName: product.name,
    oldStock,
    newStock,
    change: newStock - oldStock,
    timestamp: new Date().toISOString(),
    unitPrice: product.salePrice || product.price,
    stockValueChange: (newStock - oldStock) * (product.salePrice || product.price),
  });
  saveMockHistory(history);
  return { ...product };
}

export async function adminAddProduct(
  productData: Omit<Product, "_id" | "createdAt">
): Promise<Product> {
  if (await checkBackend()) {
    const { data } = await api.post("/admin/products", productData);
    return data;
  }
  await delay(200);
  const products = loadMockProducts();
  const newProduct: Product = {
    ...productData,
    _id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveMockProducts(products);

  const history = loadMockHistory();
  history.unshift({
    id: `hist-${newProduct._id}-init`,
    productId: newProduct._id,
    productName: newProduct.name,
    oldStock: 0,
    newStock: newProduct.stock,
    change: newProduct.stock,
    timestamp: newProduct.createdAt,
    unitPrice: newProduct.salePrice || newProduct.price,
    stockValueChange: newProduct.stock * (newProduct.salePrice || newProduct.price),
  });
  saveMockHistory(history);
  return { ...newProduct };
}

export async function adminDeleteProduct(productId: string): Promise<void> {
  if (await checkBackend()) {
    await api.delete(`/admin/products/${productId}`);
    return;
  }
  await delay(200);
  const products = loadMockProducts();
  const idx = products.findIndex((p) => p._id === productId);
  if (idx === -1) throw new Error("Product not found");
  const product = products[idx];

  const history = loadMockHistory();
  history.unshift({
    id: `hist-${Date.now()}-del`,
    productId: product._id,
    productName: product.name,
    oldStock: product.stock,
    newStock: 0,
    change: -product.stock,
    timestamp: new Date().toISOString(),
    unitPrice: product.salePrice || product.price,
    stockValueChange: -(product.stock * (product.salePrice || product.price)),
  });
  saveMockHistory(history);

  products.splice(idx, 1);
  saveMockProducts(products);
}

export async function adminGetSales(): Promise<{ amount: number; qty: number }[]> {
  if (await checkBackend()) {
    const { data } = await api.get("/admin/sales");
    return data;
  }
  await delay(200);
  return [
    { amount: 1899, qty: 1 },
    { amount: 1199, qty: 1 },
    { amount: 5598, qty: 2 },
    { amount: 1799, qty: 1 },
    { amount: 2499, qty: 1 },
    { amount: 2398, qty: 2 },
    { amount: 1899, qty: 1 },
    { amount: 2799, qty: 1 },
    { amount: 1799, qty: 1 },
    { amount: 1499, qty: 1 },
  ];
}

export async function adminGetStockHistory(): Promise<StockHistoryEntry[]> {
  if (await checkBackend()) {
    const { data } = await api.get("/admin/stock-history");
    return data;
  }
  await delay(200);
  return loadMockHistory();
}

export async function adminResetData(): Promise<void> {
  if (await checkBackend()) {
    await api.post("/admin/reset");
    return;
  }
  localStorage.removeItem("esk_products");
  localStorage.removeItem("esk_history");
}

// ─── Financial Data ──────────────────────────────────────────

export function getFinancialSummary(
  products: Product[],
  salesData: { amount: number; qty: number }[]
): FinancialSummary {
  const totalMoney = salesData.reduce((s, d) => s + d.amount, 0);
  const totalStockCost = products.reduce((s, p) => s + p.stock * p.price * COST_RATIO, 0);
  const totalUnitsSold = salesData.reduce((s, d) => s + d.qty, 0);
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
