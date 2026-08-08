// Default initial accounts
const defaultUsers = [
  {
    id: 1,
    name: "KumaMori Admin",
    email: "admin@kumamori.com",
    password: "kumamori_123_dbest",
    contact: "+63 924 771 8260",
    role: "admin",
    avatar: "../images/noPFP.jpg"
  },
  {
    id: 2,
    name: "Kris Malayao",
    email: "kris@email.com",
    password: "secretpassword",
    contact: "",
    role: "customer",
    avatar: "../images/noPFP.jpg"
  }
];

// Initialize database if not already present
if (!localStorage.getItem('km_users')) {
  localStorage.setItem('km_users', JSON.stringify(defaultUsers));
}

// ---------------------------------------------------------------------------
// User database (persists across browser restarts -> localStorage)
// ---------------------------------------------------------------------------
function getUsers() {
  return JSON.parse(localStorage.getItem('km_users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('km_users', JSON.stringify(users));
}

// ---------------------------------------------------------------------------
// Active session (lasts only for the current browser tab/session -> sessionStorage)
// ---------------------------------------------------------------------------
function getCurrentUser() {
  return JSON.parse(sessionStorage.getItem('km_session')) || null;
}

function setCurrentUser(user) {
  sessionStorage.setItem('km_session', JSON.stringify(user));
}

function clearSession() {
  sessionStorage.removeItem('km_session');
}

// Update a user's record in the database AND refresh the live session copy
// so every page reading getCurrentUser() immediately sees the new details.
function updateUser(userId, updatedFields) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) return null;

  users[index] = { ...users[index], ...updatedFields };
  saveUsers(users);
  setCurrentUser(users[index]);

  return users[index];
}

// Guard for admin-only pages: redirect to login if nobody is logged in,
// or straight back out if a non-admin somehow lands here.
function requireAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    window.location.href = '../publicPages/loginPage.html';
    return null;
  }
  return user;
}


