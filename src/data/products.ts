export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number | null;
  stock: number;
  images: string[];
  isNewArrival: boolean;
  isOnSale: boolean;
  brand: string;
  createdAt: string;
  specs: {
    topSpeed: string;
    range: string;
    battery: string;
    motor: string;
    weight: string;
    maxLoad: string;
    chargingTime: string;
    tireSize: string;
    brakes: string;
    waterproofRating: string;
  };
}

export const seedProducts: Product[] = [
  {
    _id: "1",
    name: "Eveons Urban Glide",
    slug: "eveons-urban-glide",
    description:
      "The Eveons Urban Glide is the ultimate city commuter e-bike. Featuring a lightweight aluminum frame with a fully integrated 36V 14Ah battery, this bike delivers a smooth 25-mile range on a single charge. The 250W rear hub motor provides pedal-assist up to 20 mph, making your daily commute effortless. A color LCD display shows speed, battery level, and trip data. The step-through frame design ensures easy mounting for riders of all ages, while the front and rear LED lights keep you visible day and night. Hydraulic disc brakes provide confident stopping power in all weather conditions.",
    price: 1899,
    salePrice: null,
    stock: 12,
    images: ["/images/bike-1.jpg"],
    isNewArrival: true,
    isOnSale: false,
    brand: "Eveons",
    createdAt: "2024-12-01T00:00:00Z",
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
    _id: "2",
    name: "Eve City Cruiser",
    slug: "eve-city-cruiser",
    description:
      "The Eve City Cruiser brings comfort and style to your daily rides. With its relaxed upright geometry, wide cushioned saddle, and swept-back handlebars, you will arrive at your destination refreshed. The 350W mid-drive motor delivers natural-feeling pedal assist with a torque sensor that responds instantly to your pedaling effort. A 48V 10Ah battery is neatly tucked into the rear rack, offering up to 35 miles of range. The 7-speed Shimano drivetrain lets you tackle hills with ease, while the puncture-resistant tires keep you rolling worry-free. Perfect for grocery runs, campus commutes, and leisurely weekend rides.",
    price: 1499,
    salePrice: 1199,
    stock: 8,
    images: ["/images/bike-2.jpg"],
    isNewArrival: false,
    isOnSale: true,
    brand: "Evee",
    createdAt: "2024-09-15T00:00:00Z",
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
    _id: "3",
    name: "Eveons Trail Master",
    slug: "eveons-trail-master",
    description:
      "Built for adventure, the Eveons Trail Master is a full-suspension electric mountain bike that dominates any terrain. The 750W Bafang mid-drive motor with 120Nm of torque climbs steep trails like they are flat. A high-capacity 48V 17.5Ah Samsung battery delivers up to 45 miles of off-road range. The RockShox front fork with 120mm travel and rear air shock absorb every rock and root, while the 27.5+ x 2.8 wide tires float over sand and snow. A dropper post, 11-speed SRAM drivetrain, and 4-piston hydraulic brakes give you full control on descents. This is not just a bike, it is your ticket to the wild.",
    price: 3299,
    salePrice: 2799,
    stock: 4,
    images: ["https://images.pexels.com/photos/29576636/pexels-photo-29576636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
    isNewArrival: true,
    isOnSale: true,
    brand: "Eveons",
    createdAt: "2024-11-20T00:00:00Z",
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
    _id: "4",
    name: "Eve Compact Fold",
    slug: "eve-compact-fold",
    description:
      "The Eve Compact Fold is the most portable electric bike you will ever own. In just 3 seconds, it folds down to a compact package that fits in your car trunk, under your desk, or in an apartment closet. Despite its small folded size, the 20-inch wheels and 250W motor deliver a surprisingly capable ride with a 20-mile range. The 36V 10Ah battery is removable for convenient indoor charging. A 6-speed Shimano drivetrain, front suspension fork, and integrated rear rack make this the perfect multi-modal commuter. Take it on the bus, train, or plane, your mobility has no limits.",
    price: 999,
    salePrice: null,
    stock: 0,
    images: ["https://images.pexels.com/photos/15164805/pexels-photo-15164805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
    isNewArrival: false,
    isOnSale: false,
    brand: "Evee",
    createdAt: "2024-06-01T00:00:00Z",
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
    _id: "5",
    name: "Eveons Cargo Hauler",
    slug: "eveons-cargo-hauler",
    description:
      "The Eveons Cargo Hauler is built for families, deliveries, and anyone who needs to carry more. With an extended rear rack rated for 100 lbs and an optional front basket, you can haul groceries, kids, or gear with ease. The 500W rear hub motor with a 48V 15Ah battery provides plenty of power even when fully loaded, delivering up to 30 miles of range. The low-step frame makes loading and unloading a breeze, while the wide 24 x 3.0 tires ensure stability under heavy loads. Integrated lights, fenders, and a kickstand come standard. Replace your second car with the Cargo Hauler.",
    price: 2499,
    salePrice: null,
    stock: 6,
    images: ["https://images.pexels.com/photos/30872961/pexels-photo-30872961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
    isNewArrival: true,
    isOnSale: false,
    brand: "Eveons",
    createdAt: "2024-12-10T00:00:00Z",
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
    _id: "6",
    name: "Eve Road Racer",
    slug: "eve-road-racer",
    description:
      "The Eve Road Racer brings road bike performance to the electric world. Its lightweight carbon-fiber fork and 700c wheels with 28mm tires deliver razor-sharp handling and minimal rolling resistance. The 350W rear hub motor with a torque sensor provides seamless pedal assist that feels like you just got stronger, not like you are being pushed. A sleek 36V 11.6Ah battery is hidden in the down tube for a clean, traditional road bike look. The 18-speed Shimano Claris groupset gives you the gear range for any gradient. Whether you are training, commuting, or just enjoying a Sunday morning ride, the Road Racer delivers pure cycling joy with an electric boost.",
    price: 2199,
    salePrice: 1799,
    stock: 18,
    images: ["https://images.pexels.com/photos/6900869/pexels-photo-6900869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
    isNewArrival: false,
    isOnSale: true,
    brand: "Evee",
    createdAt: "2024-08-05T00:00:00Z",
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
