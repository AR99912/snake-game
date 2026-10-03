// ===== منوی کناری =====
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const toggleBtn = document.getElementById("sidebarToggle");

function toggleSidebar() {
  sidebar.classList.toggle("visible");
  overlay.classList.toggle("visible");
}
toggleBtn.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", toggleSidebar);

document.querySelectorAll(".sidebar-item").forEach((el) => {
  el.addEventListener("click", function () {
    const target = document.getElementById(this.dataset.target);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    document
      .querySelectorAll(".sidebar-item")
      .forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
    if (window.innerWidth <= 850) toggleSidebar();
  });
});

// ===== رنگ‌ها =====
const ALL_COLORS = [
  { name: "قرمز", code: "#e74c3c", emoji: "🔴" },
  { name: "نارنجی", code: "#e67e22", emoji: "🟠" },
  { name: "زرد", code: "#f1c40f", emoji: "🟡" },
  { name: "سبز", code: "#2ecc71", emoji: "🟢" },
  { name: "آبی", code: "#3498db", emoji: "🔵" },
  { name: "بنفش", code: "#9b59b6", emoji: "🟣" },
  { name: "قهوه‌ای", code: "#8B6914", emoji: "🟤" },
  { name: "سفید", code: "#ecf0f1", emoji: "⚪" },
  { name: "مشکی", code: "#2c3e50", emoji: "⚫" },
  { name: "رنگین‌کمان", code: "rainbow", emoji: "🏳️‍🌈" },
];

let selectedColor = ALL_COLORS[0];

// ===== کلاه‌ها با قیمت =====
const HAT_SHOP = [
  { id: "none", emoji: "🚫", name: "بدون کلاه", price: 0, default: true },
  { id: "crown", emoji: "👑", name: "تاج", price: 500 },
  { id: "tophat", emoji: "🎩", name: "کلاه رسمی", price: 300 },
  { id: "cap", emoji: "🧢", name: "کلاه بیسبال", price: 150 },
  { id: "graduation", emoji: "🎓", name: "فارغ‌التحصیلی", price: 400 },
  { id: "summer", emoji: "👒", name: "کلاه تابستانی", price: 200 },
  { id: "helmet", emoji: "⛑", name: "کلاه ایمنی", price: 350 },
];

let ownedHats = ["none"];
let equippedHat = "none";
let totalCoins = 0;

// ===== سیستم قلب =====
let maxLives = 3;
let currentLives = 3;

function resetLives() {
  currentLives = maxLives;
  updateHeartsDisplay();
}

function loseLife() {
  currentLives--;
  updateHeartsDisplay();
  if (currentLives <= 0) {
    return true; // Game Over
  }
  return false;
}

function updateHeartsDisplay() {
  const container = document.getElementById("heartsDisplay");
  container.innerHTML = "";
  for (let i = 0; i < maxLives; i++) {
    const span = document.createElement("span");
    span.className = "heart" + (i >= currentLives ? " lost" : "");
    span.textContent = "❤️";
    container.appendChild(span);
  }
}