// ---------------------------------------------------------------------------
// Inventory (materials/stock) — persists in localStorage so it survives
// navigation, tab switches, and logout across the whole admin side.
// ---------------------------------------------------------------------------
const defaultInventory = [
  {
    "name": "Alphabet Bead - 'A'",
    "category": "Letters & Charms",
    "stock": 150,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 1,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'B'",
    "category": "Letters & Charms",
    "stock": 120,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 2,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'C'",
    "category": "Letters & Charms",
    "stock": 110,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 3,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'D'",
    "category": "Letters & Charms",
    "stock": 95,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 4,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'E'",
    "category": "Letters & Charms",
    "stock": 160,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 5,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'F'",
    "category": "Letters & Charms",
    "stock": 85,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 6,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'G'",
    "category": "Letters & Charms",
    "stock": 90,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 7,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'H'",
    "category": "Letters & Charms",
    "stock": 100,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 8,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'I'",
    "category": "Letters & Charms",
    "stock": 140,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 9,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'J'",
    "category": "Letters & Charms",
    "stock": 70,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 10,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'K'",
    "category": "Letters & Charms",
    "stock": 80,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 11,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'L'",
    "category": "Letters & Charms",
    "stock": 115,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 12,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'M'",
    "category": "Letters & Charms",
    "stock": 130,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 13,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'N'",
    "category": "Letters & Charms",
    "stock": 110,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 14,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'O'",
    "category": "Letters & Charms",
    "stock": 125,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 15,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'P'",
    "category": "Letters & Charms",
    "stock": 85,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 16,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'Q'",
    "category": "Letters & Charms",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 20,
    "updated": "August 04, 2026",
    "id": 17,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'R'",
    "category": "Letters & Charms",
    "stock": 135,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 18,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'S'",
    "category": "Letters & Charms",
    "stock": 145,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 19,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'T'",
    "category": "Letters & Charms",
    "stock": 130,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 20,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'U'",
    "category": "Letters & Charms",
    "stock": 95,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 21,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'V'",
    "category": "Letters & Charms",
    "stock": 65,
    "unit": "pcs",
    "minThreshold": 20,
    "updated": "August 04, 2026",
    "id": 22,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'W'",
    "category": "Letters & Charms",
    "stock": 75,
    "unit": "pcs",
    "minThreshold": 20,
    "updated": "August 04, 2026",
    "id": 23,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'X'",
    "category": "Letters & Charms",
    "stock": 45,
    "unit": "pcs",
    "minThreshold": 20,
    "updated": "August 04, 2026",
    "id": 24,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'Y'",
    "category": "Letters & Charms",
    "stock": 90,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 25,
    "status": "in-stock"
  },
  {
    "name": "Alphabet Bead - 'Z'",
    "category": "Letters & Charms",
    "stock": 50,
    "unit": "pcs",
    "minThreshold": 20,
    "updated": "August 04, 2026",
    "id": 26,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Pink (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 27,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Orange (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 28,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Yellow (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 29,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Green (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 30,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Blue (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 31,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Purple (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 32,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - White (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 33,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Light Grey (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 34,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Dark Grey (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 35,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Black (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 36,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Brown (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 37,
    "status": "in-stock"
  },
  {
    "name": "Leather Strap - Beige (20cm)",
    "category": "Leather Straps",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 38,
    "status": "in-stock"
  },
  {
    "name": "Letter Bead - Peach",
    "category": "Letter Accents",
    "stock": 60,
    "unit": "pcs",
    "minThreshold": 15,
    "updated": "August 04, 2026",
    "id": 39,
    "status": "in-stock"
  },
  {
    "name": "Letter Bead - Light Yellow",
    "category": "Letter Accents",
    "stock": 60,
    "unit": "pcs",
    "minThreshold": 15,
    "updated": "August 04, 2026",
    "id": 40,
    "status": "in-stock"
  },
  {
    "name": "Letter Bead - Light Blue",
    "category": "Letter Accents",
    "stock": 60,
    "unit": "pcs",
    "minThreshold": 15,
    "updated": "August 04, 2026",
    "id": 41,
    "status": "in-stock"
  },
  {
    "name": "Letter Bead - Light Lavender",
    "category": "Letter Accents",
    "stock": 60,
    "unit": "pcs",
    "minThreshold": 15,
    "updated": "August 04, 2026",
    "id": 42,
    "status": "in-stock"
  },
  {
    "name": "Letter Bead - Gold",
    "category": "Letter Accents",
    "stock": 60,
    "unit": "pcs",
    "minThreshold": 15,
    "updated": "August 04, 2026",
    "id": 43,
    "status": "in-stock"
  },
  {
    "name": "Letter Bead - Silver",
    "category": "Letter Accents",
    "stock": 60,
    "unit": "pcs",
    "minThreshold": 15,
    "updated": "August 04, 2026",
    "id": 44,
    "status": "in-stock"
  },
  {
    "name": "Glass Bead - Pink",
    "category": "Beads",
    "stock": 150,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 45,
    "status": "in-stock"
  },
  {
    "name": "Glass Bead - Yellow",
    "category": "Beads",
    "stock": 150,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 46,
    "status": "in-stock"
  },
  {
    "name": "Glass Bead - Blue",
    "category": "Beads",
    "stock": 150,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 47,
    "status": "in-stock"
  },
  {
    "name": "Glass Bead - Purple",
    "category": "Beads",
    "stock": 150,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 48,
    "status": "in-stock"
  },
  {
    "name": "Glass Bead - Pastel Pink",
    "category": "Beads",
    "stock": 150,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 49,
    "status": "in-stock"
  },
  {
    "name": "Glass Bead - White",
    "category": "Beads",
    "stock": 150,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 50,
    "status": "in-stock"
  },
  {
    "name": "Glass Bead - Black",
    "category": "Beads",
    "stock": 150,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 51,
    "status": "in-stock"
  },
  {
    "name": "Spacer Set - Pastel Palette",
    "category": "Spacers",
    "stock": 50,
    "unit": "sets",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 52,
    "status": "in-stock"
  },
  {
    "name": "Spacer Set - Soft Palette",
    "category": "Spacers",
    "stock": 50,
    "unit": "sets",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 53,
    "status": "in-stock"
  },
  {
    "name": "Spacer Set - Warm Palette",
    "category": "Spacers",
    "stock": 50,
    "unit": "sets",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 54,
    "status": "in-stock"
  },
  {
    "name": "Moon Charm - Blush",
    "category": "Moon Charms",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 55,
    "status": "in-stock"
  },
  {
    "name": "Moon Charm - Cream",
    "category": "Moon Charms",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 56,
    "status": "in-stock"
  },
  {
    "name": "Moon Charm - Rose",
    "category": "Moon Charms",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 57,
    "status": "in-stock"
  },
  {
    "name": "Moon Charm - Lilac",
    "category": "Moon Charms",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 58,
    "status": "in-stock"
  },
  {
    "name": "Moon Charm - Mint",
    "category": "Moon Charms",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 59,
    "status": "in-stock"
  },
  {
    "name": "Moon Charm - Sky Blue",
    "category": "Moon Charms",
    "stock": 40,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 60,
    "status": "in-stock"
  },
  {
    "name": "Charm - Star",
    "category": "Charms",
    "stock": 45,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 61,
    "status": "in-stock"
  },
  {
    "name": "Charm - Heart",
    "category": "Charms",
    "stock": 45,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 62,
    "status": "in-stock"
  },
  {
    "name": "Charm - Moon",
    "category": "Charms",
    "stock": 45,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 63,
    "status": "in-stock"
  },
  {
    "name": "Charm - Flower",
    "category": "Charms",
    "stock": 45,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 64,
    "status": "in-stock"
  },
  {
    "name": "Figurine - Bear",
    "category": "Figurines",
    "stock": 45,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 65,
    "status": "in-stock"
  },
  {
    "name": "Figurine - Star",
    "category": "Figurines",
    "stock": 45,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 66,
    "status": "in-stock"
  },
  {
    "name": "Figurine - Heart",
    "category": "Figurines",
    "stock": 45,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 67,
    "status": "in-stock"
  },
  {
    "name": "Figurine - Cloud",
    "category": "Figurines",
    "stock": 45,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 68,
    "status": "in-stock"
  },
  {
    "name": "Pendant - Bear Paw",
    "category": "Pendants",
    "stock": 35,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 69,
    "status": "in-stock"
  },
  {
    "name": "Pendant - Bell",
    "category": "Pendants",
    "stock": 35,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 70,
    "status": "in-stock"
  },
  {
    "name": "Pendant - Ribbon",
    "category": "Pendants",
    "stock": 35,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 71,
    "status": "in-stock"
  },
  {
    "name": "Pendant - Cloud",
    "category": "Pendants",
    "stock": 35,
    "unit": "pcs",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 72,
    "status": "in-stock"
  },
  {
    "name": "Clear Elastic Nylon Band (0.8mm)",
    "category": "Straps & Cords",
    "stock": 45,
    "unit": "meters",
    "minThreshold": 10,
    "updated": "August 04, 2026",
    "id": 73,
    "status": "in-stock"
  },
  {
    "name": "Clear Non-Elastic Nylon String (0.5mm)",
    "category": "Straps & Cords",
    "stock": 8,
    "unit": "meters",
    "minThreshold": 15,
    "updated": "August 04, 2026",
    "id": 74,
    "status": "low-stock"
  },
  {
    "name": "Silver Lobster Clasp",
    "category": "Hardware & Clasps",
    "stock": 0,
    "unit": "pcs",
    "minThreshold": 15,
    "updated": "August 04, 2026",
    "id": 75,
    "status": "out-stock"
  },
  {
    "name": "Gold Lobster Clasp",
    "category": "Hardware & Clasps",
    "stock": 35,
    "unit": "pcs",
    "minThreshold": 15,
    "updated": "August 04, 2026",
    "id": 76,
    "status": "in-stock"
  },
  {
    "name": "Silver Jump Rings (6mm)",
    "category": "Hardware & Clasps",
    "stock": 120,
    "unit": "pcs",
    "minThreshold": 30,
    "updated": "August 04, 2026",
    "id": 77,
    "status": "in-stock"
  }
];

function getInventory() {
  if (!localStorage.getItem('km_inventory')) {
    localStorage.setItem('km_inventory', JSON.stringify(defaultInventory));
  }
  return JSON.parse(localStorage.getItem('km_inventory'));
}

function saveInventory(items) {
  localStorage.setItem('km_inventory', JSON.stringify(items));
}

// ---------------------------------------------------------------------------
// Products (storefront catalog) — persists in localStorage the same way.
// ---------------------------------------------------------------------------
const defaultProducts = [
  {
    "name": "Plush Bear",
    "price": 699,
    "stock": 18,
    "visible": "Shown",
    "custom": "No",
    "description": "A plush companion with a hidden self-defense tool, combining comfort, style, and everyday protection.",
    "id": 1
  },
  {
    "name": "Leather Keychain",
    "price": 145,
    "stock": null,
    "visible": "Shown",
    "custom": "Yes",
    "description": "Create a personalized leather keychain with your name, favorite colors, and charms for a timeless everyday accessory.",
    "id": 2
  },
  {
    "name": "Beaded Keychain",
    "price": 140,
    "stock": null,
    "visible": "Shown",
    "custom": "Yes",
    "description": "Express your personality with colorful beads, custom names, and unique designs made to match your style.",
    "id": 3
  },
  {
    "name": "Charm Keychain",
    "price": 110,
    "stock": null,
    "visible": "Shown",
    "custom": "Yes",
    "description": "Mix and match adorable charms, colors, and accessories to create a one-of-a-kind keychain that's uniquely yours.",
    "id": 4
  }
];

function getProducts() {
  if (!localStorage.getItem('km_products')) {
    localStorage.setItem('km_products', JSON.stringify(defaultProducts));
  }
  return JSON.parse(localStorage.getItem('km_products'));
}

function saveProducts(items) {
  localStorage.setItem('km_products', JSON.stringify(items));
}
// ---------------------------------------------------------------------------
// Orders — each customer's orders are saved under km_orders_<userKey> by
// paymentPlanPage.html at checkout (same pattern as cart storage). These
// helpers let the admin side read and update across every customer's list
// from one place, without changing how orders are stored per-customer.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Material deduction — approving an order (status -> Confirmed) consumes the
// actual inventory materials the customer picked on the Customize page.
// These color/palette names must stay in sync with customizePage.html's
// colorNames object - they're duplicated here since the two files can't
// share a JS module in this setup.
// ---------------------------------------------------------------------------
const CUSTOMIZATION_COLOR_NAMES = {
  leather: ['Pink', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'White', 'Light Grey', 'Dark Grey', 'Black', 'Brown', 'Beige'],
  letter: ['Peach', 'Light Yellow', 'Light Blue', 'Light Lavender', 'Gold', 'Silver'],
  bead: ['Pink', 'Yellow', 'Blue', 'Purple', 'Pastel Pink', 'White', 'Black'],
  spacer: ['Pastel Palette', 'Soft Palette', 'Warm Palette'],
  moon: ['Blush', 'Cream', 'Rose', 'Lilac', 'Mint', 'Sky Blue']
};

function deductMaterialsForItem(item) {
  const state = item.customState;
  if (!state) return; // no structured selection data (e.g. legacy/dummy orders) - nothing precise to deduct

  const inventory = getInventory();
  const deduct = (name, qty) => {
    const idx = inventory.findIndex(i => i.name === name);
    if (idx === -1) return;
    inventory[idx].stock = Math.max(0, inventory[idx].stock - qty);
    inventory[idx].status = inventory[idx].stock === 0
      ? 'out-stock'
      : (inventory[idx].stock <= inventory[idx].minThreshold ? 'low-stock' : 'in-stock');
    inventory[idx].updated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  const qty = item.qty || 1;
  const deductLetters = () => {
    if (!state.letters) return;
    for (const ch of state.letters.toUpperCase()) {
      if (/[A-Z]/.test(ch)) deduct(`Alphabet Bead - '${ch}'`, qty);
    }
  };

  if (item.name === 'Leather Keychain') {
    if (state.leatherIndex != null) {
      const c = CUSTOMIZATION_COLOR_NAMES.leather[state.leatherIndex];
      if (c) deduct(`Leather Strap - ${c} (20cm)`, qty);
    }
    if (state.letterIndex != null) {
      const c = CUSTOMIZATION_COLOR_NAMES.letter[state.letterIndex];
      if (c) deduct(`Letter Bead - ${c}`, qty);
    }
    deduct('Gold Lobster Clasp', qty); // generic assembly hardware, no color option on the form
    if (state.charmMain) deduct(`Charm - ${state.charmMain}`, qty);
    (state.extraCharms || []).forEach(c => deduct(`Charm - ${c}`, qty));
    (state.extraPendants || []).forEach(p => deduct(`Pendant - ${p}`, qty));
    deductLetters();
  } else if (item.name === 'Beaded Keychain' || item.name === 'Charm Keychain') {
    deduct('Clear Elastic Nylon Band (0.8mm)', qty); // base cord every beaded/charm piece is strung on
    deduct('Silver Jump Rings (6mm)', qty);
    deductLetters();
    if (state.figurineMain) deduct(`Figurine - ${state.figurineMain}`, qty);
    (state.extraFigurines || []).forEach(f => deduct(`Figurine - ${f}`, qty));
    (state.beadIndexes || []).forEach(idx => {
      const c = CUSTOMIZATION_COLOR_NAMES.bead[idx];
      if (c) deduct(`Glass Bead - ${c}`, qty);
    });
    (state.spacerIndexes || []).forEach(idx => {
      const p = CUSTOMIZATION_COLOR_NAMES.spacer[idx];
      if (p) deduct(`Spacer Set - ${p}`, qty);
    });
    if (state.moonIndex != null) {
      const c = CUSTOMIZATION_COLOR_NAMES.moon[state.moonIndex];
      if (c) deduct(`Moon Charm - ${c}`, qty);
    }
  }

  saveInventory(inventory);
}

function deductMaterialsForOrder(order) {
  (order.items || []).forEach(item => {
    if (item.customState) {
      // Customizable item (Leather/Beaded/Charm Keychain) - deduct the
      // actual materials the customer picked, from Inventory Management.
      deductMaterialsForItem(item);
    } else {
      // Non-customizable item (e.g. Plush Bear) - deduct directly from its
      // own stock count in Product Management instead.
      const products = getProducts();
      const idx = products.findIndex(p => p.name === item.name);
      if (idx !== -1 && products[idx].stock !== null && products[idx].stock !== undefined) {
        products[idx].stock = Math.max(0, products[idx].stock - (item.qty || 1));
        saveProducts(products);
      }
    }
  });
}

// Mirror of deductMaterialsForItem - adds the same materials back to
// Inventory Management instead of subtracting them. Used when a Confirmed
// order (whose materials were already deducted) gets Cancelled.
function restockMaterialsForItem(item) {
  const state = item.customState;
  if (!state) return; // no structured selection data - nothing precise to restock

  const inventory = getInventory();
  const restock = (name, qty) => {
    const idx = inventory.findIndex(i => i.name === name);
    if (idx === -1) return;
    inventory[idx].stock = inventory[idx].stock + qty;
    inventory[idx].status = inventory[idx].stock === 0
      ? 'out-stock'
      : (inventory[idx].stock <= inventory[idx].minThreshold ? 'low-stock' : 'in-stock');
    inventory[idx].updated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };
  const qty = item.qty || 1;
  const restockLetters = () => {
    if (!state.letters) return;
    for (const ch of state.letters.toUpperCase()) {
      if (/[A-Z]/.test(ch)) restock(`Alphabet Bead - '${ch}'`, qty);
    }
  };

  if (item.name === 'Leather Keychain') {
    if (state.leatherIndex != null) {
      const c = CUSTOMIZATION_COLOR_NAMES.leather[state.leatherIndex];
      if (c) restock(`Leather Strap - ${c} (20cm)`, qty);
    }
    if (state.letterIndex != null) {
      const c = CUSTOMIZATION_COLOR_NAMES.letter[state.letterIndex];
      if (c) restock(`Letter Bead - ${c}`, qty);
    }
    restock('Gold Lobster Clasp', qty);
    if (state.charmMain) restock(`Charm - ${state.charmMain}`, qty);
    (state.extraCharms || []).forEach(c => restock(`Charm - ${c}`, qty));
    (state.extraPendants || []).forEach(p => restock(`Pendant - ${p}`, qty));
    restockLetters();
  } else if (item.name === 'Beaded Keychain' || item.name === 'Charm Keychain') {
    restock('Clear Elastic Nylon Band (0.8mm)', qty);
    restock('Silver Jump Rings (6mm)', qty);
    restockLetters();
    if (state.figurineMain) restock(`Figurine - ${state.figurineMain}`, qty);
    (state.extraFigurines || []).forEach(f => restock(`Figurine - ${f}`, qty));
    (state.beadIndexes || []).forEach(idx => {
      const c = CUSTOMIZATION_COLOR_NAMES.bead[idx];
      if (c) restock(`Glass Bead - ${c}`, qty);
    });
    (state.spacerIndexes || []).forEach(idx => {
      const p = CUSTOMIZATION_COLOR_NAMES.spacer[idx];
      if (p) restock(`Spacer Set - ${p}`, qty);
    });
    if (state.moonIndex != null) {
      const c = CUSTOMIZATION_COLOR_NAMES.moon[state.moonIndex];
      if (c) restock(`Moon Charm - ${c}`, qty);
    }
  }

  saveInventory(inventory);
}

// Mirror of deductMaterialsForOrder - restocks every item in the order,
// routing to inventory materials or product stock the same way deduction does.
function restockMaterialsForOrder(order) {
  (order.items || []).forEach(item => {
    if (item.customState) {
      restockMaterialsForItem(item);
    } else {
      const products = getProducts();
      const idx = products.findIndex(p => p.name === item.name);
      if (idx !== -1 && products[idx].stock !== null && products[idx].stock !== undefined) {
        products[idx].stock = products[idx].stock + (item.qty || 1);
        saveProducts(products);
      }
    }
  });
}

function getAllOrders() {
  const orders = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.indexOf('km_orders_') === 0 && key !== 'km_orders_seeded') {
      try {
        const list = JSON.parse(localStorage.getItem(key)) || [];
        list.forEach(order => orders.push({ ...order, userKey: key.slice('km_orders_'.length) }));
      } catch (e) { /* skip malformed entry */ }
    }
  }
  orders.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  return orders;
}

function updateOrderStatus(orderId, newStatus) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.indexOf('km_orders_') === 0 && key !== 'km_orders_seeded') {
      const list = JSON.parse(localStorage.getItem(key)) || [];
      const index = list.findIndex(o => (o.id || o.orderId) === orderId);
      if (index !== -1) {
        list[index].status = newStatus;
        // Materials are deducted exactly once, only when the admin marks
        // the order Confirmed (never on Pending or any other status).
        if (newStatus === 'Confirmed' && !list[index].materialsDeducted) {
          deductMaterialsForOrder(list[index]);
          list[index].materialsDeducted = true;
        }
        // Cancelling an order that had already been Confirmed gives back
        // whatever was deducted. Cancelling straight from Pending never
        // deducted anything in the first place, so there's nothing to
        // restock - this only fires for orders that actually reached
        // Confirmed at some point.
        if (newStatus === 'Cancelled' && list[index].materialsDeducted) {
          restockMaterialsForOrder(list[index]);
          list[index].materialsDeducted = false;
        }
        localStorage.setItem(key, JSON.stringify(list));
        return list[index];
      }
    }
  }
  return null;
}

// Admin flags a GCash reference that doesn't match their records. Sends the
// order back to the customer as 'Payment Failed' with a note explaining why,
// so they can resubmit a corrected reference via paymentPlanPage.html.
function flagOrderMismatch(orderId, note) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.indexOf('km_orders_') === 0 && key !== 'km_orders_seeded') {
      const list = JSON.parse(localStorage.getItem(key)) || [];
      const index = list.findIndex(o => (o.id || o.orderId) === orderId);
      if (index !== -1) {
        list[index].status = 'Payment Failed';
        list[index].adminNote = note;
        list[index].forceGCashOnly = true;
        localStorage.setItem(key, JSON.stringify(list));
        return list[index];
      }
    }
  }
  return null;
}

// True if this customer already has an order sitting in Pending - used to
// block placing a second order until the first one is Confirmed (or beyond).
function hasActiveOrder(userKey) {
  const orders = JSON.parse(localStorage.getItem('km_orders_' + userKey) || '[]');
  return orders.some(o => o.status === 'Pending');
}

// One-time dummy order seed so Sales Management has real, working sample
// data out of the box. Guarded so it only ever runs once per browser and
// never overwrites real orders placed afterward.
if (!localStorage.getItem('km_orders_seeded')) {
  const dummyOrders = {
    "2": [ // Kris Malayao's real account (id 2), so it also shows in her own Order Tracking
      {
        id: "K071626", orderId: "K071626",
        customerName: "Kris Malayao", customerEmail: "kris@email.com",
        date: "Aug 04, 2026", timestamp: 6,
        status: "Pending",
        deliveryMethod: "Delivery", address: "Taft Ave, Malate, Manila City",
        paymentMethod: "GCash", paymentRef: "0924-7718-2600",
        items: [{ name: "Plush Bear", qty: 1, price: 699, customizations: [] }],
        subtotal: 699, deliveryFee: 50, total: 749
      }
    ],
    "guest-klein": [
      {
        id: "K071627", orderId: "K071627",
        customerName: "Klein Velasquez", customerEmail: "klein@example.com",
        date: "Aug 03, 2026", timestamp: 5,
        status: "Pending",
        deliveryMethod: "Delivery", address: "Diliman, Quezon City",
        paymentMethod: "GCash", paymentRef: "0811-9923-1100",
        items: [{
          name: "Leather Keychain", qty: 1, price: 180,
          customizations: ["Letters: K.V.", "Charm: Star", "Leather Color: Black", "Letter Color: Gold"],
          customState: {
            leatherIndex: 9, letterIndex: 4, charmMain: "Star",
            extraCharms: [], extraPendants: [], extraFigurines: [],
            beadIndexes: [], spacerIndexes: [], moonIndex: null,
            letters: "K.V.", figurineMain: null
          }
        }],
        subtotal: 180, deliveryFee: 50, total: 230
      }
    ],
    "guest-casey": [
      {
        id: "K071628", orderId: "K071628",
        customerName: "Casey Guevarra", customerEmail: "casey@example.com",
        date: "Aug 02, 2026", timestamp: 4,
        status: "Pending",
        deliveryMethod: "Pickup", address: "Pickup at Kuma Mori Main Workshop",
        paymentMethod: "GCash", paymentRef: "0722-1102-4400",
        items: [{
          name: "Beaded Keychain", qty: 1, price: 150,
          customizations: ["Letters: CG", "Figurine: Bear", "Bead Colors: Pink, Purple", "Spacers: Warm Palette"],
          customState: {
            leatherIndex: null, letterIndex: null, charmMain: null,
            extraCharms: [], extraPendants: [], extraFigurines: [],
            beadIndexes: [0, 3], spacerIndexes: [2], moonIndex: null,
            letters: "CG", figurineMain: "Bear"
          }
        }],
        subtotal: 150, deliveryFee: 0, total: 150
      }
    ],
    "guest-andrea": [
      {
        id: "K071629", orderId: "K071629",
        customerName: "Andrea Lorenzo", customerEmail: "andrea@example.com",
        date: "Aug 01, 2026", timestamp: 3,
        status: "Cancelled",
        deliveryMethod: "Delivery", address: "Kapitolyo, Pasig City",
        paymentMethod: "GCash", paymentRef: "0988-3341-9900",
        items: [{
          name: "Charm Keychain", qty: 1, price: 140,
          customizations: ["Figurine: Heart", "Bead Colors: White", "Spacers: Pastel Palette", "Moon Color: Lilac"],
          customState: {
            leatherIndex: null, letterIndex: null, charmMain: null,
            extraCharms: [], extraPendants: [], extraFigurines: [],
            beadIndexes: [5], spacerIndexes: [0], moonIndex: 3,
            letters: "", figurineMain: "Heart"
          }
        }],
        subtotal: 140, deliveryFee: 50, total: 190
      }
    ],
    "guest-sean": [
      {
        id: "K071630", orderId: "K071630",
        customerName: "Sean Fortea", customerEmail: "marco.s@gmail.com",
        date: "Jul 30, 2026", timestamp: 2,
        status: "Shipped",
        deliveryMethod: "Delivery", address: "Alabang, Muntinlupa City",
        paymentMethod: "GCash", paymentRef: "0917-8839-2010",
        items: [{ name: "Plush Bear", qty: 2, price: 699, customizations: [] }],
        subtotal: 1398, deliveryFee: 50, total: 1448
      }
    ],
    "guest-samantha": [
      {
        id: "K071631", orderId: "K071631",
        customerName: "Samantha Reyes", customerEmail: "sam.reyes@yahoo.com",
        date: "Jul 28, 2026", timestamp: 1,
        status: "Pending",
        deliveryMethod: "Delivery", address: "BGC, Taguig City",
        paymentMethod: "COD", paymentRef: "N/A (Cash on Delivery)",
        items: [{
          name: "Beaded Keychain", qty: 1, price: 150,
          customizations: ["Letters: SR", "Figurine: Cloud", "Bead Colors: Black", "Spacers: Soft Palette"],
          customState: {
            leatherIndex: null, letterIndex: null, charmMain: null,
            extraCharms: [], extraPendants: [], extraFigurines: [],
            beadIndexes: [6], spacerIndexes: [1], moonIndex: null,
            letters: "SR", figurineMain: "Cloud"
          }
        }],
        subtotal: 150, deliveryFee: 50, total: 200
      }
    ]
  };

  Object.keys(dummyOrders).forEach(userKey => {
    localStorage.setItem('km_orders_' + userKey, JSON.stringify(dummyOrders[userKey]));
  });
  localStorage.setItem('km_orders_seeded', '1');
}

// ---------------------------------------------------------------------------
// Password Reset (for Forgot Password OTP simulation)
// ---------------------------------------------------------------------------
function resetUserPassword(email, newPassword) {
  const users = getUsers();
  const index = users.findIndex(u => u.email.toLowerCase() === email.trim().toLowerCase());

  if (index === -1) return false;

  // 1. Update password in the persistent user database
  users[index].password = newPassword;
  saveUsers(users);

  // 2. If the user being updated is currently logged in, sync their live session
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.email.toLowerCase() === email.trim().toLowerCase()) {
    currentUser.password = newPassword;
    setCurrentUser(currentUser);
  }

  return true;
}