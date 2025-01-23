let inventory;
let damage = 3;
let multiplier = 1;
let trueDamage;
let bossHealth;
let satanIMG;
let baseMusic;
let health;
let trophyIMG;
let clickbutton;
let winbutton;
let maxBossHealth = 100000;
let hbp1;
let hbp2;
let lastMouseX;
let lastMouseY;

let gameWon = false;

window.onload = () => {
  if (!localStorage.getItem("clickCount")) {
    localStorage.setItem("clickCount", 0);
  }

  let clickCount = Number(localStorage.getItem("clickCount"));

  let displayElement = document.getElementById("click");
  displayElement.innerHTML = Math.round(clickCount);

  health = document.getElementById("boss-health");

  if (!localStorage.getItem("inventory")) {
    localStorage.setItem("inventory", JSON.stringify({}));
  }

  inventory = JSON.parse(localStorage.getItem("inventory"));

  if (!localStorage.getItem("clickCount")) {
    localStorage.setItem("clickCount", 0);
  }

  if (!localStorage.getItem("bossHealth")) {
    localStorage.setItem("bossHealth", maxBossHealth);
  }

  bossHealth = Number(localStorage.getItem("bossHealth"));

  baseMusic = document.querySelector(".baseMusic");

  satanIMG = document.querySelector(".SATAN");

  trophyIMG = document.querySelector(".Challenges");

  clickbutton = document.getElementById("clickbutton");

  winbutton = document.getElementById("winbutton");

  hbp1 = document.getElementById("healthbar-p1");

  hbp2 = document.getElementById("healthbar-p2");

  const totalDamage = Object.values(inventory).reduce(
    (total, item) => total + item.damage,
    damage
  );

  if (inventory["maxHead"]) {
    trueDamage = totalDamage * 1.5;
  } else {
    trueDamage = totalDamage;
  }

  selectRandomMusic();

  console.log(trueDamage);

  document.addEventListener("mousemove", (event) => {
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      paina({ clientX: lastMouseX, clientY: lastMouseY });
    }
  });

  function showDPC(damageAmount, x, y) {
    const dpc = document.createElement("div");
    dpc.classList.add("dpc");
    dpc.textContent = `-${damageAmount}`;

    dpc.style.left = `${x}px`;
    dpc.style.top = `${y}px`;

    document.body.appendChild(dpc);

    setTimeout(() => {
      dpc.remove();
    }, 1000);
  }

  function paina(event) {
    if (gameWon) return;

    clickCount += totalDamage / 10;
    localStorage.setItem("clickCount", clickCount);
    displayElement.innerHTML = Math.round(clickCount);

    bossHealth -= trueDamage;

    showDPC(trueDamage, event.clientX, event.clientY);

    localStorage.setItem("bossHealth", bossHealth);
    health.style.width = (bossHealth / maxBossHealth) * 100 + "%";
    health.innerHTML = Math.round(bossHealth);

    if (bossHealth <= 0) {
      GameWon();
    }
  }

  window.paina = paina;
};

const musicTracks = [
  "audio/fight/baseMusic1.mp3",
  "audio/fight/baseMusic2.mp3",
  "audio/fight/baseMusic3.mp3",
];

function selectRandomMusic() {
  const randomIndex = Math.floor(Math.random() * musicTracks.length);
  const selectedTrack = musicTracks[randomIndex];
  baseMusic.src = selectedTrack;
  console.log(selectedTrack);
}

function GameWon() {
  gameWon = true;
  bossHealth = 0;
  health.style.display = "none";
  hbp1.style.display = "none";
  hbp2.style.display = "none";
  localStorage.setItem("bossHealth", bossHealth);
  health.innerHTML = bossHealth;
  const deathaudio = new Audio("audio/fight/Death_sound.wav");
  deathaudio.play();
  changeIMG();
  changeSound();
}

function changeIMG() {
  satanIMG.src = "img/SATAN-Rage.png";
}

function changeSound() {
  baseMusic.pause();
  baseMusic.currentTime = 0;
  const victoryaudio = new Audio("audio/fight/isaacbosswin.mp3");
  victoryaudio.play();
  victoryaudio.onended = () => {
    baseMusic.src = "audio/fight/19Hereafter.mp3";
    baseMusic.play();
    changeButtons();
    changeIMGWin();
  };
}

function changeIMGWin() {
  satanIMG.style.display = "none";

  trophyIMG.style.display = "block";
}

function changeButtons() {
  clickbutton.style.display = "none";
  winbutton.style.display = "block";
}

function SaveAndRedirect() {
  if (gameWon) return;
  window.location.href = "kauppa.html";
}

function winClick() {
  localStorage.clear();

  baseMusic.pause();
  baseMusic.currentTime = 0;
  document.body.style.backgroundImage = "url('img/ENDING.jpg')";
  document.body.style.backgroundSize = "100vw 100vh";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.innerHTML = "";

  const endingaudio = new Audio("audio/fight/five-nights-at-freddys-6-am.mp3");
  endingaudio.play();
  endingaudio.onended = () => {
    baseMusic.src = "audio/fight/19Hereafter.mp3";
    baseMusic.play();
  };

  const restartButton = document.createElement("button");
  restartButton.innerText = "Restart Game";
  restartButton.style.display = "block";
  restartButton.style.margin = "20px auto";
  restartButton.style.padding = "10px 20px";
  restartButton.style.fontSize = "1.5rem";
  restartButton.style.cursor = "pointer";

  restartButton.onclick = () => {
    location.reload();
  };

  document.body.appendChild(restartButton);
}
