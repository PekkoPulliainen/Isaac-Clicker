let clickCount;

window.onload = () => {
  if (!localStorage.getItem("clickCount")) {
    localStorage.setItem("clickCount", 0);
  }

  clickCount = Number(localStorage.getItem("clickCount"));

  let displayElement = document.getElementById("click");
  displayElement.innerHTML = clickCount;

  if (!localStorage.getItem("inventory")) {
    localStorage.setItem("inventory", JSON.stringify({}));
  }

  inventory = JSON.parse(localStorage.getItem("inventory"));
};

const itemStore = {
  smallRock: {
    price: 150,
    damage: 1.5,
  },
  jesusJuice: {
    price: 200,
    damage: 2,
  },
  maxHead: {
    price: 500,
    damage: 3,
    multiplier: 1.5,
  },
  brimstone: {
    price: 4000,
    damage: 50,
  },
  nail: {
    price: 1000,
    damage: 10,
  },
  knife: {
    price: 20000,
    damage: 150,
  },
};

let inventory = JSON.parse(localStorage.getItem("inventory"));

function buy(itemName) {
  if (clickCount >= itemStore[itemName].price) {
    if (!inventory[itemName]) {
      const { damage, multiplier } = itemStore[itemName];
      inventory[itemName] = { damage, multiplier };
    } else {
      alert("You have already bought this item!");
      return;
    }

    clickCount -= itemStore[itemName].price;
    localStorage.setItem("clickCount", clickCount);
    localStorage.setItem("inventory", JSON.stringify(inventory));

    let displayElement = document.getElementById("click");
    displayElement.innerHTML = clickCount;
  } else {
    alert("Not enough coins!");
  }
}

function SaveAndRedirect2() {
  window.location.href = "index.html";
}
