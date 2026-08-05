// Default initial accounts
const defaultUsers = [
  {
    id: 1,
    name: "KumaMori Admin",
    email: "admin@kumamori.com",
    password: "kumamori_123_dbest",
    role: "admin",
    avatar: "../images/noPFP.jpg"
  },
  {
    id: 2,
    name: "Kris Malayao",
    email: "kris@email.com",
    password: "secretpassword",
    role: "customer",
    avatar: "../images/noPFP.jpg"
  }
];

// Initialize database if not already present
if (!localStorage.getItem('km_users')) {
  localStorage.setItem('km_users', JSON.stringify(defaultUsers));
}

function getUsers() {
  return JSON.parse(localStorage.getItem('km_users')) || [];
}

function saveUsers(users) {
  localStorage.setItem('km_users', JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('km_session')) || null;
}

function setCurrentUser(user) {
  localStorage.setItem('km_session', JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem('km_session');
}