let inventory;
let damage = 3;
let multiplier = 1;
let trueDamage;
let bossHealth;
let satanIMG;

window.onload = () => {
  if (!localStorage.getItem("clickCount")) {
    localStorage.setItem("clickCount", 0);
  }

  let clickCount = Number(localStorage.getItem("clickCount"));

  let displayElement = document.getElementById("click");
  displayElement.innerHTML = clickCount;

  let health = document.getElementById("boss-health");
  bossHealth = Number(localStorage.getItem("bossHealth"));

  if (!localStorage.getItem("inventory")) {
    localStorage.setItem("inventory", JSON.stringify({}));
  }

  inventory = JSON.parse(localStorage.getItem("inventory"));

  if (!localStorage.getItem("clickCount")) {
    localStorage.setItem("clickCount", 0);
  }

  if (!localStorage.getItem("bossHealth")) {
    localStorage.setItem("bossHealth", 1000);
  }

  satanIMG = document.querySelector(".SATAN");

  const totalDamage = Object.values(inventory).reduce(
    (total, item) => total + item.damage,
    damage
  );

  if (inventory["maxHead"]) {
    trueDamage = totalDamage * 1.5;
  } else {
    trueDamage = totalDamage
  }



  console.log(trueDamage);
  function paina() {
    clickCount += 1;
    localStorage.setItem("clickCount", clickCount);
    displayElement.innerHTML = clickCount;

    bossHealth -= trueDamage;
    localStorage.setItem("bossHealth", bossHealth);
    health.innerHTML = Math.round(bossHealth);

    if (bossHealth <= 0) {
      GameWon();
    }
  }

  window.paina = paina;
};

function GameWon() {
  changeIMG();
}

function changeIMG() {
    satanIMG.src = "img/SATAN-Rage.png";
  }


function SaveAndRedirect() {
  window.location.href = "kauppa.html";
}
