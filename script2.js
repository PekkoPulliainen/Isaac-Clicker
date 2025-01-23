let clickCount;
let baseMusic;

const musicTracks = [
  "audio/shop/shop1.mp3",
  "audio/shop/shop2.mp3",
  "audio/shop/shop3.mp3",
];

const globalVolume = 0.25;

window.onload = () => {
  if (!localStorage.getItem("clickCount")) {
    localStorage.setItem("clickCount", 0);
  }

  clickCount = Number(localStorage.getItem("clickCount"));

  baseMusic = document.querySelector(".baseMusic");
  baseMusic.volume = globalVolume

  let displayElement = document.getElementById("click");
  displayElement.innerHTML = Math.round(clickCount);

  if (!localStorage.getItem("inventory")) {
    localStorage.setItem("inventory", JSON.stringify({}));
  }

  inventory = JSON.parse(localStorage.getItem("inventory"));

  selectRandomMusic();
};

const itemStore = {
  smallRock: {
    price: 150,
    damage: 1.5,
  },
  jesusJuice: {
    price: 250,
    damage: 2,
  },
  maxHead: {
    price: 450,
    damage: 3,
    multiplier: 1.5,
  },
  brimstone: {
    price: 1000,
    damage: 50,
  },
  nail: {
    price: 750,
    damage: 10,
  },
  knife: {
    price: 3000,
    damage: 150,
  },
};


function selectRandomMusic() {
  const randomIndex = Math.floor(Math.random() * musicTracks.length);
  const selectedTrack = musicTracks[randomIndex];
  baseMusic.src = selectedTrack;
  console.log(selectedTrack);
}

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
    displayElement.innerHTML = Math.round(clickCount);
  } else {
    alert("Not enough coins!");
  }
}

function SaveAndRedirect2() {
  window.location.href = "index.html";
}
