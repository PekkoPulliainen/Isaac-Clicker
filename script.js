let inventory;
let damage = 3;
let multiplier = 1;

window.onload = () => {
  if (!localStorage.getItem("clickCount")) {
    localStorage.setItem("clickCount", 0);
  }

  let clickCount = Number(localStorage.getItem("clickCount"));

  let displayElement = document.getElementById("click");
  displayElement.innerHTML = clickCount;

  let health = document.getElementById("boss-health");
  let bossHealth = Number(localStorage.getItem("bossHealth"));

  if (!localStorage.getItem("inventory")) {
    localStorage.setItem("inventory", JSON.stringify({}));
  }

  inventory = JSON.parse(localStorage.getItem("inventory"));

  if (!localStorage.getItem("clickCount")) {
    localStorage.setItem("clickCount", 0);
  }

  if (!localStorage.getItem("bossHealth")) {
    localStorage.setItem("bossHealth", 100000);
  }
  const totalDamage = Object.values(inventory).reduce(
    (total, item) => total + item.damage,
    damage
  );

  if (inventory[item])

  inventory.includes()

  console.log(totalDamage);
  function paina() {
    clickCount += 1;
    localStorage.setItem("clickCount", clickCount);
    displayElement.innerHTML = clickCount;

    bossHealth -= totalDamage;
    localStorage.setItem("bossHealth", bossHealth);
    health.innerHTML = Math.round(bossHealth);
  }

  window.paina = paina;
};

function SaveAndRedirect() {
  window.location.href = "kauppa.html";
}
