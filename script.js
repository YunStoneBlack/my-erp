const tableBody = document.getElementById("product-body");
const form = document.getElementById("product-form");
const nameInput = document.getElementById("input-name");
const priceInput = document.getElementById("input-price");
const stockInput = document.getElementById("input-stock");

function renderProducts(products) {
  tableBody.innerHTML = "";
  products.forEach((product) => {
    tableBody.appendChild(createRow(product));
  });
}

function createRow(product) {
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

  const actionCell = document.createElement("td");

  const editButton = document.createElement("button");
  editButton.textContent = "수정";
  editButton.className = "btn-edit";
  editButton.addEventListener("click", () => {
    row.replaceWith(createEditRow(product));
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.className = "btn-delete";
  deleteButton.addEventListener("click", () => deleteProduct(product.id));

  actionCell.append(editButton, deleteButton);
  row.append(nameCell, priceCell, stockCell, actionCell);
  return row;
}

function createEditRow(product) {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  const nameEditInput = document.createElement("input");
  nameEditInput.className = "edit-name";
  nameEditInput.value = product.name;
  nameCell.appendChild(nameEditInput);

  const priceCell = document.createElement("td");
  const priceEditInput = document.createElement("input");
  priceEditInput.type = "number";
  priceEditInput.value = product.price;
  priceCell.appendChild(priceEditInput);

  const stockCell = document.createElement("td");
  const stockEditInput = document.createElement("input");
  stockEditInput.type = "number";
  stockEditInput.value = product.stock;
  stockCell.appendChild(stockEditInput);

  const actionCell = document.createElement("td");

  const saveButton = document.createElement("button");
  saveButton.textContent = "저장";
  saveButton.className = "btn-save";
  saveButton.addEventListener("click", () => {
    updateProduct(product.id, {
      name: nameEditInput.value,
      price: Number(priceEditInput.value),
      stock: Number(stockEditInput.value),
    });
  });

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "취소";
  cancelButton.className = "btn-cancel";
  cancelButton.addEventListener("click", () => {
    row.replaceWith(createRow(product));
  });

  actionCell.append(saveButton, cancelButton);
  row.append(nameCell, priceCell, stockCell, actionCell);
  return row;
}

async function loadProducts() {
  const response = await fetch("/api/products");
  const products = await response.json();
  renderProducts(products);
}

async function updateProduct(id, data) {
  await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await loadProducts();
}

async function deleteProduct(id) {
  await fetch(`/api/products/${id}`, { method: "DELETE" });
  await loadProducts();
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
