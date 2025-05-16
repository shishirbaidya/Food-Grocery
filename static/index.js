const foodlist = [
  { name: "Apple", price: 3.44, image: "/static/images/apple.png" },
  { name: "Banana", price: 2.00, image: "/static/images/banana.png" },
  { name: "Orange", price: 2.50, image: "/static/images/fruit.png" },
  { name: "Carrot", price: 2.50, image: "/static/images/carrot.png" },
  { name: "Avocado", price: 2.50, image: "/static/images/avocado.png" },
  { name: "Mango", price: 2.50, image: "/static/images/mango.png" },
  { name: "WaterMelon", price: 2.50, image: "/static/images/watermelon.png" },
  { name: "Cherry", price: 2.50, image: "/static/images/cherries.png" }
];
const drinksandsnack = [
  { name: "Beer", price: 3.44, image: "/static/images/beer-can.png" },
  { name: "ColaCan", price: 2.00, image: "/static/images/can.png" },
  { name: "Coca-Cola", price: 2.50, image: "/static/images/cola.png" },
  { name: "Eggs", price: 2.50, image: "/static/images/egg.png" },
  { name: "Masala", price: 2.50, image: "/static/images/handmasala.png" },
  { name: "OrangeJuice", price: 2.50, image: "/static/images/soda.png" },
  { name: "Oil", price: 2.50, image: "/static/images/oil.png" },
  { name: "MilkPowder", price: 2.50, image: "/static/images/milk-powder.png" }
];
const foods = [
  { name: "Biryani", price: 3.44, image: "/static/images/biryani.png" },
  { name: "Pizza", price: 2.00, image: "/static/images/pizza.png" },
  { name: "Fries", price: 2.50, image: "/static/images/french-fries.png" },
  { name: "Donut", price: 2.50, image: "/static/images/donut.png" },
  { name: "Burger", price: 2.50, image: "/static/images/burger.png" },
  { name: "Tteok", price: 2.50, image: "/static/images/tteok.png" },
  { name: "Cake", price: 2.50, image: "/static/images/cake.png" },
  { name: "Pie", price: 2.50, image: "/static/images/pie.png" }
];
const meat_veg = [
  { name: "Chicken", price: 2.00, image: "/static/images/chicken.png" },
  { name: "Roast Chicken", price: 2.50, image: "/static/images/roast-chicken.png" },
  { name: "Lobster", price: 2.50, image: "/static/images/lobster.png" },
  { name: "Prawn", price: 2.50, image: "/static/images/prawn.png" },
  { name: "Vegetable", price: 2.50, image: "/static/images/vegetable.png" },
  { name: "Broccoli", price: 2.50, image: "/static/images/broccoli.png" },
  { name: "Chicken Liver", price: 2.50, image: "/static/images/chickenliver.png" },
  { name: "SugarCane", price: 2.50, image: "/static/images/sugar-cane.png" }
];

// Globals
let cartItems = [];
let historyItems = [];
let currentUser = null;
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

// Shows items in a grid
function show(grid, listItems) {
  const area = document.getElementById(grid);
  area.innerHTML = "";
  listItems.forEach(list => {
    const card = document.createElement("div");
    card.className = "items";
    card.setAttribute("data-name", list.name);

    const img = document.createElement("img");
    img.src = list.image;
    img.className = "images";

    const overlay = document.createElement("div");
    overlay.className = "item-overlay";

    const nameText = document.createElement("p");
    nameText.textContent = list.name;

    const price = document.createElement("p");
    price.textContent = "$" + list.price.toFixed(2);

    const button = document.createElement("button");
    button.className = "addtocard";
    button.textContent = "Add To Cart";
    button.onclick = () => addToCart(list);

    overlay.appendChild(nameText);
    overlay.appendChild(price);
    overlay.appendChild(button);
    card.appendChild(img);
    card.appendChild(overlay);
    area.appendChild(card);
  });
}

// Add to cart logic
function addToCart(item) {
  cartItems.push(item);
  updateCartView();
}

