import { menuArray } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const container = document.getElementById("container-menu");
const main = document.querySelector(".container");
const btnCompleat = document.querySelector(".com");
const modal = document.querySelector(".modal-container ");
const thank = document.querySelector(".thank");
const form = document.querySelector(".form");
const containerOrder = document.getElementById("container-order");
const thankName = document.getElementById("name");
const email = document.getElementById("email");
const ccv = document.getElementById("ccv");

let shopCart = [
  { name: "pizza", price: 14, amount: 0, total: 0, hasOrder: false },
  { name: "hamburger", price: 12, amount: 0, total: 0, hasOrder: false },
  { name: "beer", price: 12, amount: 0, total: 0, hasOrder: false },
];
document.addEventListener("click", function (e) {
  if (e.target.id === "Pizza") {
    addPizza();
    thank.classList.add("show");
  } else if (e.target.id === "Hamburger") {
    addHamburger();
    thank.classList.add("show");
  } else if (e.target.id === "Beer") {
    beer();
    thank.classList.add("show");
  } else if (e.target.classList[0] === "btn-remove") {
    remove(e.target.id);
  }
});

function remove(value) {
  if (value === "pizza" && shopCart[0].amount > 0) {
    shopCart[0].amount = shopCart[0].amount - 1;
    shopCart[0].total = shopCart[0].amount * shopCart[0].price;
  } else if (value === "hamburger" && shopCart[1].amount > 0) {
    shopCart[1].amount = shopCart[1].amount - 1;
    shopCart[1].total = shopCart[1].amount * shopCart[1].price;
  } else if (value === "beer" && shopCart[2].amount > 0) {
    shopCart[2].amount = shopCart[2].amount - 1;
    shopCart[2].total = shopCart[2].amount * shopCart[2].price;
  }

  render();
}

function addPizza() {
  shopCart[0].amount = shopCart[0].amount + 1;
  shopCart[0].total = shopCart[0].amount * shopCart[0].price;
  if (shopCart[0].amount > 0) {
    shopCart[0].hasOrder = true;
    render();
  } else {
    shopCart[0].hasOrder = false;
  }
}

function addHamburger() {
  shopCart[1].amount = shopCart[1].amount + 1;
  shopCart[1].total = shopCart[1].amount * shopCart[1].price;
  if (shopCart[1].amount > 0) {
    shopCart[1].hasOrder = true;
    render();
  } else {
    shopCart[1].hasOrder = false;
    render();
  }
}

function beer() {
  shopCart[2].amount = shopCart[2].amount + 1;
  shopCart[2].total = shopCart[2].amount * shopCart[2].price;
  if (shopCart[2].amount > 0) {
    shopCart[2].hasOrder = true;
    render();
  } else {
    shopCart[2].hasOrder = false;
    render();
  }
}

function renderPage() {
  let Html = ``;
  menuArray.forEach(function (menu) {
    Html += `
      <div class="menu" id = ${uuidv4()}>
        <div  class="emo-container">
          <span class="emoji">${menu.emoji}</span>
        </div>
        <div class="content">
          <p>${menu.name}</p>
          <p class="food">${menu.ingredients}</p>
          <p>$${menu.price}</p>
        </div>
        <button class ="btn" id=${menu.name} >+</button>
      </div>
    `;
  });
  container.innerHTML = Html;
}

function renderOder() {
  let totalPrice = 0;
  const orderContainer = document.getElementById("order-container");
  const totalCon = document.querySelector(".total-price");

  let HtmlOrder = "";
  containerOrder.classList.remove("show");
  shopCart.forEach(function (shop) {
    if (shop.amount > 0) {
      totalPrice += shop.total;
      HtmlOrder += `
      <div class="oder">
        <div class="box"><p>${shop.name}<button class="btn-remove" id="${shop.name}">Remove</button></p></div>
        <div class="box"><p> amount <span>${shop.amount}</span></p></div>
        <div class="box"><p>$ ${shop.total}</p></div>
      </div>
      `;
    } else {
    }
    orderContainer.innerHTML = HtmlOrder;
    totalCon.innerHTML = `
      <div  class="total">
        <div class="box">total</div>
        <div class="box"> $ ${totalPrice}</div>
      </div

    `;
  });

  if (totalPrice == 0) {
    containerOrder.classList.add("show");
  }
}

btnCompleat.addEventListener("click", function () {
  modal.classList.remove("show");
  main.classList.add("back");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  shopCart = [
    { name: "pizza", price: 14, amount: 0, total: 0, hasOrder: false },
    { name: "hamburger", price: 12, amount: 0, total: 0, hasOrder: false },
    { name: "beer", price: 12, amount: 0, total: 0, hasOrder: false },
  ];
  modal.classList.add("show");
  containerOrder.classList.add("show");
  thank.classList.remove("show");
  thank.innerHTML = `<h1>Thanks, ${thankName.value}! Your order is on its way!</h1>`;
  main.classList.remove("back");
  ccv.value = "";
  thankName.value = "";
  email.value = "";
});

function render() {
  renderPage();
  renderOder();
}

render();