// ===== ساخت فروشگاه کلاه =====
function buildHatShop() {
  const shop = document.getElementById("hatShop");
  shop.innerHTML = "";

  HAT_SHOP.forEach((hat) => {
    const div = document.createElement("div");
    div.className = "hat-shop-item";

    const isOwned = ownedHats.includes(hat.id);
    const isEquipped = equippedHat === hat.id;
    const isLocked = !isOwned && hat.price > 0;

    if (isOwned) div.classList.add("owned");
    if (isLocked) div.classList.add("locked");
    if (isEquipped) div.classList.add("selected");

    div.innerHTML = `
                <span class="hat-emoji">${hat.emoji}</span>
                <span class="hat-name">${hat.name}</span>
                <span class="hat-price">${hat.price > 0 ? "💵 " + hat.price : "رایگان"}</span>
                <span class="hat-status ${isEquipped ? "equipped" : isOwned ? "owned" : "locked"}">
                    ${isEquipped ? "✅ فعال" : isOwned ? "✔️ دارم" : "🔒 قفل"}
                </span>
            `;

    div.addEventListener("click", function () {
      if (isOwned) {
        equippedHat = hat.id;
        updateHatShop();
        updateHatDisplay();
      } else if (hat.price === 0) {
        equippedHat = hat.id;
        ownedHats.push(hat.id);
        updateHatShop();
        updateHatDisplay();
      } else {
        if (totalCoins >= hat.price) {
          if (
            confirm(
              `آیا می‌خواهید کلاه "${hat.name}" را با ${hat.price} سکه بخرید؟`,
            )
          ) {
            totalCoins -= hat.price;
            ownedHats.push(hat.id);
            equippedHat = hat.id;
            updateCoinDisplay();
            updateHatShop();
            updateHatDisplay();
          }
        } else {
          alert(
            `سکه‌های کافی ندارید! نیاز به ${hat.price} سکه دارید. شما ${totalCoins} سکه دارید.`,
          );
        }
      }
    });

    shop.appendChild(div);
  });
}

function updateHatShop() {
  buildHatShop();
  document.getElementById("totalCoinsDisplay").textContent = totalCoins;
}

function updateHatDisplay() {
  const hat = HAT_SHOP.find((h) => h.id === equippedHat);
  document.getElementById("hatDisplay").textContent = hat ? hat.emoji : "🚫";
}

function updateCoinDisplay() {
  document.getElementById("scoreDisplay").textContent = totalCoins;
  document.getElementById("totalCoinsDisplay").textContent = totalCoins;
}

// ===== ذخیره و بازیابی =====
function saveProgress() {
  try {
    localStorage.setItem("snakeCoins", totalCoins);
    localStorage.setItem("snakeOwnedHats", JSON.stringify(ownedHats));
    localStorage.setItem("snakeEquippedHat", equippedHat);
    localStorage.setItem("snakeLives", currentLives);
  } catch (e) {}
}

function loadProgress() {
  try {
    const coins = localStorage.getItem("snakeCoins");
    if (coins !== null) totalCoins = parseInt(coins);
    const hats = localStorage.getItem("snakeOwnedHats");
    if (hats) ownedHats = JSON.parse(hats);
    const eq = localStorage.getItem("snakeEquippedHat");
    if (eq) equippedHat = eq;
    const lives = localStorage.getItem("snakeLives");
    if (lives !== null) currentLives = parseInt(lives);
  } catch (e) {}
}

// ===== ساخت رنگ‌ها =====
function buildColorOptions() {
  const picker = document.getElementById("colorPicker");
  picker.innerHTML = "";
  ALL_COLORS.forEach((color, index) => {
    const div = document.createElement("div");
    div.className = "color-option" + (index === 0 ? " active" : "");
    if (color.code === "rainbow") {
      div.style.background =
        "linear-gradient(135deg, #e74c3c, #e67e22, #f1c40f, #2ecc71, #3498db, #9b59b6)";
    } else {
      div.style.background = color.code;
      div.style.color =
        color.code === "#ecf0f1" || color.code === "#f1c40f" ? "#333" : "#fff";
    }
    div.textContent = color.emoji;
    div.dataset.index = index;
    div.addEventListener("click", function () {
      document
        .querySelectorAll(".color-option")
        .forEach((el) => el.classList.remove("active"));
      this.classList.add("active");
      selectedColor = ALL_COLORS[parseInt(this.dataset.index)];
      state.snakeColor = selectedColor.code;
    });
    picker.appendChild(div);
  });
}

// ===== موزیک =====
let audio = new Audio();
let musicLoaded = false;

document.getElementById("musicInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    audio.src = URL.createObjectURL(file);
    audio.loop = true;
    audio.volume = 0.7;
    musicLoaded = true;
    document.getElementById("musicStatus").textContent = "✅ " + file.name;
    document.getElementById("musicStatus").className = "music-status";
  }
});