// Update cart items in profile
function updateCartView() {
  const table = document.getElementById("cartTable");
  table.innerHTML = "";
  cartItems.forEach((item, index) => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
    `;
  });
}

// Confirm order button
async function confirmOrder() {
  if (cartItems.length === 0) return;
  const order = {
    items: [...cartItems],
    timestamp: new Date().toLocaleString()
  };
  historyItems.push(order);
  cartItems = [];
  updateCartView();
  updateHistoryView();
  await fetch('/api/history', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: currentUser.email, history: historyItems })
  });
}

// Update purchase history
function updateHistoryView() {
  const container = document.getElementById("historyContainer");
  container.innerHTML = "";
  historyItems.forEach((order, index) => {
    const orderDiv = document.createElement("div");
    orderDiv.className = "order-group";
    
    const title = document.createElement("h3");
    title.textContent = `Order ${index + 1} - ${order.timestamp}`;
    orderDiv.appendChild(title);

    const row = document.createElement("div");
    row.className = "row";
    
    order.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "items";
      card.setAttribute("data-name", item.name);

      const img = document.createElement("img");
      img.src = item.image;
      img.className = "images";

      const nameText = document.createElement("p");
      nameText.textContent = item.name;

      const price = document.createElement("p");
      price.textContent = "$" + item.price.toFixed(2);

      card.appendChild(img);
      card.appendChild(nameText);
      card.appendChild(price);
      row.appendChild(card);
    });

    orderDiv.appendChild(row);
    container.appendChild(orderDiv);
  });
}

// Show only selected section
function showSection(sectionId) {
  if (!isLoggedIn() && sectionId !== "loginSection") {
    showSection("loginSection");
    return;
  }
  const sections = ["loginSection", "main-view", "profileSection"];
  sections.forEach(id => {
    document.getElementById(id).style.display = id === sectionId ? "block" : "none";
  });
  document.getElementById("searchBar").style.display = sectionId === "main-view" ? "block" : "none";
}

// Handle Search
function searchItems() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  if (query.trim() === "") {
    // Restore original categorized view when search is empty
    show("grid1", foodlist);
    show("grid2", drinksandsnack);
    show("grid3", foods);
    show("grid4", meat_veg);
  } else {
    // Filter and display search results in grid1
    const allItems = [...foodlist, ...drinksandsnack, ...foods, ...meat_veg];
    const filtered = allItems.filter(item => item.name.toLowerCase().includes(query));
    show("grid1", filtered);
    show("grid2", []);
    show("grid3", []);
    show("grid4", []);
  }
}

// Setup user profile
function setUserProfile() {
  if (currentUser) {
    document.getElementById("userId").textContent = currentUser.id;
    document.getElementById("userName").textContent = currentUser.name;
    document.getElementById("userEmail").textContent = currentUser.email;
  }
}

// Session Management
function isLoggedIn() {
  const session = localStorage.getItem("session");
  if (!session) return false;
  const { email, timestamp } = JSON.parse(session);
  if (Date.now() - timestamp > SESSION_TIMEOUT) {
    logoutUser();
    return false;
  }
  return true;
}

function setSession(user) {
  localStorage.setItem("session", JSON.stringify({
    email: user.email,
    timestamp: Date.now()
  }));
}

// Login/Registration Logic
function showError(message) {
  const error = document.getElementById("errorMessage");
  error.textContent = message;
  error.style.display = "block";
}

function clearError() {
  const error = document.getElementById("errorMessage");
  error.textContent = "";
  error.style.display = "none";
}

function toggleForms(showRegister) {
  document.getElementById("loginForm").style.display = showRegister ? "none" : "block";
  document.getElementById("registerForm").style.display = showRegister ? "block" : "none";
  document.getElementById("loginTitle").textContent = showRegister ? "Register" : "Login";
  clearError();
}

async function registerUser() {
  const id = document.getElementById("registerId").value;
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!id || !name || !email || !password || !confirmPassword) {
    showError("All fields are required");
    return;
  }
  if (password !== confirmPassword) {
    showError("Passwords do not match");
    return;
  }

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, email, password })
  });
  const result = await response.json();
  if (!result.success) {
    showError(result.message);
    return;
  }

  showError("Registration successful! Please login.");
  toggleForms(false);
}

async function loginUser() {
  const id = document.getElementById("loginId").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, password })
  });
  const result = await response.json();
  if (!result.success) {
    showError(result.message);
    return;
  }

  currentUser = result.user;
  setSession(currentUser);
  const historyResponse = await fetch(`/api/history?email=${currentUser.email}`);
  historyItems = (await historyResponse.json()).history || [];
  setUserProfile();
  updateHistoryView();
  showSection("main-view");
}

function logoutUser() {
  currentUser = null;
  cartItems = [];
  historyItems = [];
  localStorage.removeItem("session");
  updateCartView();
  updateHistoryView();
  showSection("loginSection");
  toggleForms(false);
}

// Init when page loads
window.onload = function () {
  show("grid1", foodlist);
  show("grid2", drinksandsnack);
  show("grid3", foods);
  show("grid4", meat_veg);

  document.getElementById("searchInput").addEventListener("input", searchItems);
  document.getElementById("confirmBtn").addEventListener("click", confirmOrder);
  document.getElementById("logo").addEventListener("click", () => showSection("main-view"));
  document.getElementById("profileBtn").addEventListener("click", () => showSection("profileSection"));
  document.getElementById("backBtn").addEventListener("click", () => showSection("main-view"));
  document.getElementById("logoutBtn").addEventListener("click", logoutUser);
  document.getElementById("submitLogin").addEventListener("click", loginUser);
  document.getElementById("submitRegister").addEventListener("click", registerUser);
  document.getElementById("toggleRegister").addEventListener("click", () => toggleForms(true));
  document.getElementById("toggleLogin").addEventListener("click", () => toggleForms(false));

  if (isLoggedIn()) {
    const session = JSON.parse(localStorage.getItem("session"));
    fetch(`/api/user?email=${session.email}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          currentUser = data.user;
          setUserProfile();
          fetch(`/api/history?email=${currentUser.email}`)
            .then(res => res.json())
            .then(data => {
              historyItems = data.history || [];
              updateHistoryView();
              showSection("main-view");
            });
        } else {
          showSection("loginSection");
        }
      });
  } else {
    showSection("loginSection");
  }
};