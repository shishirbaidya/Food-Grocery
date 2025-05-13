## 🛒 Supershop Shopping App – Summary
### Main Features:
Single Page App (SPA) — Fully interactive without full page reloads.

Product Display (Netflix-style):

Products are grouped and shown in rows.

Each row is horizontally scrollable (left/right slider style).

Each product has an image, name, and an "Add to Cart" button.

Search Functionality:

A search bar filters products.

Matching results are shown in a separate scrollable row dynamically.

Cart Functionality:

A side panel or modal shows current cart items.

Each item has quantity (optional), and a remove option.

Button: “Confirm Order” — sends the cart to backend and clears it.

Order Confirmation:

After confirmation, a message like “Order placed successfully!” is shown.

Cart is cleared visually and on backend.


---
# Design-------
backend/
Your full Flask app.

Only returns and accepts JSON.

Never renders HTML.

Follows a clean MVC-ish structure:

routes/: URL endpoints

services/: handles logic like filtering, adding to cart

models/: data or DB access

utils/: extra reusable functions

frontend/
Standalone frontend written in plain HTML/CSS/JS.

index.html is the single-page app.

Communicates with backend using fetch().

Folder can be hosted by Flask, Nginx, or just opened in the browser if CORS is allowed.