document.getElementById("playMusicBtn").addEventListener("click", () => {
  if (musicLoaded) audio.play().catch(() => {});
});
document
  .getElementById("pauseMusicBtn")
  .addEventListener("click", () => audio.pause());
document.getElementById("volumeSlider").addEventListener("input", function () {
  audio.volume = this.value / 100;
});

function playMusicIfLoaded() {
  if (musicLoaded) audio.play().catch(() => {});
}

// ===== وضعیت بازی =====
let state = {
  playerName: "",
  snakeColor: "#e74c3c",
  snake: [],
  direction: { dx: 1, dy: 0 },
  food: [],
  score: 0,
  gameOver: false,
  gameLoop: null,
  gameRunning: false,
  speed: 140,
  gridSize: 20,
  foodCount: 3,
  foodAnim: 0,
  portal: null,
  portalActive: false,
  won: false,
  respawning: false,
};

// ===== المان‌ها =====
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const nameInput = document.getElementById("nameInput");
const colorPicker = document.getElementById("colorPicker");
const playBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const menuBtn = document.getElementById("menuBtn");
const playerNameDisplay = document.getElementById("playerNameDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");
const finalScoreEl = document.getElementById("finalScore");
const foodCountDisplay = document.getElementById("foodCountDisplay");
const portalStatus = document.getElementById("portalStatus");
const speedSelect = document.getElementById("speedSelect");
const sizeSelect = document.getElementById("sizeSelect");
const foodCountSelect = document.getElementById("foodCountSelect");
const menuEl = document.getElementById("menu");
const gameScreenEl = document.getElementById("gameScreen");
const gameOverEl = document.getElementById("gameOver");
const resultIcon = document.getElementById("resultIcon");
const resultTitle = document.getElementById("resultTitle");
const speedBtn = document.getElementById("speedBtn");
const speedLabel = document.getElementById("speedLabel");

let CELL_SIZE = canvas.width / state.gridSize;

// ===== تنظیم سرعت =====
const SPEED_LEVELS = [
  { value: 200, label: "آسان" },
  { value: 140, label: "متوسط" },
  { value: 80, label: "سخت" },
  { value: 50, label: "خیلی سخت" },
];
let currentSpeedIndex = 1;

function updateSpeedDisplay() {
  const level = SPEED_LEVELS[currentSpeedIndex];
  speedLabel.textContent = level.label;
  if (state.gameRunning && !state.gameOver) {
    state.speed = level.value;
    if (state.gameLoop) {
      clearInterval(state.gameLoop);
      state.gameLoop = setInterval(stepGame, state.speed);
    }
  }
}

speedBtn.addEventListener("click", () => {
  currentSpeedIndex = (currentSpeedIndex + 1) % SPEED_LEVELS.length;
  updateSpeedDisplay();
});

// ===== توابع کمکی =====
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomPos() {
  return {
    x: randomInt(0, state.gridSize - 1),
    y: randomInt(0, state.gridSize - 1),
  };
}

function isOccupied(pos, excludeFood = false) {
  for (let seg of state.snake)
    if (seg.x === pos.x && seg.y === pos.y) return true;
  if (!excludeFood) {
    for (let f of state.food) if (f.x === pos.x && f.y === pos.y) return true;
  }
  if (state.portal && state.portal.x === pos.x && state.portal.y === pos.y)
    return true;
  return false;
}

function spawnFood() {
  let pos,
    attempts = 0;
  do {
    pos = randomPos();
    attempts++;
  } while (isOccupied(pos) && attempts < 500);
  return pos;
}

function spawnPortal() {
  let pos,
    attempts = 0;
  do {
    pos = randomPos();
    attempts++;
  } while (isOccupied(pos, true) && attempts < 500);
  return pos;
}

function lightenColor(hex, percent) {
  if (hex === "rainbow") return "#f1c40f";
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}

