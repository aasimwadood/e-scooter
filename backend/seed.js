require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Admin = require("./models/Admin");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/escooter-kohat";

const seedProducts = [
  {
    name: "Eveons Urban Glide",
    slug: "eveons-urban-glide",
    description:
      "The Eveons Urban Glide is the ultimate city commuter e-bike. Featuring a lightweight aluminum frame with a fully integrated 36V 14Ah battery, this bike delivers a smooth 25-mile range on a single charge. The 250W rear hub motor provides pedal-assist up to 20 mph, making your daily commute effortless.",
    price: 1899,
    salePrice: null,
    stock: 12,
    images: ["/images/bike-1.jpg"],
    isNewArrival: true,
    isOnSale: false,
    brand: "Eveons",
    specs: {
      topSpeed: "20 mph",
      range: "25 miles",
      battery: "36V 14Ah Lithium-ion",
      motor: "250W Rear Hub Motor",
      weight: "42 lbs",
      maxLoad: "265 lbs",
      chargingTime: "4-5 hours",
      tireSize: "27.5 x 2.0",
      brakes: "Hydraulic Disc Brakes",
      waterproofRating: "IP54",
    },
  },
  {
    name: "Evee City Cruiser",
    slug: "evee-city-cruiser",
    description:
      "The Evee City Cruiser brings comfort and style to your daily rides. With its relaxed upright geometry, wide cushioned saddle, and swept-back handlebars, you will arrive at your destination refreshed. The 350W mid-drive motor delivers natural-feeling pedal assist.",
    price: 1499,
    salePrice: 1199,
    stock: 8,
    images: ["/images/bike-2.jpg"],
    isNewArrival: false,
    isOnSale: true,
    brand: "Evee",
    specs: {
      topSpeed: "22 mph",
      range: "35 miles",
      battery: "48V 10Ah Lithium-ion",
      motor: "350W Mid-Drive Motor",
      weight: "48 lbs",
      maxLoad: "275 lbs",
      chargingTime: "5-6 hours",
      tireSize: "26 x 2.1",
      brakes: "Mechanical Disc Brakes",
      waterproofRating: "IP55",
    },
  },
  {
    name: "Eveons Trail Master",
    slug: "eveons-trail-master",
    description:
      "Built for adventure, the Eveons Trail Master is a full-suspension electric mountain bike that dominates any terrain. The 750W Bafang mid-drive motor with 120Nm of torque climbs steep trails like they are flat.",
    price: 3299,
    salePrice: 2799,
    stock: 4,
    images: ["https://images.pexels.com/photos/29576636/pexels-photo-29576636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
    isNewArrival: true,
    isOnSale: true,
    brand: "Eveons",
    specs: {
      topSpeed: "28 mph",
      range: "45 miles",
      battery: "48V 17.5Ah Samsung",
      motor: "750W Bafang Mid-Drive",
      weight: "58 lbs",
      maxLoad: "300 lbs",
      chargingTime: "6-7 hours",
      tireSize: "27.5+ x 2.8",
      brakes: "4-Piston Hydraulic Disc",
      waterproofRating: "IP66",
    },
  },
  {
    name: "Evee Compact Fold",
    slug: "evee-compact-fold",
    description:
      "The Evee Compact Fold is the most portable electric bike you will ever own. In just 3 seconds, it folds down to a compact package that fits in your car trunk, under your desk, or in an apartment closet.",
    price: 999,
    salePrice: null,
    stock: 0,
    images: ["https://images.pexels.com/photos/15164805/pexels-photo-15164805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
    isNewArrival: false,
    isOnSale: false,
    brand: "Evee",
    specs: {
      topSpeed: "18 mph",
      range: "20 miles",
      battery: "36V 10Ah Lithium-ion",
      motor: "250W Rear Hub Motor",
      weight: "38 lbs",
      maxLoad: "220 lbs",
      chargingTime: "4 hours",
      tireSize: "20 x 2.0",
      brakes: "Mechanical Disc Brakes",
      waterproofRating: "IP54",
    },
  },
  {
    name: "Eveons Cargo Hauler",
    slug: "eveons-cargo-hauler",
    description:
      "The Eveons Cargo Hauler is built for families, deliveries, and anyone who needs to carry more. With an extended rear rack rated for 100 lbs and an optional front basket, you can haul groceries, kids, or gear with ease.",
    price: 2499,
    salePrice: null,
    stock: 6,
    images: ["https://images.pexels.com/photos/30872961/pexels-photo-30872961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
    isNewArrival: true,
    isOnSale: false,
    brand: "Eveons",
    specs: {
      topSpeed: "20 mph",
      range: "30 miles",
      battery: "48V 15Ah Lithium-ion",
      motor: "500W Rear Hub Motor",
      weight: "65 lbs",
      maxLoad: "400 lbs",
      chargingTime: "5-6 hours",
      tireSize: "24 x 3.0",
      brakes: "Hydraulic Disc Brakes",
      waterproofRating: "IP55",
    },
  },
  {
    name: "Evee Road Racer",
    slug: "evee-road-racer",
    description:
      "The Evee Road Racer brings road bike performance to the electric world. Its lightweight carbon-fiber fork and 700c wheels with 28mm tires deliver razor-sharp handling and minimal rolling resistance.",
    price: 2199,
    salePrice: 1799,
    stock: 18,
    images: ["https://images.pexels.com/photos/6900869/pexels-photo-6900869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
    isNewArrival: false,
    isOnSale: true,
    brand: "Evee",
    specs: {
      topSpeed: "25 mph",
      range: "40 miles",
      battery: "36V 11.6Ah Lithium-ion",
      motor: "350W Rear Hub Motor",
      weight: "36 lbs",
      maxLoad: "250 lbs",
      chargingTime: "4-5 hours",
      tireSize: "700c x 28mm",
      brakes: "Hydraulic Disc Brakes",
      waterproofRating: "IP54",
    },
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing
    await Product.deleteMany({});
    await Admin.deleteMany({});
    console.log("Cleared existing data");

    // Seed products
    await Product.insertMany(seedProducts);
    console.log(`Seeded ${seedProducts.length} products`);

    // Seed admin
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || "admin@escooter-kohat.com",
      password: process.env.ADMIN_PASSWORD || "KohatEbike2024!",
    });
    await admin.save();
    console.log("Seeded admin user");

    console.log("Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
