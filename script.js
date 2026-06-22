const tableBody = document.getElementById("product-body");
const form = document.getElementById("product-form");
const nameInput = document.getElementById("input-name");
const priceInput = document.getElementById("input-price");
const stockInput = document.getElementById("input-stock");

function renderProducts(products) {
  tableBody.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    const priceCell = document.createElement("td");
    priceCell.textContent = product.price.toLocaleString("ko-KR") + "원";

    const stockCell = document.createElement("td");
    stockCell.textContent = product.stock + "개";
    if (product.stock <= 5) {
      stockCell.classList.add("low-stock");
    }

    row.append(nameCell, priceCell, stockCell);
    tableBody.appendChild(row);
  });
}

async function loadProducts() {
  const response = await fetch("/api/products");
  const products = await response.json();
  renderProducts(products);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value,
      price: Number(priceInput.value),
      stock: Number(stockInput.value),
    }),
  });

  await loadProducts();
  form.reset();
  nameInput.focus();
});

loadProducts();