// ===== ریستارت با جان =====
function respawnSnake() {
  state.gameRunning = false;
  if (state.gameLoop) {
    clearInterval(state.gameLoop);
    state.gameLoop = null;
  }

  const startX = Math.floor(state.gridSize / 2);
  const startY = Math.floor(state.gridSize / 2);
  state.snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];
  state.direction = { dx: 1, dy: 0 };
  state.food = [];
  for (let i = 0; i < state.foodCount; i++) state.food.push(spawnFood());
  state.portal = null;
  state.portalActive = false;
  updatePortalStatus();
  state.gameRunning = true;
  state.respawning = false;

  if (state.gameLoop) clearInterval(state.gameLoop);
  state.gameLoop = setInterval(stepGame, state.speed);
  drawGame();
}

// ===== بازی =====
function initGame() {
  state.gridSize = parseInt(sizeSelect.value);
  state.speed = parseInt(speedSelect.value);
  state.foodCount = parseInt(foodCountSelect.value);
  CELL_SIZE = canvas.width / state.gridSize;

  currentSpeedIndex = SPEED_LEVELS.findIndex((l) => l.value === state.speed);
  if (currentSpeedIndex === -1) currentSpeedIndex = 1;
  updateSpeedDisplay();

  const startX = Math.floor(state.gridSize / 2);
  const startY = Math.floor(state.gridSize / 2);
  state.snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];
  state.direction = { dx: 1, dy: 0 };
  state.score = 0;
  state.gameOver = false;
  state.gameRunning = true;
  state.foodAnim = 0;
  state.portal = null;
  state.portalActive = false;
  state.won = false;
  state.respawning = false;
  state.food = [];
  for (let i = 0; i < state.foodCount; i++) state.food.push(spawnFood());
  updateScore();
  updateFoodCount();
  updatePortalStatus();
  resetLives();
}

function updateScore() {
  scoreDisplay.textContent = totalCoins;
  updateCoinDisplay();
}
function updateFoodCount() {
  foodCountDisplay.textContent = state.food.length;
}

function updatePortalStatus() {
  if (state.portalActive && state.portal) {
    portalStatus.textContent = "🚪 پورتال: ✅ فعال";
    portalStatus.style.color = "#a29bfe";
  } else {
    portalStatus.textContent = "🚪 پورتال: ❌ غیرفعال";
    portalStatus.style.color = "#ff6b6b";
  }
}

