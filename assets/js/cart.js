(function () {
  var STORAGE_KEY = "infoweb_cart";

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function addItem(title, price) {
    var cart = loadCart();
    var existing = cart.find(function (item) { return item.title === title; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ title: title, price: price, qty: 1 });
    }
    saveCart(cart);
  }

  function bindStoreButtons() {
    var cards = document.querySelectorAll(".product-row");
    cards.forEach(function (row) {
      var titleEl = row.querySelector("h3");
      var priceEl = row.querySelector("strong");
      var link = row.querySelector('a[href="cart.html"]');
      if (!titleEl || !priceEl || !link) return;
      var priceNum = parseInt(priceEl.textContent.replace(/[^\d]/g, ""), 10) || 0;
      link.addEventListener("click", function () {
        addItem(titleEl.textContent.trim(), priceNum);
      });
    });
  }

  function renderCartPage() {
    var container = document.getElementById("cart-contents");
    if (!container) return;
    var cart = loadCart();
    container.innerHTML = "";
    if (cart.length === 0) {
      var empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "Your cart is currently empty.";
      container.appendChild(empty);
      return;
    }
    var list = document.createElement("ul");
    var total = 0;
    cart.forEach(function (item, idx) {
      total += item.price * item.qty;
      var li = document.createElement("li");
      li.style.marginBottom = "10px";
      li.textContent = item.title + " × " + item.qty + " — ₹" + (item.price * item.qty) + " ";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-back";
      btn.textContent = "Remove";
      btn.addEventListener("click", function () {
        cart.splice(idx, 1);
        saveCart(cart);
        renderCartPage();
      });
      li.appendChild(btn);
      list.appendChild(li);
    });
    container.appendChild(list);
    var totalEl = document.createElement("p");
    totalEl.innerHTML = "<strong>Total: ₹" + total + "</strong>";
    container.appendChild(totalEl);
    var clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "btn";
    clearBtn.textContent = "Clear Cart";
    clearBtn.addEventListener("click", function () {
      saveCart([]);
      renderCartPage();
    });
    container.appendChild(clearBtn);
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindStoreButtons();
    renderCartPage();
  });
})();
