// Product Lists
const foodlist = [
  { name: "Apple", price: 3.44, image: "images/apple.png" },
  { name: "Banana", price: 2.00, image: "images/banana.png" },
  { name: "Orange", price: 2.50, image: "images/fruit.png" },
  { name: "Carrot", price: 2.50, image: "images/carrot.png" },
  { name: "Avocado", price: 2.50, image: "images/avocado.png" },
  { name: "Mango", price: 2.50, image: "images/mango.png" },
  { name: "WaterMelon", price: 2.50, image: "images/watermelon.png" },
  { name: "Cherry", price: 2.50, image: "images/cherries.png" }
];
const drinksandsnack = [
  { name: "Beer", price: 3.44, image: "images/beer-can.png" },
  { name: "ColaCan", price: 2.00, image: "images/can.png" },
  { name: "Coca-Cola", price: 2.50, image: "images/cola.png" },
  { name: "Eggs", price: 2.50, image: "images/egg.png" },
  { name: "Masala", price: 2.50, image: "images/handmasala.png" },
  { name: "OrangeJuice", price: 2.50, image: "images/soda.png" },
  { name: "Oil", price: 2.50, image: "images/oil.png" },
  { name: "MilkPowder", price: 2.50, image: "images/milk-powder.png" }
];
const foods = [
  { name: "Biryani", price: 3.44, image: "images/biryani.png" },
  { name: "Pizza", price: 2.00, image: "images/pizza.png" },
  { name: "Fries", price: 2.50, image: "images/french-fries.png" },
  { name: "Donut", price: 2.50, image: "images/donut.png" },
  { name: "Burger", price: 2.50, image: "images/burger.png" },
  { name: "Tteok", price: 2.50, image: "images/tteok.png" },
  { name: "Cake", price: 2.50, image: "images/cake.png" },
  { name: "Pie", price: 2.50, image: "images/pie.png" }
];
const meat_veg = [
  { name: "Chicken", price: 2.00, image: "images/chicken.png" },
  { name: "Roast Chicken", price: 2.50, image: "images/roast-chicken.png" },
  { name: "Lobster", price: 2.50, image: "images/lobster.png" },
  { name: "Prawn", price: 2.50, image: "images/prawn.png" },
  { name: "Vegetable", price: 2.50, image: "images/vegetable.png" },
  { name: "Broccoli", price: 2.50, image: "images/broccoli.png" },
  { name: "Chicken Liver", price: 2.50, image: "images/chickenliver.png" },
  { name: "SugarCane", price: 2.50, image: "images/sugar-cane.png" }
];

// Globals
let cartItems = [];
let historyItems = [];

// Shows items in a row
function show(row, listItems) {
  const area = document.getElementById(row);
  area.innerHTML = "";
  listItems.forEach(list => {
    const card = document.createElement("div");
    card.className = "items";
    card.setAttribute("data-name", list.name);

    const img = document.createElement("img");
    img.src = list.image;
    img.className = "images";

    const nameText = document.createElement("p");
    nameText.textContent = list.name;

    const price = document.createElement("p");
    price.textContent = "$" + list.price.toFixed(2);

    const button = document.createElement("button");
    button.className = "addtocard";
    button.textContent = "Add To Cart";
    button.onclick = () => addToCart(list);

    card.appendChild(img);
    card.appendChild(nameText);
    card.appendChild(price);
    card.appendChild(button);
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
function confirmOrder() {
  historyItems.push(...cartItems);
  cartItems = [];
  updateCartView();
  updateHistoryView();
}

// Update purchase history
function updateHistoryView() {
  const table = document.getElementById("historyTable");
  table.innerHTML = "";
  historyItems.forEach((item, index) => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
    `;
  });
}

// Show only selected section
function showSection(sectionId) {
  const sections = ["main-view", "profileSection"];
  sections.forEach(id => {
    document.getElementById(id).style.display = id === sectionId ? "block" : "none";
  });
}

// Handle Search
function searchItems() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const allItems = [...foodlist, ...drinksandsnack, ...foods, ...meat_veg];
  const filtered = allItems.filter(item => item.name.toLowerCase().includes(query));
  show("row1", filtered);
  show("row2", []);
  show("row3", []);
  show("row4", []);
}

// Setup user
function setUserProfile() {
  document.getElementById("userName").textContent = "John Doe";
  document.getElementById("userEmail").textContent = "john@example.com";
}

// Init when page loads
window.onload = function () {
  show("row1", foodlist);
  show("row2", drinksandsnack);
  show("row3", foods);
  show("row4", meat_veg);
  setUserProfile();

  document.getElementById("searchInput").addEventListener("input", searchItems);
  document.getElementById("confirmBtn").addEventListener("click", confirmOrder);
  document.getElementById("logo").addEventListener("click", () => showSection("main-view"));
  document.getElementById("profileBtn").addEventListener("click", () => showSection("profileSection"));
  document.getElementById("backBtn").addEventListener("click", () => showSection("main-view"));
};