import { seedProducts, Product } from "./data/products";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory product store (mutable copy of seed data)
let products: Product[] = JSON.parse(JSON.stringify(seedProducts));

// ─── Stock History ───────────────────────────────────────────

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

let stockHistory: StockHistoryEntry[] = [];

// Seed some initial history
seedProducts.forEach((p) => {
  stockHistory.push({
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

// ─── Financial Data ──────────────────────────────────────────

// Simulated sales data (money received from customers)
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

// Cost is 55% of retail price (wholesale cost)
const COST_RATIO = 0.55;

export interface FinancialSummary {
  totalMoney: number;        // Total revenue from all sales
  totalStockCost: number;    // Cost of current inventory
  cashInHand: number;        // TotalMoney - TotalStockCost
  totalSales: number;        // Number of transactions
  totalUnitsSold: number;    // Total units sold
  avgOrderValue: number;     // Average order value
}

export function getFinancialSummary(): FinancialSummary {
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

export function getSalesData() {
  return [...salesData];
}

// Simple JWT-like token
const ADMIN_EMAIL = "admin@escooter-kohat.com";
const ADMIN_PASSWORD = "KohatEbike2024!";
const FAKE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.escooter-kohat-admin-token";

// ─── Public API ──────────────────────────────────────────────

export async function fetchProducts(params?: {
  search?: string;
  filter?: string;
  brand?: string;
}): Promise<Product[]> {
  await delay(600);

  let result = [...products];

  // Apply filter
  if (params?.filter === "new") {
    result = result.filter((p) => p.isNewArrival);
  } else if (params?.filter === "sale") {
    result = result.filter((p) => p.isOnSale);
  }

  // Apply brand filter
  if (params?.brand) {
    result = result.filter((p) => p.brand === params.brand);
  }

  // Apply search
  if (params?.search) {
    const term = params.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }

  return result;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await delay(800);
  return products.find((p) => p._id === id) || null;
}

// ─── Admin API ───────────────────────────────────────────────

export async function adminLogin(
  email: string,
  password: string
): Promise<{ token: string }> {
  await delay(500);
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return { token: FAKE_JWT };
  }
  throw new Error("Invalid credentials");
}

function verifyToken(token: string | null): boolean {
  return token === FAKE_JWT;
}

export async function adminGetProducts(
  token: string | null
): Promise<Product[]> {
  await delay(400);
  if (!verifyToken(token)) throw new Error("Unauthorized");
  return [...products];
}

export async function adminUpdateStock(
  token: string | null,
  productId: string,
  newStock: number
): Promise<Product> {
  await delay(300);
  if (!verifyToken(token)) throw new Error("Unauthorized");
  const product = products.find((p) => p._id === productId);
  if (!product) throw new Error("Product not found");

  const oldStock = product.stock;
  const change = newStock - oldStock;
  const unitPrice = product.salePrice || product.price;

  product.stock = newStock;

  // Log to history
  stockHistory.unshift({
    id: `hist-${Date.now()}`,
    productId: product._id,
    productName: product.name,
    oldStock,
    newStock,
    change,
    timestamp: new Date().toISOString(),
    unitPrice,
    stockValueChange: change * unitPrice,
  });

  return { ...product };
}

export async function adminGetStockHistory(
  token: string | null
): Promise<StockHistoryEntry[]> {
  await delay(400);
  if (!verifyToken(token)) throw new Error("Unauthorized");
  return [...stockHistory];
}

export async function adminAddProduct(
  token: string | null,
  productData: Omit<Product, "_id" | "createdAt">
): Promise<Product> {
  await delay(400);
  if (!verifyToken(token)) throw new Error("Unauthorized");
  const newProduct: Product = {
    ...productData,
    _id: String(Date.now()),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);

  // Log initial stock to history
  stockHistory.unshift({
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

  return { ...newProduct };
}

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
  return verifyToken(getAuthToken());
}