// ===== رسم کلاه =====
function drawHat(x, y, size) {
  const hat = HAT_SHOP.find((h) => h.id === equippedHat);
  if (!hat || hat.id === "none") return;

  const emoji = hat.emoji;
  ctx.font = `${size * 1.2}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.shadowColor = "rgba(255,255,255,0.3)";
  ctx.shadowBlur = 20;
  ctx.fillText(emoji, x + size / 2, y - 2);
  ctx.shadowBlur = 0;
}

// ===== رسم پورتال =====
function drawPortal() {
  if (!state.portal || !state.portalActive) return;

  const x = state.portal.x * CELL_SIZE;
  const y = state.portal.y * CELL_SIZE;
  const size = CELL_SIZE;
  const cx = x + size / 2;
  const cy = y + size / 2;
  const radius = size * 0.6;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.5);
  grad.addColorStop(0, "rgba(162, 155, 254, 0.8)");
  grad.addColorStop(0.3, "rgba(162, 155, 254, 0.4)");
  grad.addColorStop(1, "rgba(162, 155, 254, 0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
  ctx.fill();

  const time = Date.now() / 1000;
  ctx.shadowColor = "#a29bfe";
  ctx.shadowBlur = 30;

  for (let i = 0; i < 3; i++) {
    const angle = time * 1.5 + i * ((Math.PI * 2) / 3);
    const r = radius * 0.7;
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;
    ctx.fillStyle = `hsl(${240 + i * 30}, 80%, 70%)`;
    ctx.beginPath();
    ctx.arc(px, py, radius * 0.15, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "rgba(162, 155, 254, 0.6)";
  ctx.shadowBlur = 40;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🌀", cx, cy);

  ctx.shadowBlur = 0;
}

// ===== رسم مار =====
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // گرید
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= state.gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * CELL_SIZE, 0);
    ctx.lineTo(i * CELL_SIZE, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(canvas.width, i * CELL_SIZE);
    ctx.stroke();
  }

  // غذاها
  const foodColors = [
    "#ff6b6b",
    "#ffd93d",
    "#ff9f43",
    "#00d2d3",
    "#a29bfe",
    "#fd79a8",
    "#00cec9",
    "#e17055",
  ];
  state.foodAnim += 0.04;
  for (let f of state.food) {
    const cx = f.x * CELL_SIZE + CELL_SIZE / 2;
    const cy = f.y * CELL_SIZE + CELL_SIZE / 2;
    const color = foodColors[Math.floor(Math.random() * foodColors.length)];
    const pulse = 0.85 + 0.15 * Math.sin(state.foodAnim + f.x + f.y);
    const radius = (CELL_SIZE / 2 - 3) * pulse;

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.8);
    glow.addColorStop(0, color + "60");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = color;
    ctx.shadowBlur = 25;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath();
    ctx.arc(
      cx - radius * 0.25,
      cy - radius * 0.25,
      radius * 0.35,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  // پورتال
  if (state.portalActive) {
    drawPortal();
  }

  // ===== مار =====
  const snakeColor = state.snakeColor;
  const segments = state.snake;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const x = seg.x * CELL_SIZE;
    const y = seg.y * CELL_SIZE;
    const padding = i === 0 ? 1 : 2;
    const size = CELL_SIZE - padding * 2;

    let color;
    if (snakeColor === "rainbow") {
      const hue = (i * 25 + Date.now() * 0.02) % 360;
      color = `hsl(${hue}, 80%, 55%)`;
    } else {
      const brightness = 1 - (i / segments.length) * 0.25;
      color = lightenColor(snakeColor, brightness * 25);
    }

    ctx.shadowColor = snakeColor === "rainbow" ? "#f1c40f" : snakeColor;
    ctx.shadowBlur = i === 0 ? 30 : 10;
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.ellipse(
      x + CELL_SIZE / 2,
      y + CELL_SIZE / 2,
      size / 1.8,
      size / 1.8,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();

    // سر
    if (i === 0) {
      ctx.shadowBlur = 0;
      drawHat(x, y, CELL_SIZE);

      // چشم‌ها
      const eyeSize = size * 0.22;
      const eyeOff = size * 0.28;
      const d = state.direction;

      ctx.fillStyle = "#fff";
      ctx.shadowColor = "rgba(255,255,255,0.2)";
      ctx.shadowBlur = 8;

      if (d.dx === 1) {
        ctx.beginPath();
        ctx.ellipse(
          x + CELL_SIZE - eyeOff + 2,
          y + 7,
          eyeSize,
          eyeSize * 1.1,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(
          x + CELL_SIZE - eyeOff + 2,
          y + CELL_SIZE - 7,
          eyeSize,
          eyeSize * 1.1,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.fillStyle = "#1a1a2e";
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(
          x + CELL_SIZE - eyeOff + 5,
          y + 7,
          eyeSize * 0.5,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          x + CELL_SIZE - eyeOff + 5,
          y + CELL_SIZE - 7,
          eyeSize * 0.5,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(
          x + CELL_SIZE - eyeOff + 3,
          y + 5.5,
          eyeSize * 0.2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          x + CELL_SIZE - eyeOff + 3,
          y + CELL_SIZE - 8.5,
          eyeSize * 0.2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      } else if (d.dx === -1) {
        ctx.beginPath();
        ctx.ellipse(
          x + eyeOff - 2,
          y + 7,
          eyeSize,
          eyeSize * 1.1,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(
          x + eyeOff - 2,
          y + CELL_SIZE - 7,
          eyeSize,
          eyeSize * 1.1,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.fillStyle = "#1a1a2e";
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(x + eyeOff - 5, y + 7, eyeSize * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          x + eyeOff - 5,
          y + CELL_SIZE - 7,
          eyeSize * 0.5,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(x + eyeOff - 3, y + 5.5, eyeSize * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          x + eyeOff - 3,
          y + CELL_SIZE - 8.5,
          eyeSize * 0.2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      } else if (d.dy === -1) {
        ctx.beginPath();
        ctx.ellipse(
          x + 7,
          y + eyeOff - 2,
          eyeSize * 1.1,
          eyeSize,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(
          x + CELL_SIZE - 7,
          y + eyeOff - 2,
          eyeSize * 1.1,
          eyeSize,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.fillStyle = "#1a1a2e";
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(x + 7, y + eyeOff - 5, eyeSize * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          x + CELL_SIZE - 7,
          y + eyeOff - 5,
          eyeSize * 0.5,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(x + 5.5, y + eyeOff - 3, eyeSize * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          x + CELL_SIZE - 8.5,
          y + eyeOff - 3,
          eyeSize * 0.2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.ellipse(
          x + 7,
          y + CELL_SIZE - eyeOff + 2,
          eyeSize * 1.1,
          eyeSize,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(
          x + CELL_SIZE - 7,
          y + CELL_SIZE - eyeOff + 2,
          eyeSize * 1.1,
          eyeSize,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.fillStyle = "#1a1a2e";
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(
          x + 7,
          y + CELL_SIZE - eyeOff + 5,
          eyeSize * 0.5,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          x + CELL_SIZE - 7,
          y + CELL_SIZE - eyeOff + 5,
          eyeSize * 0.5,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.beginPath();
        ctx.arc(
          x + 5.5,
          y + CELL_SIZE - eyeOff + 3,
          eyeSize * 0.2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          x + CELL_SIZE - 8.5,
          y + CELL_SIZE - eyeOff + 3,
          eyeSize * 0.2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      ctx.shadowBlur = 0;
    }
    ctx.shadowBlur = 0;
  }
}

// ===== گام بازی =====
function stepGame() {
  if (state.gameOver || !state.gameRunning || state.respawning) return;

  const head = state.snake[0];
  const newHead = {
    x: head.x + state.direction.dx,
    y: head.y + state.direction.dy,
  };

  // ===== پورتال =====
  if (
    state.portalActive &&
    state.portal &&
    newHead.x === state.portal.x &&
    newHead.y === state.portal.y
  ) {
    state.won = true;
    endGame(true);
    return;
  }

  // ===== برخورد با دیوار =====
  if (
    newHead.x < 0 ||
    newHead.x >= state.gridSize ||
    newHead.y < 0 ||
    newHead.y >= state.gridSize
  ) {
    handleDeath();
    return;
  }

  // ===== برخورد با خودش =====
  if (
    state.snake.some(
      (seg, idx) => idx > 0 && seg.x === newHead.x && seg.y === newHead.y,
    )
  ) {
    handleDeath();
    return;
  }

  state.snake.unshift(newHead);

  let ate = false;
  for (let fi = state.food.length - 1; fi >= 0; fi--) {
    const food = state.food[fi];
    if (newHead.x === food.x && newHead.y === food.y) {
      state.food.splice(fi, 1);
      ate = true;
      state.score++;
      totalCoins += 10; // هر غذا = ۱۰ سکه
      updateScore();

      if (state.score >= 100 && !state.portalActive) {
        state.portal = spawnPortal();
        state.portalActive = true;
        updatePortalStatus();
      }

      break;
    }
  }

  if (!ate) {
    state.snake.pop();
  }

  while (state.food.length < state.foodCount) {
    state.food.push(spawnFood());
  }
  updateFoodCount();

  drawGame();
}

// ===== مدیریت مرگ =====
function handleDeath() {
  if (state.respawning) return;
  state.respawning = true;
  state.gameRunning = false;
  if (state.gameLoop) {
    clearInterval(state.gameLoop);
    state.gameLoop = null;
  }

  const gameOver = loseLife();
  if (gameOver) {
    endGame(false);
    return;
  }

  // نمایش پیام کم شدن جان
  const msg = `💔 یک قلب از دست دادی! (${currentLives} قلب باقی مونده)`;
  alert(msg);

  // ریستارت مار با همان سکه‌ها
  setTimeout(() => {
    respawnSnake();
  }, 300);
}

// ===== پایان بازی =====
function endGame(won = false) {
  if (state.gameOver) return;
  state.gameOver = true;
  state.gameRunning = false;
  state.won = won;
  if (state.gameLoop) {
    clearInterval(state.gameLoop);
    state.gameLoop = null;
  }
  audio.pause();

  if (won) {
    resultIcon.className = "icon win";
    resultIcon.textContent = "🏆";
    resultTitle.className = "win";
    resultTitle.textContent = "🎉 برنده شدی! 🎉";
  } else {
    resultIcon.className = "icon lose";
    resultIcon.textContent = "☠️";
    resultTitle.className = "lose";
    resultTitle.textContent = "Game Over";
  }

  finalScoreEl.textContent = state.score;
  saveProgress();
  gameScreenEl.style.display = "none";
  gameOverEl.style.display = "block";
}

// ===== شروع و بازگشت =====
function startGame() {
  const name = nameInput.value.trim() || "بازیکن";
  state.playerName = name;
  playerNameDisplay.textContent = name;
  menuEl.style.display = "none";
  gameOverEl.style.display = "none";
  gameScreenEl.style.display = "block";
  initGame();
  drawGame();
  if (state.gameLoop) clearInterval(state.gameLoop);
  state.gameLoop = setInterval(stepGame, state.speed);
  playMusicIfLoaded();
  updateCoinDisplay();
  updateHeartsDisplay();
}

function goToMenu() {
  if (state.gameLoop) {
    clearInterval(state.gameLoop);
    state.gameLoop = null;
  }
  state.gameRunning = false;
  audio.pause();
  gameScreenEl.style.display = "none";
  gameOverEl.style.display = "none";
  menuEl.style.display = "block";
  saveProgress();
}

// ===== تغییر جهت =====
function changeDirection(dx, dy) {
  if (!state.gameRunning || state.gameOver || state.respawning) return;
  const dir = state.direction;
  if (
    (dx === 1 && dir.dx !== -1) ||
    (dx === -1 && dir.dx !== 1) ||
    (dy === 1 && dir.dy !== -1) ||
    (dy === -1 && dir.dy !== 1)
  ) {
    state.direction = { dx, dy };
  }
}

// ===== رویدادها =====
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key === "ArrowUp") {
    changeDirection(0, -1);
    e.preventDefault();
  } else if (key === "ArrowDown") {
    changeDirection(0, 1);
    e.preventDefault();
  } else if (key === "ArrowLeft") {
    changeDirection(-1, 0);
    e.preventDefault();
  } else if (key === "ArrowRight") {
    changeDirection(1, 0);
    e.preventDefault();
  } else if (key === " " || key === "Space") {
    e.preventDefault();
    speedBtn.click();
  }
});

document
  .getElementById("btnUp")
  .addEventListener("click", () => changeDirection(0, -1));
document
  .getElementById("btnDown")
  .addEventListener("click", () => changeDirection(0, 1));
document
  .getElementById("btnLeft")
  .addEventListener("click", () => changeDirection(-1, 0));
document
  .getElementById("btnRight")
  .addEventListener("click", () => changeDirection(1, 0));

["btnUp", "btnDown", "btnLeft", "btnRight"].forEach((id) => {
  document.getElementById(id).addEventListener("touchstart", (e) => {
    e.preventDefault();
    document.getElementById(id).click();
  });
});

playBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
menuBtn.addEventListener("click", goToMenu);
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") startGame();
});

window.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
    e.preventDefault();
});

// ===== بارگذاری اولیه =====
loadProgress();
buildColorOptions();
updateCoinDisplay();
buildHatShop();
updateHatDisplay();
updateHeartsDisplay();
