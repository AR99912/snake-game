// ============================================================
//  FOUR SONGS - AUTO PLAY / AUTO NEXT
// ============================================================

import { musicTracks } from "./music";

const bgMusic = new Audio();
bgMusic.preload = "auto";
bgMusic.volume = 0.5;
let currentTrackIndex = 0;
let musicStarted = false;

function loadTrack(index) {
  currentTrackIndex = (index + musicTracks.length) % musicTracks.length;
  bgMusic.src = musicTracks[currentTrackIndex];
  bgMusic.load();
}

bgMusic.addEventListener("ended", () => {
  loadTrack(currentTrackIndex + 1);
  bgMusic.play().catch(() => {});
});

bgMusic.addEventListener("error", () => {
  console.log("⚠️ خطا در بارگذاری آهنگ شماره " + (currentTrackIndex + 1));
});

document.getElementById("playMusicBtn").addEventListener("click", () => {
  musicStarted = true;
  bgMusic.play().catch(() => {});
});

document
  .getElementById("pauseMusicBtn")
  .addEventListener("click", () => bgMusic.pause());
document.getElementById("volumeSlider").addEventListener("input", function () {
  bgMusic.volume = this.value / 100;
});

loadTrack(0);

function playMusicIfLoaded() {
  musicStarted = true;
  bgMusic.play().catch(() => {
    // مرورگرهای موبایل صدا را تا اولین لمس/کلیک اجازه نمی‌دهند؛
    // دکمه شروع بازی خودش همان تعامل کاربر است و آهنگ را شروع می‌کند.
  });
}

// ============================================================
//  CLOCK
// ============================================================
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("clockDisplay").textContent =
    hours + ":" + minutes + ":" + seconds;

  const icon = document.querySelector(".clock-icon");
  const h = now.getHours();
  const m = now.getMinutes();
  const emojis = [
    "🕛",
    "🕐",
    "🕑",
    "🕒",
    "🕓",
    "🕔",
    "🕕",
    "🕖",
    "🕗",
    "🕘",
    "🕙",
    "🕚",
  ];
  const index = h % 12;
  const minuteSlot = Math.floor(m / 5);
  const emojiIndex = (index + minuteSlot) % 12;
  icon.textContent = emojis[emojiIndex];
}
setInterval(updateClock, 1000);
updateClock();

// ============================================================
//  TOAST
// ============================================================
let toastTimeout = null;
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const icon = toast.querySelector(".toast-icon");
  const text = toast.querySelector(".toast-text");
  if (toastTimeout) clearTimeout(toastTimeout);
  icon.textContent = type === "success" ? "✅" : "❌";
  text.textContent = message;
  toast.className = "toast " + type;
  void toast.offsetWidth;
  toast.classList.add("show");
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ============================================================
//  LOADING
// ============================================================
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loadingOverlay").classList.add("hidden");
    document.getElementById("mainWrapper").style.display = "flex";
  }, 2000);
});

// ============================================================
//  COUNTDOWN
// ============================================================
function showCountdown(callback) {
  const overlay = document.getElementById("countdownOverlay");
  const numberEl = document.getElementById("countdownNumber");
  overlay.classList.add("visible");
  let count = 3;
  numberEl.textContent = count;
  numberEl.style.animation = "none";
  setTimeout(() => {
    numberEl.style.animation = "countPulse 0.8s ease-in-out";
  }, 10);

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      numberEl.textContent = count;
      numberEl.style.animation = "none";
      setTimeout(() => {
        numberEl.style.animation = "countPulse 0.8s ease-in-out";
      }, 10);
    } else {
      clearInterval(interval);
      numberEl.textContent = "GO!";
      numberEl.className = "countdown-go";
      numberEl.style.animation = "goPulse 0.5s ease-in-out";
      setTimeout(() => {
        overlay.classList.remove("visible");
        numberEl.className = "countdown-number";
        if (callback) callback();
      }, 700);
    }
  }, 800);
}

// ============================================================
//  SNOW
// ============================================================
const snakeEmojis = ["🐍", "🐉", "🦎", "🐊", "🐲"];
function createSnowflakes() {
  const container = document.getElementById("snowContainer");
  container.innerHTML = "";
  const count = window.innerWidth < 500 ? 20 : 40;
  for (let i = 0; i < count; i++) {
    const flake = document.createElement("div");
    flake.className = "snowflake";
    flake.textContent =
      snakeEmojis[Math.floor(Math.random() * snakeEmojis.length)];
    flake.style.left = Math.random() * 100 + "%";
    const size = 18 + Math.random() * 28;
    flake.style.fontSize = size + "px";
    flake.style.animationDuration = 6 + Math.random() * 12 + "s";
    flake.style.animationDelay = Math.random() * 15 + "s";
    flake.style.opacity = 0.3 + Math.random() * 0.6;
    container.appendChild(flake);
  }
}
setTimeout(createSnowflakes, 100);
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(createSnowflakes, 300);
});

// ============================================================
//  LANGUAGE SYSTEM
// ============================================================
const LANGUAGES = {
  fa: {
    name: "نام",
    color: "رنگ",
    hat: "کلاه",
    glasses: "عینک",
    settings: "تنظیمات",
    music: "موسیقی",
    play: "پخش",
    select_lang: "انتخاب زبان",
    player_name: "اسم بازیکن",
    snake_color: "رنگ مار",
    hat_shop: "فروشگاه کلاه",
    glasses_shop: "فروشگاه عینک",
    your_coins: "سکه‌های شما",
    settings_title: "تنظیمات",
    speed: "سرعت",
    size: "اندازه",
    food_count: "تعداد غذا",
    easy: "آسان",
    medium: "متوسط",
    hard: "سخت",
    small: "کوچک",
    large: "بزرگ",
    music_title: "موسیقی",
    start_game: "شروع بازی",
    restart: "دوباره",
    menu: "منو",
    pause: "توقف",
    coins_collected: "سکه‌های جمع‌آوری شده",
    portal_active: "پورتال: ✅ فعال",
    portal_inactive: "پورتال: ❌ غیرفعال",
    game_over: "بازی تمام شد",
    you_won: "🎉 برنده شدی! 🎉",
    speed_levels: ["آسان", "متوسط", "سخت", "خیلی سخت"],
    hat_names: {
      none: "هیچ",
      crown: "تاج",
      tophat: "کلاه رسمی",
      cap: "کلاه بیسبال",
      graduation: "فارغ‌التحصیلی",
      summer: "کلاه تابستانی",
      helmet: "کلاه ایمنی",
    },
    glasses_names: {
      none_g: "هیچ",
      sunglasses: "عینک آفتابی",
      reading: "مطالعه",
      swim: "عینک شنا",
    },
    status_equipped: "✅ فعال",
    status_owned: "✔️ دارم",
    status_locked: "🔒 قفل",
    free: "رایگان",
    food_emojis: ["🍔", "🥙", "🥗", "🍳", "🥪", "🌭", "🍕"],
    bgcolor_title: "رنگ پس‌زمینه",
    pause_btn: "توقف",
    resume_btn: "ادامه",
    back_menu: "برگشت به منو",
    wheel: "چرخ شانس",
    spin: "بچرخان",
    reset: "ریست",
    open: "باز کردن",
    close: "بستن",
    spin_to_win: "برای برنده شدن بچرخان!",
    spinning: "در حال چرخش...",
  },
  en: {
    name: "Name",
    color: "Color",
    hat: "Hat",
    glasses: "Glasses",
    settings: "Settings",
    music: "Music",
    play: "Play",
    select_lang: "Select Language",
    player_name: "Player Name",
    snake_color: "Snake Color",
    hat_shop: "Hat Shop",
    glasses_shop: "Glasses Shop",
    your_coins: "Your Coins",
    settings_title: "Settings",
    speed: "Speed",
    size: "Size",
    food_count: "Food",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    small: "Small",
    large: "Large",
    music_title: "Music",
    start_game: "Start Game",
    restart: "Restart",
    menu: "Menu",
    pause: "Pause",
    coins_collected: "Coins Collected",
    portal_active: "Portal: ✅ Active",
    portal_inactive: "Portal: ❌ Inactive",
    game_over: "Game Over",
    you_won: "🎉 You Won! 🎉",
    speed_levels: ["Easy", "Medium", "Hard", "Very Hard"],
    hat_names: {
      none: "None",
      crown: "Crown",
      tophat: "Top Hat",
      cap: "Cap",
      graduation: "Graduation",
      summer: "Summer Hat",
      helmet: "Helmet",
    },
    glasses_names: {
      none_g: "None",
      sunglasses: "Sunglasses",
      reading: "Reading",
      swim: "Swim Goggles",
    },
    status_equipped: "✅ Active",
    status_owned: "✔️ Owned",
    status_locked: "🔒 Locked",
    free: "Free",
    food_emojis: ["🥞", "🧇", "🧀", "🥐", "🥨", "🥓", "🌮", "🍟"],
    bgcolor_title: "Background Color",
    pause_btn: "Pause",
    resume_btn: "Resume",
    back_menu: "Back to Menu",
    wheel: "Wheel of Fortune",
    spin: "Spin",
    reset: "Reset",
    open: "Open",
    close: "Close",
    spin_to_win: "Spin to win!",
    spinning: "Spinning...",
  },
  ja: {
    name: "名前",
    color: "色",
    hat: "帽子",
    glasses: "メガネ",
    settings: "設定",
    music: "音楽",
    play: "プレイ",
    select_lang: "言語選択",
    player_name: "プレイヤー名",
    snake_color: "ヘビの色",
    hat_shop: "帽子ショップ",
    glasses_shop: "メガネショップ",
    your_coins: "コイン",
    settings_title: "設定",
    speed: "速度",
    size: "サイズ",
    food_count: "食べ物",
    easy: "簡単",
    medium: "普通",
    hard: "難しい",
    small: "小",
    large: "大",
    music_title: "音楽",
    start_game: "ゲーム開始",
    restart: "再開",
    menu: "メニュー",
    pause: "一時停止",
    coins_collected: "獲得コイン",
    portal_active: "ポータル: ✅ アクティブ",
    portal_inactive: "ポータル: ❌ 非アクティブ",
    game_over: "ゲームオーバー",
    you_won: "🎉 勝利！ 🎉",
    speed_levels: ["簡単", "普通", "難しい", "非常に難しい"],
    hat_names: {
      none: "なし",
      crown: "王冠",
      tophat: "シルクハット",
      cap: "キャップ",
      graduation: "卒業帽",
      summer: "サマーハット",
      helmet: "ヘルメット",
    },
    glasses_names: {
      none_g: "なし",
      sunglasses: "サングラス",
      reading: "読書用",
      swim: "スイミングゴーグル",
    },
    status_equipped: "✅ 装備中",
    status_owned: "✔️ 所有",
    status_locked: "🔒 ロック",
    free: "無料",
    food_emojis: ["🍠", "🍱", "🍲", "🍥", "🍤", "🍢", "🍘", "🍙"],
    bgcolor_title: "背景色",
    pause_btn: "一時停止",
    resume_btn: "再開",
    back_menu: "メニューに戻る",
    wheel: "運命のホイール",
    spin: "回す",
    reset: "リセット",
    open: "開く",
    close: "閉じる",
    spin_to_win: "回して勝つ！",
    spinning: "回転中...",
  },
  ko: {
    name: "이름",
    color: "색상",
    hat: "모자",
    glasses: "안경",
    settings: "설정",
    music: "음악",
    play: "게임",
    select_lang: "언어 선택",
    player_name: "플레이어 이름",
    snake_color: "뱀 색상",
    hat_shop: "모자 상점",
    glasses_shop: "안경 상점",
    your_coins: "코인",
    settings_title: "설정",
    speed: "속도",
    size: "크기",
    food_count: "음식",
    easy: "쉬움",
    medium: "보통",
    hard: "어려움",
    small: "작음",
    large: "큼",
    music_title: "음악",
    start_game: "게임 시작",
    restart: "재시작",
    menu: "메뉴",
    pause: "일시정지",
    coins_collected: "획득 코인",
    portal_active: "포털: ✅ 활성화",
    portal_inactive: "포털: ❌ 비활성화",
    game_over: "게임 오버",
    you_won: "🎉 승리! 🎉",
    speed_levels: ["쉬움", "보통", "어려움", "매우 어려움"],
    hat_names: {
      none: "없음",
      crown: "왕관",
      tophat: "실크햇",
      cap: "캡",
      graduation: "졸업모자",
      summer: "여름 모자",
      helmet: "헬멧",
    },
    glasses_names: {
      none_g: "없음",
      sunglasses: "선글라스",
      reading: "독서용",
      swim: "수경",
    },
    status_equipped: "✅ 장착 중",
    status_owned: "✔️ 보유",
    status_locked: "🔒 잠김",
    free: "무료",
    food_emojis: ["🥘", "🫕", "🥣", "🧆", "🍧", "🦑", "🫖", "🍣", "🍢"],
    bgcolor_title: "배경색",
    pause_btn: "일시정지",
    resume_btn: "계속",
    back_menu: "메뉴로 돌아가기",
    wheel: "행운의 바퀴",
    spin: "돌리기",
    reset: "초기화",
    open: "열기",
    close: "닫기",
    spin_to_win: "돌려서 승리하세요!",
    spinning: "돌아가는 중...",
  },
  zh: {
    name: "名字",
    color: "颜色",
    hat: "帽子",
    glasses: "眼镜",
    settings: "设置",
    music: "音乐",
    play: "游戏",
    select_lang: "选择语言",
    player_name: "玩家名称",
    snake_color: "蛇的颜色",
    hat_shop: "帽子店",
    glasses_shop: "眼镜店",
    your_coins: "你的金币",
    settings_title: "设置",
    speed: "速度",
    size: "大小",
    food_count: "食物数量",
    easy: "简单",
    medium: "中等",
    hard: "困难",
    small: "小",
    large: "大",
    music_title: "音乐",
    start_game: "开始游戏",
    restart: "重新开始",
    menu: "菜单",
    pause: "暂停",
    coins_collected: "收集的金币",
    portal_active: "传送门: ✅ 激活",
    portal_inactive: "传送门: ❌ 未激活",
    game_over: "游戏结束",
    you_won: "🎉 你赢了! 🎉",
    speed_levels: ["简单", "中等", "困难", "非常困难"],
    hat_names: {
      none: "无",
      crown: "王冠",
      tophat: "礼帽",
      cap: "棒球帽",
      graduation: "毕业帽",
      summer: "太阳帽",
      helmet: "头盔",
    },
    glasses_names: {
      none_g: "无",
      sunglasses: "太阳镜",
      reading: "阅读眼镜",
      swim: "泳镜",
    },
    status_equipped: "✅ 已装备",
    status_owned: "✔️ 已拥有",
    status_locked: "🔒 已锁定",
    free: "免费",
    food_emojis: ["🦐", "🦞", "🍤", "🍜", "🍝", "🍚", "🌯", "🫔", "🍙", "🥫"],
    bgcolor_title: "背景颜色",
    pause_btn: "暂停",
    resume_btn: "继续",
    back_menu: "返回菜单",
    wheel: "幸运轮盘",
    spin: "旋转",
    reset: "重置",
    open: "打开",
    close: "关闭",
    spin_to_win: "旋转赢大奖！",
    spinning: "旋转中...",
  },
};

let currentLang = "fa";
function t(key) {
  const langData = LANGUAGES[currentLang] || LANGUAGES.en;
  return langData[key] || key;
}
function getFoodEmojis() {
  return LANGUAGES[currentLang].food_emojis || ["🍎"];
}
function getHatName(id) {
  return t("hat_names")[id] || id;
}
function getGlassesName(id) {
  return t("glasses_names")[id] || id;
}
function getSpeedLabel(index) {
  return t("speed_levels")[index] || "Medium";
}

function updateAllTexts() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const text = t(key);
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA")
      el.placeholder = text;
    else el.textContent = text;
  });
  renderAllShops();
  updateSpeedDisplay();
  updatePortalStatus();
  updateHatDisplay();
  updateGlassesDisplay();
  if (state.won) resultTitle.textContent = t("you_won");
  else if (state.gameOver) resultTitle.textContent = t("game_over");
  speedLabel.textContent = getSpeedLabel(currentSpeedIndex);
  document
    .querySelectorAll("select option[data-i18n]")
    .forEach((opt) => (opt.textContent = t(opt.dataset.i18n)));

  updateSpinButtonState();
  wheelToggleBtn.innerHTML = wheelOpen
    ? '🔼 <span data-i18n="close">Close</span>'
    : '🔽 <span data-i18n="open">Open</span>';
}
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".lang-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    currentLang = this.dataset.lang;
    updateAllTexts();
    renderAllShops();
    updateAllDisplays();
    saveProgress();
    drawGame();
  });
});
document.querySelector('.lang-btn[data-lang="fa"]')?.classList.add("active");

// ===== CONSTANTS =====
const ALL_COLORS = [
  { name: "Red", code: "#e74c3c" },
  { name: "Orange", code: "#e67e22" },
  { name: "Yellow", code: "#f1c40f" },
  { name: "Green", code: "#2ecc71" },
  { name: "Blue", code: "#3498db" },
  { name: "Purple", code: "#9b59b6" },
  { name: "Pink", code: "#fd79a8" },
  { name: "Brown", code: "#8B6914" },
  { name: "White", code: "#ecf0f1" },
  { name: "Black", code: "#2c3e50" },
  { name: "Rainbow", code: "rainbow" },
];

const BG_COLORS = [
  { name: "Dark", code: "#1a1a2e" },
  { name: "Black", code: "#000000" },
  { name: "Navy", code: "#0a0a2a" },
  { name: "Dark Green", code: "#0a1f0a" },
  { name: "Dark Purple", code: "#1a0a2a" },
  { name: "Gray", code: "#2a2a2a" },
  { name: "Dark Blue", code: "#0a1a3a" },
  { name: "Charcoal", code: "#1a1a1a" },
];

let selectedColor = ALL_COLORS[0];
let selectedBgColor = BG_COLORS[0];
let selectedSnakeShape = "square";
let selectedScreenMode = "default";
const SCREEN_MODES = {
  night: { name: "Night", code: "#0b1020", page: "night" },
  day: { name: "Day", code: "#ffffff", page: "day" },
  default: { name: "Default", code: "#4f7f57", page: "default" },
};

const HAT_SHOP = [
  {
    id: "none",
    emoji: "🚫",
    name: "hat_names.none",
    price: 0,
    default: true,
    category: "hat",
  },
  {
    id: "crown",
    emoji: "👑",
    name: "hat_names.crown",
    price: 500,
    category: "hat",
  },
  {
    id: "tophat",
    emoji: "🎩",
    name: "hat_names.tophat",
    price: 300,
    category: "hat",
  },
  {
    id: "cap",
    emoji: "🧢",
    name: "hat_names.cap",
    price: 150,
    category: "hat",
  },
  {
    id: "graduation",
    emoji: "🎓",
    name: "hat_names.graduation",
    price: 400,
    category: "hat",
  },
  {
    id: "summer",
    emoji: "👒",
    name: "hat_names.summer",
    price: 200,
    category: "hat",
  },
  {
    id: "helmet",
    emoji: "⛑",
    name: "hat_names.helmet",
    price: 350,
    category: "hat",
  },
];
const GLASSES_SHOP = [
  {
    id: "none_g",
    emoji: "🚫",
    name: "glasses_names.none_g",
    price: 0,
    default: true,
    category: "glasses",
  },
  {
    id: "sunglasses",
    emoji: "🕶",
    name: "glasses_names.sunglasses",
    price: 200,
    category: "glasses",
  },
  {
    id: "reading",
    emoji: "👓",
    name: "glasses_names.reading",
    price: 150,
    category: "glasses",
  },
  {
    id: "swim",
    emoji: "🥽",
    name: "glasses_names.swim",
    price: 250,
    category: "glasses",
  },
];

let ownedHats = ["none"];
let ownedGlasses = ["none_g"];
let equippedHat = "none";
let equippedGlasses = "none_g";
let totalCoins = 0;
let maxLives = 3;
let currentLives = 3;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const nameInput = document.getElementById("nameInput");
const playBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");
const menuBtn = document.getElementById("menuBtn");
const restartGameBtn = document.getElementById("restartGameBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const backMenuBtn = document.getElementById("backMenuBtn");
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
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const toggleBtn = document.getElementById("sidebarToggle");

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
  speed: 180,
  gridSize: 20,
  foodCount: 3,
  foodAnim: 0,
  portal: null,
  portalActive: false,
  won: false,
  respawning: false,
  moveBuffer: [],
  paused: false,
};
let CELL_SIZE = canvas.width / state.gridSize;
let dangerZones = [];

const SPEED_LEVELS = [
  { value: 170, label: "easy" },
  { value: 110, label: "medium" },
  { value: 65, label: "hard" },
  { value: 45, label: "very_hard" },
];
let currentSpeedIndex = 1;

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
  if (!excludeFood)
    for (let f of state.food) if (f.x === pos.x && f.y === pos.y) return true;
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
function lightenColorHex(hex, percent) {
  if (hex === "rainbow") return "#f1c40f";
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}
function resetLives() {
  currentLives = maxLives;
  updateHeartsDisplay();
}
function loseLife() {
  currentLives--;
  updateHeartsDisplay();
  return currentLives <= 0;
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

function spawnDangerZones() {
  dangerZones = [];
  for (let i = 0; i < 2 + Math.floor(state.gridSize / 10); i++) {
    let pos,
      attempts = 0;
    do {
      pos = randomPos();
      attempts++;
    } while (isOccupied(pos, true) && attempts < 300);
    if (attempts < 300) dangerZones.push(pos);
  }
}
function checkDangerZone(head) {
  for (let dz of dangerZones)
    if (dz.x === head.x && dz.y === head.y) return true;
  return false;
}

function getStatusText(item, owned, equipped) {
  if (equipped) return t("status_equipped");
  if (owned) return t("status_owned");
  return t("status_locked");
}

// ===== فروشگاه =====
function renderAllShops() {
  renderHatShop();
  renderGlassesShop();
}

function renderHatShop() {
  const container = document.getElementById("hatShop");
  container.innerHTML = "";
  HAT_SHOP.forEach((item) => {
    const isOwned = ownedHats.includes(item.id);
    const isEquipped = equippedHat === item.id;
    const isLocked = !isOwned && item.price > 0;
    const itemName = getHatName(item.id);
    const statusText = getStatusText(item, isOwned, isEquipped);
    const priceText = item.price > 0 ? "💰 " + item.price : t("free");

    const div = document.createElement("div");
    div.className = "shop-item";
    if (isOwned) div.classList.add("owned");
    if (isLocked) div.classList.add("locked");
    if (isEquipped) div.classList.add("selected");

    div.innerHTML = `
                  <span class="item-emoji">${item.emoji}</span>
                  <span class="item-name">${itemName}</span>
                  <span class="item-price">${priceText}</span>
                  <span class="item-status ${isEquipped ? "equipped" : isOwned ? "owned" : "locked"}">${statusText}</span>
              `;

    div.addEventListener("click", function (e) {
      e.stopPropagation();
      handleHatClick(item.id);
    });
    container.appendChild(div);
  });
}

function renderGlassesShop() {
  const container = document.getElementById("glassesShop");
  container.innerHTML = "";
  GLASSES_SHOP.forEach((item) => {
    const isOwned = ownedGlasses.includes(item.id);
    const isEquipped = equippedGlasses === item.id;
    const isLocked = !isOwned && item.price > 0;
    const itemName = getGlassesName(item.id);
    const statusText = getStatusText(item, isOwned, isEquipped);
    const priceText = item.price > 0 ? "💰 " + item.price : t("free");

    const div = document.createElement("div");
    div.className = "shop-item";
    if (isOwned) div.classList.add("owned");
    if (isLocked) div.classList.add("locked");
    if (isEquipped) div.classList.add("selected");

    div.innerHTML = `
                  <span class="item-emoji">${item.emoji}</span>
                  <span class="item-name">${itemName}</span>
                  <span class="item-price">${priceText}</span>
                  <span class="item-status ${isEquipped ? "equipped" : isOwned ? "owned" : "locked"}">${statusText}</span>
              `;

    div.addEventListener("click", function (e) {
      e.stopPropagation();
      handleGlassesClick(item.id);
    });
    container.appendChild(div);
  });
}

function handleHatClick(itemId) {
  const item = HAT_SHOP.find((h) => h.id === itemId);
  if (!item) return;

  if (ownedHats.includes(itemId)) {
    equippedHat = itemId;
    renderAllShops();
    updateAllDisplays();
    showToast("✅ " + getHatName(itemId) + " equipped!", "success");
    return;
  }

  if (item.price === 0) {
    ownedHats.push(itemId);
    equippedHat = itemId;
    renderAllShops();
    updateAllDisplays();
    showToast("✅ " + getHatName(itemId) + " equipped!", "success");
    return;
  }

  if (totalCoins >= item.price) {
    totalCoins -= item.price;
    ownedHats.push(itemId);
    equippedHat = itemId;
    renderAllShops();
    updateAllDisplays();
    saveProgress();
    showToast(
      "✅ Purchased " + getHatName(itemId) + " for " + item.price + " coins!",
      "success",
    );
  } else {
    showToast(
      "❌ Not enough coins! Need " + item.price + ", you have " + totalCoins,
      "error",
    );
  }
}

function handleGlassesClick(itemId) {
  const item = GLASSES_SHOP.find((g) => g.id === itemId);
  if (!item) return;

  if (ownedGlasses.includes(itemId)) {
    equippedGlasses = itemId;
    renderAllShops();
    updateAllDisplays();
    showToast("✅ " + getGlassesName(itemId) + " equipped!", "success");
    return;
  }

  if (item.price === 0) {
    ownedGlasses.push(itemId);
    equippedGlasses = itemId;
    renderAllShops();
    updateAllDisplays();
    showToast("✅ " + getGlassesName(itemId) + " equipped!", "success");
    return;
  }

  if (totalCoins >= item.price) {
    totalCoins -= item.price;
    ownedGlasses.push(itemId);
    equippedGlasses = itemId;
    renderAllShops();
    updateAllDisplays();
    saveProgress();
    showToast(
      "✅ Purchased " +
        getGlassesName(itemId) +
        " for " +
        item.price +
        " coins!",
      "success",
    );
  } else {
    showToast(
      "❌ Not enough coins! Need " + item.price + ", you have " + totalCoins,
      "error",
    );
  }
}

function updateScore() {
  document.getElementById("scoreDisplay").textContent = totalCoins;
  document.getElementById("totalCoinsDisplay").textContent = totalCoins;
}

function updateAllDisplays() {
  renderAllShops();
  updateScore();
  updateHatDisplay();
  updateGlassesDisplay();
  updateSpinButtonState();
  saveProgress();
}

function updateHatDisplay() {
  const hat = HAT_SHOP.find((h) => h.id === equippedHat);
  document.getElementById("hatDisplay").textContent = hat ? hat.emoji : "🚫";
}
function updateGlassesDisplay() {
  const g = GLASSES_SHOP.find((h) => h.id === equippedGlasses);
  document.getElementById("glassesDisplay").textContent = g ? g.emoji : "🚫";
}
function updatePortalStatus() {
  if (state.portalActive && state.portal) {
    portalStatus.textContent = "🚪 " + t("portal_active");
    portalStatus.style.color = "#a29bfe";
  } else {
    portalStatus.textContent = "🚪 " + t("portal_inactive");
    portalStatus.style.color = "#ff6b6b";
  }
}
function updateSpeedDisplay() {
  const level = SPEED_LEVELS[currentSpeedIndex];
  speedLabel.textContent = getSpeedLabel(currentSpeedIndex);
  if (state.gameRunning && !state.gameOver && !state.paused) {
    state.speed = level.value;
    if (state.gameLoop) {
      clearInterval(state.gameLoop);
      state.gameLoop = setInterval(stepGame, state.speed);
    }
  }
}
function updateFoodCount() {
  foodCountDisplay.textContent = state.food.length;
}

// ============================================================
//  WHEEL OF FORTUNE
// ============================================================
const wheelCanvas = document.getElementById("wheelCanvas");
const wheelCtx = wheelCanvas.getContext("2d");
const wheelResult = document.getElementById("wheelResult");
const spinBtn = document.getElementById("spinWheelBtn");
const resetBtn = document.getElementById("resetWheelBtn");
const wheelHistory = document.getElementById("wheelHistory");
const spinCountEl = document.getElementById("spinCount");
const totalWonEl = document.getElementById("totalWon");
const wheelSpinsBadge = document.getElementById("wheelSpinsBadge");
const wheelToggleBtn = document.getElementById("wheelToggleBtn");
const wheelContent = document.getElementById("wheelContent");

const wheelSegments = [
  { label: "💰 300", value: 300, color: "#e74c3c", emoji: "🪙" },
  { label: "💰 500", value: 500, color: "#f39c12", emoji: "💎" },
  { label: "💰 600", value: 600, color: "#2ecc71", emoji: "⭐" },
  { label: "💰 1000", value: 1000, color: "#3498db", emoji: "🏆" },
  { label: "💰 2000", value: 2000, color: "#9b59b6", emoji: "👑" },
];

let wheelRotation = 0;
let isSpinning = false;
let wheelHistoryList = [];
let spinCount = 0;
let totalWon = 0;
const MAX_SPINS = 999;
const SPIN_COST = 999;
const MIN_COINS_TO_ACTIVATE = 600;

let wheelOpen = false;
wheelToggleBtn.addEventListener("click", function () {
  wheelOpen = !wheelOpen;
  wheelContent.classList.toggle("open", wheelOpen);
  this.innerHTML = wheelOpen
    ? '🔼 <span data-i18n="close">Close</span>'
    : '🔽 <span data-i18n="open">Open</span>';
  updateAllTexts();
});

function drawWheel(rotation) {
  const centerX = wheelCanvas.width / 2;
  const centerY = wheelCanvas.height / 2;
  const radius = Math.min(wheelCanvas.width, wheelCanvas.height) / 2 - 10;
  const segmentAngle = (Math.PI * 2) / wheelSegments.length;

  wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

  wheelCtx.shadowColor = "rgba(255,215,0,0.2)";
  wheelCtx.shadowBlur = 30;

  wheelSegments.forEach((segment, i) => {
    const startAngle = i * segmentAngle + rotation;
    const endAngle = startAngle + segmentAngle;

    wheelCtx.beginPath();
    wheelCtx.moveTo(centerX, centerY);
    wheelCtx.arc(centerX, centerY, radius, startAngle, endAngle);
    wheelCtx.closePath();

    const grad = wheelCtx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius,
    );
    grad.addColorStop(0, lightenWheelColor(segment.color, 40));
    grad.addColorStop(1, segment.color);
    wheelCtx.fillStyle = grad;
    wheelCtx.fill();

    wheelCtx.strokeStyle = "rgba(255,255,255,0.2)";
    wheelCtx.lineWidth = 2;
    wheelCtx.stroke();

    wheelCtx.shadowBlur = 0;
    const midAngle = startAngle + segmentAngle / 2;
    const textRadius = radius * 0.7;
    const x = centerX + Math.cos(midAngle) * textRadius;
    const y = centerY + Math.sin(midAngle) * textRadius;

    wheelCtx.save();
    wheelCtx.translate(x, y);
    wheelCtx.rotate(midAngle + (midAngle > Math.PI / 2 ? Math.PI : 0));
    wheelCtx.textAlign = "center";
    wheelCtx.textBaseline = "middle";
    wheelCtx.fillStyle = "#fff";
    wheelCtx.font = 'bold 20px "Segoe UI", sans-serif';
    wheelCtx.shadowColor = "rgba(0,0,0,0.5)";
    wheelCtx.shadowBlur = 10;

    wheelCtx.font = '28px "Segoe UI Emoji", sans-serif';
    wheelCtx.fillText(segment.emoji, 0, -18);
    wheelCtx.font = 'bold 16px "Segoe UI", sans-serif';
    wheelCtx.fillStyle = "#fff";
    wheelCtx.shadowBlur = 8;
    wheelCtx.fillText(segment.label, 0, 18);
    wheelCtx.restore();
  });

  wheelCtx.shadowBlur = 0;
  const innerGrad = wheelCtx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    20,
  );
  innerGrad.addColorStop(0, "#ffd700");
  innerGrad.addColorStop(1, "#f39c12");
  wheelCtx.beginPath();
  wheelCtx.arc(centerX, centerY, 20, 0, Math.PI * 2);
  wheelCtx.fillStyle = innerGrad;
  wheelCtx.fill();
  wheelCtx.strokeStyle = "#fff";
  wheelCtx.lineWidth = 3;
  wheelCtx.stroke();

  wheelCtx.shadowBlur = 0;
  wheelCtx.beginPath();
  wheelCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  wheelCtx.strokeStyle = "rgba(255,215,0,0.3)";
  wheelCtx.lineWidth = 3;
  wheelCtx.stroke();
}

function lightenWheelColor(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, (num >> 16) + amt);
  const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
  const B = Math.min(255, (num & 0x0000ff) + amt);
  return `#${((1 << 24) | (R << 16) | (G << 8) | B).toString(16).slice(1)}`;
}

function getWinningSegment(rotation) {
  const segmentAngle = (Math.PI * 2) / wheelSegments.length;
  const pointerAngle = -Math.PI / 2;
  let rawAngle = (pointerAngle - rotation) % (Math.PI * 2);
  if (rawAngle < 0) rawAngle += Math.PI * 2;
  const index = Math.floor(rawAngle / segmentAngle);
  return index % wheelSegments.length;
}

function canAffordSpin() {
  return totalCoins >= SPIN_COST;
}

function isSpinButtonActive() {
  return totalCoins >= MIN_COINS_TO_ACTIVATE;
}

function updateSpinButtonState() {
  const remaining = MAX_SPINS - spinCount;
  const hasEnoughCoins = canAffordSpin();
  const canActivate = isSpinButtonActive();

  wheelSpinsBadge.textContent = `🔄 ${remaining} spins left | 💰 ${totalCoins} coins`;

  if (remaining <= 0) {
    spinBtn.disabled = true;
    spinBtn.innerHTML = "⛔ Max Spins Reached!";
    spinBtn.style.opacity = "0.5";
    return;
  }

  if (!canActivate) {
    spinBtn.disabled = true;
    spinBtn.innerHTML = `🔒 Need ${MIN_COINS_TO_ACTIVATE} coins (you have ${totalCoins})`;
    spinBtn.style.opacity = "0.5";
    return;
  }

  if (!hasEnoughCoins) {
    spinBtn.disabled = true;
    spinBtn.innerHTML = `❌ Need ${SPIN_COST} coins (you have ${totalCoins})`;
    spinBtn.style.opacity = "0.5";
    return;
  }

  spinBtn.disabled = false;
  spinBtn.innerHTML = `🎰 Spin (${SPIN_COST}💰)`;
  spinBtn.style.opacity = "1";
}

function updateWheelStats() {
  spinCountEl.textContent = spinCount;
  totalWonEl.textContent = totalWon;
  updateSpinButtonState();
}

function spinWheel() {
  if (isSpinning) return;
  if (spinCount >= MAX_SPINS) {
    showToast("⛔ You have reached the maximum spins! (999)", "error");
    return;
  }

  if (!canAffordSpin()) {
    showToast(`❌ Need ${SPIN_COST} coins! (you have ${totalCoins})`, "error");
    return;
  }

  totalCoins -= SPIN_COST;
  updateScore();
  updateAllDisplays();
  saveProgress();

  isSpinning = true;
  spinBtn.disabled = true;
  wheelResult.innerHTML = '🔄 <span data-i18n="spinning">Spinning...</span>';

  const spins = 5 + Math.random() * 5;
  const targetRotation = spins * Math.PI * 2 + Math.random() * Math.PI * 2;
  const startRotation = wheelRotation;
  const duration = 3000 + Math.random() * 1000;
  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentRotation = startRotation + targetRotation * eased;
    wheelRotation = currentRotation;
    drawWheel(currentRotation);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      wheelRotation = currentRotation;
      const winIndex = getWinningSegment(wheelRotation);
      const winAmount = wheelSegments[winIndex].value;
      const winEmoji = wheelSegments[winIndex].emoji;

      spinCount++;
      totalWon += winAmount;
      totalCoins += winAmount;
      updateScore();
      updateAllDisplays();
      saveProgress();
      updateWheelStats();

      const msg = `${winEmoji} You won ${winAmount} coins! 🎉`;
      wheelResult.innerHTML = `<span class="highlight">${msg}</span>`;
      showToast(
        `🎉 Won ${winAmount} coins! (${spinCount}/${MAX_SPINS})`,
        "success",
      );

      wheelHistoryList.push(winAmount);
      updateWheelHistory();

      isSpinning = false;
      updateSpinButtonState();
    }
  }
  animate();
}

function updateWheelHistory() {
  const lastFive = wheelHistoryList.slice(-10).reverse();
  wheelHistory.innerHTML = lastFive
    .map((amount) => `<span class="badge">💰 ${amount}</span>`)
    .join("");
}

function resetWheelHistory() {
  if (spinCount > 0) {
    if (
      !confirm(
        "Are you sure you want to reset wheel history? Your coins will not be affected.",
      )
    )
      return;
  }
  wheelHistoryList = [];
  updateWheelHistory();
  wheelResult.innerHTML =
    '💰 <span data-i18n="spin_to_win">Spin to win!</span>';
  showToast("🔄 History cleared!", "success");
}

spinBtn.addEventListener("click", spinWheel);
resetBtn.addEventListener("click", resetWheelHistory);
drawWheel(0);
updateWheelStats();

// ============================================================
//  SAVE & LOAD
// ============================================================
function saveProgress() {
  try {
    const data = {
      coins: totalCoins,
      ownedHats: ownedHats,
      equippedHat: equippedHat,
      ownedGlasses: ownedGlasses,
      equippedGlasses: equippedGlasses,
      lives: currentLives,
      lang: currentLang,
      bgColor: selectedBgColor.code,
      snakeShape: selectedSnakeShape,
      screenMode: selectedScreenMode,
      wheelHistory: wheelHistoryList,
      spinCount: spinCount,
      totalWon: totalWon,
    };
    localStorage.setItem("snakeGameData", JSON.stringify(data));
  } catch (e) {}
}

function loadProgress() {
  try {
    const saved = localStorage.getItem("snakeGameData");
    if (!saved) return false;
    const data = JSON.parse(saved);

    if (data.coins !== undefined) totalCoins = data.coins;
    if (data.ownedHats) ownedHats = data.ownedHats;
    if (data.equippedHat) equippedHat = data.equippedHat;
    if (data.ownedGlasses) ownedGlasses = data.ownedGlasses;
    if (data.equippedGlasses) equippedGlasses = data.equippedGlasses;
    if (data.lives !== undefined) currentLives = data.lives;
    if (data.lang && LANGUAGES[data.lang]) {
      currentLang = data.lang;
      document
        .querySelectorAll(".lang-btn")
        .forEach((b) =>
          b.classList.toggle("active", b.dataset.lang === data.lang),
        );
    }
    if (data.bgColor) {
      const found = BG_COLORS.find((c) => c.code === data.bgColor);
      if (found) selectedBgColor = found;
    }
    if (data.snakeShape)
      selectedSnakeShape = ["square", "diamond", "circle", "triangle"].includes(
        data.snakeShape,
      )
        ? data.snakeShape
        : "square";
    // حالت شروع همیشه دیفالت سبز باشد؛ انتخاب شب/روز فقط در همان اجرای بازی اعمال می‌شود.
    selectedScreenMode = "default";
    if (data.wheelHistory) wheelHistoryList = data.wheelHistory;
    if (data.spinCount !== undefined) spinCount = data.spinCount;
    if (data.totalWon !== undefined) totalWon = data.totalWon;

    if (!ownedHats.includes("none")) ownedHats.push("none");
    if (!ownedGlasses.includes("none_g")) ownedGlasses.push("none_g");
    return true;
  } catch (e) {
    return false;
  }
}

function applyScreenMode() {
  const mode = SCREEN_MODES[selectedScreenMode] || SCREEN_MODES.default;
  document.body.classList.remove(
    "screen-default",
    "screen-day",
    "screen-night",
  );
  document.body.classList.add("screen-" + (mode.page || "default"));
  // برای دیفالت، پس‌زمینهٔ بازی هم سبز باشد؛ روز سفید و شب کاملاً تیره.
  if (selectedScreenMode === "default")
    selectedBgColor = { name: "Default Green", code: "#18351f" };
  if (selectedScreenMode === "day")
    selectedBgColor = { name: "Day White", code: "#ffffff" };
  if (selectedScreenMode === "night")
    selectedBgColor = { name: "Night Dark", code: "#05070d" };
}

function buildColorOptions() {
  applyScreenMode();
  const picker = document.getElementById("colorPicker");
  picker.innerHTML = "";
  ALL_COLORS.forEach((color, index) => {
    const div = document.createElement("div");
    div.className = "color-option" + (index === 0 ? " active" : "");
    if (color.code === "rainbow") {
      div.style.background =
        "linear-gradient(135deg, #e74c3c, #e67e22, #f1c40f, #2ecc71, #3498db, #9b59b6, #fd79a8)";
    } else {
      div.style.background = color.code;
    }
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

  const bgPicker = document.getElementById("bgColorPicker");
  bgPicker.innerHTML = "";
  BG_COLORS.forEach((color, index) => {
    const div = document.createElement("div");
    div.className = "bg-color-option" + (index === 0 ? " active" : "");
    div.style.background = color.code;
    if (color.code === "#ecf0f1" || color.code === "#f1c40f") {
      div.style.border = "3px solid rgba(0,0,0,0.2)";
    }
    div.dataset.index = index;
    div.addEventListener("click", function () {
      document
        .querySelectorAll(".bg-color-option")
        .forEach((el) => el.classList.remove("active"));
      this.classList.add("active");
      selectedBgColor = BG_COLORS[parseInt(this.dataset.index)];
      drawGame();
      saveProgress();
    });
    bgPicker.appendChild(div);
  });
  const bgIndex = BG_COLORS.findIndex((c) => c.code === selectedBgColor.code);
  if (bgIndex >= 0) {
    document.querySelectorAll(".bg-color-option").forEach((el, i) => {
      el.classList.toggle("active", i === bgIndex);
    });
  }

  document.querySelectorAll(".snake-shape-option").forEach((el) => {
    el.classList.toggle("active", el.dataset.shape === selectedSnakeShape);
    el.addEventListener("click", function () {
      selectedSnakeShape = this.dataset.shape;
      document
        .querySelectorAll(".snake-shape-option")
        .forEach((x) => x.classList.remove("active"));
      this.classList.add("active");
      saveProgress();
      drawGame();
    });
  });

  document.querySelectorAll(".screen-mode-btn").forEach((el) => {
    el.classList.toggle("active", el.dataset.screenMode === selectedScreenMode);
    el.addEventListener("click", function () {
      selectedScreenMode = this.dataset.screenMode;
      document
        .querySelectorAll(".screen-mode-btn")
        .forEach((x) => x.classList.remove("active"));
      this.classList.add("active");
      applyScreenMode();
      drawGame();
      saveProgress();
    });
  });
}

// ============================================================
//  PAUSE / RESUME / BACK
// ============================================================
function pauseGame() {
  if (state.gameOver || !state.gameRunning) return;
  state.paused = true;
  if (state.gameLoop) {
    clearInterval(state.gameLoop);
    state.gameLoop = null;
  }
  pauseBtn.classList.add("hidden");
  resumeBtn.classList.remove("hidden");
  drawPauseScreen();
}

function resumeGame() {
  if (state.gameOver || !state.gameRunning) return;
  state.paused = false;
  if (state.gameLoop) clearInterval(state.gameLoop);
  state.gameLoop = setInterval(stepGame, state.speed);
  pauseBtn.classList.remove("hidden");
  resumeBtn.classList.add("hidden");
  drawGame();
}

function backToMenu() {
  if (state.gameLoop) {
    clearInterval(state.gameLoop);
    state.gameLoop = null;
  }
  state.gameRunning = false;
  state.paused = false;
  bgMusic.pause();
  gameScreenEl.style.display = "none";
  gameOverEl.style.display = "none";
  menuEl.style.display = "block";
  pauseBtn.classList.remove("hidden");
  resumeBtn.classList.add("hidden");
  saveProgress();
  document.getElementById("snowContainer").style.opacity = "1";
  setTimeout(createSnowflakes, 200);
}

function drawPauseScreen() {
  const activeScreenMode =
    SCREEN_MODES[selectedScreenMode] || SCREEN_MODES.default;
  ctx.fillStyle = activeScreenMode.code || selectedBgColor.code;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffd700";
  ctx.font = 'bold 60px "Segoe UI", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(255,215,0,0.3)";
  ctx.shadowBlur = 30;
  ctx.fillText("⏸", canvas.width / 2, canvas.height / 2 - 30);
  ctx.font = 'bold 28px "Segoe UI", sans-serif';
  ctx.fillStyle = "#fff";
  ctx.shadowBlur = 10;
  ctx.fillText(t("pause_btn"), canvas.width / 2, canvas.height / 2 + 50);
  ctx.shadowBlur = 0;
}

pauseBtn.addEventListener("click", pauseGame);
resumeBtn.addEventListener("click", resumeGame);
backMenuBtn.addEventListener("click", function () {
  if (state.gameRunning && !state.gameOver && !state.paused) {
    if (
      confirm(
        "Are you sure you want to go back to menu? Your progress will be saved.",
      )
    ) {
      backToMenu();
    }
  } else {
    backToMenu();
  }
});

// ============================================================
//  DRAWING FUNCTIONS
// ============================================================
function drawAccessories(x, y, size) {
  // ===== کلاه =====
  const hat = HAT_SHOP.find((h) => h.id === equippedHat);
  if (hat && hat.id !== "none") {
    ctx.font = `${size * 0.9}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.shadowColor = "rgba(255,255,255,0.2)";
    ctx.shadowBlur = 15;
    ctx.fillText(hat.emoji, x + size / 2, y - 2);
    ctx.shadowBlur = 0;
  }

  // ===== عینک - دقیقاً روی چشم‌ها =====
  const glasses = GLASSES_SHOP.find((g) => g.id === equippedGlasses);
  if (glasses && glasses.id !== "none_g") {
    // چشم‌ها در حدود 25٪ بالای سلول قرار دارند
    const eyeY = y + size * 0.25;
    const fontSize = size * 0.55;

    ctx.font = `${fontSize}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(255,255,255,0.2)";
    ctx.shadowBlur = 12;

    // برای عینک‌های آفتابی و مطالعه، کمی بزرگتر
    if (glasses.id === "sunglasses" || glasses.id === "reading") {
      ctx.font = `${size * 0.7}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
    }
    ctx.fillText(glasses.emoji, x + size / 2, eyeY + 1);
    ctx.shadowBlur = 0;
  }
}

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
  ctx.fillText("🌌", cx, cy);
  ctx.shadowBlur = 0;
}

function drawDangerZones() {
  for (let dz of dangerZones) {
    const x = dz.x * CELL_SIZE;
    const y = dz.y * CELL_SIZE;
    const size = CELL_SIZE;
    const pulse = 0.8 + 0.2 * Math.sin(Date.now() / 400 + dz.x + dz.y);
    ctx.shadowColor = "#e74c3c";
    ctx.shadowBlur = 25 * pulse;
    ctx.fillStyle = `rgba(231, 76, 60, ${0.2 * pulse})`;
    ctx.beginPath();
    ctx.ellipse(
      x + size / 2,
      y + size / 2,
      (size / 2) * pulse,
      (size / 2) * pulse,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.font = `${size * 0.7}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = `rgba(255, 200, 0, ${0.5 + 0.5 * pulse})`;
    ctx.shadowBlur = 15 * pulse;
    ctx.fillText("⚠️", x + size / 2, y + size / 2);
    ctx.shadowBlur = 0;
  }
}

let smoothRenderRaf = null;
let renderStartTime = performance.now();
let renderDuration = 80;

function beginSmoothRender(previousSnake) {
  state.renderPrevSnake =
    previousSnake || state.snake.map((seg) => ({ ...seg }));
  renderStartTime = performance.now();
  renderDuration = Math.max(90, Math.min(160, state.speed * 0.88));
  if (!smoothRenderRaf)
    smoothRenderRaf = requestAnimationFrame(smoothRenderFrame);
}

function smoothAxis(a, b, max) {
  let start = a;
  let diff = b - start;
  if (Math.abs(diff) > max / 2) start += diff > 0 ? max : -max;
  return start;
}

function getSmoothSnakeSegments() {
  const current = state.snake || [];
  const previous = state.renderPrevSnake || [];
  const p = Math.min(1, (performance.now() - renderStartTime) / renderDuration);
  const eased = 1 - Math.pow(1 - p, 3);
  return current.map((seg, i) => {
    const prev = previous[i] || seg;
    let x = smoothAxis(prev.x, seg.x, state.gridSize);
    let y = smoothAxis(prev.y, seg.y, state.gridSize);
    x += (seg.x - x) * eased;
    y += (seg.y - y) * eased;
    x = ((x % state.gridSize) + state.gridSize) % state.gridSize;
    y = ((y % state.gridSize) + state.gridSize) % state.gridSize;
    return { x, y };
  });
}

function smoothRenderFrame() {
  smoothRenderRaf = null;
  if (
    gameScreenEl.style.display !== "none" &&
    state.gameRunning &&
    !state.paused &&
    !state.gameOver
  ) {
    drawGame();
    if (performance.now() - renderStartTime < renderDuration)
      smoothRenderRaf = requestAnimationFrame(smoothRenderFrame);
  }
}

function drawGame() {
  if (state.paused) {
    drawPauseScreen();
    return;
  }
  const activeScreenMode =
    SCREEN_MODES[selectedScreenMode] || SCREEN_MODES.default;
  const canvasBg = activeScreenMode.code || selectedBgColor.code;
  ctx.fillStyle = canvasBg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const foodEmojis = getFoodEmojis();
  state.foodAnim += 0.04;
  for (let fi = 0; fi < state.food.length; fi++) {
    const f = state.food[fi];
    const cx = f.x * CELL_SIZE + CELL_SIZE / 2;
    const cy = f.y * CELL_SIZE + CELL_SIZE / 2;
    const size = CELL_SIZE;
    const pulse = 0.85 + 0.15 * Math.sin(state.foodAnim + f.x + f.y);
    const emoji = foodEmojis[fi % foodEmojis.length];
    ctx.shadowColor = "#ffd700";
    ctx.shadowBlur = 25 * pulse;
    ctx.font = `${size * 0.85}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, cx, cy + 2);
    ctx.shadowBlur = 0;
  }

  if (state.portalActive) drawPortal();
  drawDangerZones();

  const snakeColor = state.snakeColor;
  const segments = getSmoothSnakeSegments();
  const len = segments.length;
  const size = CELL_SIZE;
  for (let i = 0; i < len; i++) {
    const seg = segments[i];
    const x = seg.x * size;
    const y = seg.y * size;
    const isHead = i === 0;
    let color;
    if (snakeColor === "rainbow") {
      const hue = (i * 20 + Date.now() * 0.02) % 360;
      color = `hsl(${hue}, 80%, 55%)`;
    } else {
      const brightness = 0.9 - (i / len) * 0.3;
      color = lightenColorHex(snakeColor, brightness * 30);
    }
    ctx.shadowColor = snakeColor === "rainbow" ? "#f1c40f" : snakeColor;
    ctx.shadowBlur = isHead ? 25 : 12;
    const pad = 1.5;
    const rectSize = size - pad * 2;
    const radius = 4;
    ctx.beginPath();
    const cx = x + size / 2;
    const cy = y + size / 2;
    const inset = 2.2;
    if (selectedSnakeShape === "circle") {
      ctx.arc(cx, cy, size / 2 - inset, 0, Math.PI * 2);
    } else if (selectedSnakeShape === "diamond") {
      ctx.moveTo(cx, y + inset);
      ctx.lineTo(x + size - inset, cy);
      ctx.lineTo(cx, y + size - inset);
      ctx.lineTo(x + inset, cy);
      ctx.closePath();
    } else if (selectedSnakeShape === "triangle") {
      ctx.moveTo(cx, y + inset);
      ctx.lineTo(x + size - inset, y + size - inset);
      ctx.lineTo(x + inset, y + size - inset);
      ctx.closePath();
    } else {
      const r = Math.min(5, size * 0.18);
      ctx.moveTo(x + pad + r, y + pad);
      ctx.lineTo(x + pad + rectSize - r, y + pad);
      ctx.quadraticCurveTo(
        x + pad + rectSize,
        y + pad,
        x + pad + rectSize,
        y + pad + r,
      );
      ctx.lineTo(x + pad + rectSize, y + pad + rectSize - r);
      ctx.quadraticCurveTo(
        x + pad + rectSize,
        y + pad + rectSize,
        x + pad + rectSize - r,
        y + pad + rectSize,
      );
      ctx.lineTo(x + pad + r, y + pad + rectSize);
      ctx.quadraticCurveTo(
        x + pad,
        y + pad + rectSize,
        x + pad,
        y + pad + rectSize - r,
      );
      ctx.lineTo(x + pad, y + pad + r);
      ctx.quadraticCurveTo(x + pad, y + pad, x + pad + r, y + pad);
      ctx.closePath();
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.shadowBlur = 0;
    if (isHead) {
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1.5;
      const hPad = 2;
      const hSize = size - hPad * 2;
      const hRadius = 5;
      ctx.beginPath();
      ctx.moveTo(x + hPad + hRadius, y + hPad);
      ctx.lineTo(x + hPad + hSize - hRadius, y + hPad);
      ctx.quadraticCurveTo(
        x + hPad + hSize,
        y + hPad,
        x + hPad + hSize,
        y + hPad + hRadius,
      );
      ctx.lineTo(x + hPad + hSize, y + hPad + hSize - hRadius);
      ctx.quadraticCurveTo(
        x + hPad + hSize,
        y + hPad + hSize,
        x + hPad + hSize - hRadius,
        y + hPad + hSize,
      );
      ctx.lineTo(x + hPad + hRadius, y + hPad + hSize);
      ctx.quadraticCurveTo(
        x + hPad,
        y + hPad + hSize,
        x + hPad,
        y + hPad + hSize - hRadius,
      );
      ctx.lineTo(x + hPad, y + hPad + hRadius);
      ctx.quadraticCurveTo(x + hPad, y + hPad, x + hPad + hRadius, y + hPad);
      ctx.closePath();
      ctx.stroke();
      drawAccessories(x, y, size);
      const eyeSize = size * 0.18;
      const d = state.direction;
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "rgba(255,255,255,0.15)";
      ctx.shadowBlur = 6;

      const angle = Math.atan2(d.dy, d.dx);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const eyeDist = size * 0.3;

      const offsets = [
        { x: -eyeDist * 0.6, y: -eyeDist * 0.6 },
        { x: eyeDist * 0.6, y: -eyeDist * 0.6 },
      ];

      for (let oi = 0; oi < offsets.length; oi++) {
        const ox = x + size / 2 + offsets[oi].x * cosA - offsets[oi].y * sinA;
        const oy = y + size / 2 + offsets[oi].x * sinA + offsets[oi].y * cosA;
        const ex = ox - eyeSize / 2;
        const ey = oy - eyeSize / 2;

        ctx.fillStyle = "#fff";
        ctx.shadowBlur = 6;
        ctx.fillRect(ex, ey, eyeSize, eyeSize * 1.2);

        ctx.fillStyle = "#1a1a2e";
        ctx.shadowBlur = 0;
        const pupilX = ex + eyeSize * 0.3 + d.dx * 0.12 * eyeSize;
        const pupilY = ey + eyeSize * 0.2 + d.dy * 0.12 * eyeSize;
        ctx.fillRect(pupilX, pupilY, eyeSize * 0.5, eyeSize * 0.6);

        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillRect(
          pupilX + eyeSize * 0.1,
          pupilY + eyeSize * 0.05,
          eyeSize * 0.15,
          eyeSize * 0.2,
        );
      }
      ctx.shadowBlur = 0;

      // ===== نیش‌های بیشتر، بدون زبان و بدون دهان =====
      const headCx = x + size / 2;
      const headCy = y + size / 2;
      const headAngle = Math.atan2(d.dy, d.dx);

      ctx.save();
      ctx.translate(headCx, headCy);
      ctx.rotate(headAngle);

      // شش نیش سفید کوچک و مرتب
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "rgba(255,255,255,0.65)";
      ctx.shadowBlur = 3;
      const fangXs = [
        size * 0.19,
        size * 0.25,
        size * 0.31,
        size * 0.37,
        size * 0.43,
        size * 0.49,
      ];
      for (let fi = 0; fi < fangXs.length; fi++) {
        const fx = fangXs[fi];
        const fy = fi % 2 === 0 ? size * 0.185 : size * 0.17;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx + size * 0.022, fy + size * 0.105);
        ctx.lineTo(fx + size * 0.044, fy);
        ctx.closePath();
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.restore();
    }
  }
}

function wrapPosition(pos) {
  let newPos = { ...pos };
  if (newPos.x < 0) newPos.x = state.gridSize - 1;
  else if (newPos.x >= state.gridSize) newPos.x = 0;
  if (newPos.y < 0) newPos.y = state.gridSize - 1;
  else if (newPos.y >= state.gridSize) newPos.y = 0;
  return newPos;
}

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
  state.renderPrevSnake = state.snake.map((seg) => ({ ...seg }));
  state.direction = { dx: 1, dy: 0 };
  state.moveBuffer = [];
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
  state.renderPrevSnake = state.snake.map((seg) => ({ ...seg }));
  state.direction = { dx: 1, dy: 0 };
  state.moveBuffer = [];
  state.score = 0;
  state.gameOver = false;
  state.gameRunning = true;
  state.foodAnim = 0;
  state.portal = null;
  state.portalActive = false;
  state.won = false;
  state.respawning = false;
  state.paused = false;
  state.food = [];
  for (let i = 0; i < state.foodCount; i++) state.food.push(spawnFood());
  spawnDangerZones();
  updateFoodCount();
  updatePortalStatus();
  resetLives();
  updateScore();
  saveProgress();
  pauseBtn.classList.remove("hidden");
  resumeBtn.classList.add("hidden");
}

function stepGame() {
  if (state.gameOver || !state.gameRunning || state.respawning || state.paused)
    return;

  if (state.moveBuffer.length > 0) {
    const nextMove = state.moveBuffer.shift();
    const dir = state.direction;
    if (!(nextMove.dx === -dir.dx && nextMove.dy === -dir.dy)) {
      state.direction = nextMove;
    }
    state.moveBuffer = [];
  }

  const previousSnakeForRender = state.snake.map((seg) => ({ ...seg }));
  const head = state.snake[0];
  let newHead = {
    x: head.x + state.direction.dx,
    y: head.y + state.direction.dy,
  };

  newHead = wrapPosition(newHead);

  if (checkDangerZone(newHead)) {
    const gameOver = loseLife();
    if (gameOver) {
      endGame(false);
      return;
    }
    dangerZones = dangerZones.filter(
      (dz) => !(dz.x === newHead.x && dz.y === newHead.y),
    );
    state.respawning = true;
    state.gameRunning = false;
    if (state.gameLoop) {
      clearInterval(state.gameLoop);
      state.gameLoop = null;
    }
    setTimeout(() => {
      respawnSnake();
    }, 300);
    return;
  }
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
      totalCoins += 10;
      updateScore();
      if (state.score >= 100 && !state.portalActive) {
        state.portal = spawnPortal();
        state.portalActive = true;
        updatePortalStatus();
      }
      break;
    }
  }
  if (!ate) state.snake.pop();
  while (state.food.length < state.foodCount) state.food.push(spawnFood());
  while (dangerZones.length < 2 + Math.floor(state.gridSize / 10)) {
    let pos,
      attempts = 0;
    do {
      pos = randomPos();
      attempts++;
    } while (isOccupied(pos, true) && attempts < 300);
    if (attempts < 300) dangerZones.push(pos);
  }
  updateFoodCount();
  beginSmoothRender(previousSnakeForRender);
  drawGame();
}

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
  setTimeout(() => {
    respawnSnake();
  }, 300);
}

function endGame(won = false) {
  if (state.gameOver) return;
  state.gameOver = true;
  state.gameRunning = false;
  state.won = won;
  if (state.gameLoop) {
    clearInterval(state.gameLoop);
    state.gameLoop = null;
  }
  bgMusic.pause();

  if (won) {
    resultIcon.className = "icon win";
    resultIcon.textContent = "🏆";
    resultTitle.className = "win";
    resultTitle.textContent = t("you_won");
  } else {
    resultIcon.className = "icon lose";
    resultIcon.textContent = "☠️";
    resultTitle.className = "lose";
    resultTitle.textContent = t("game_over");
  }
  finalScoreEl.textContent = state.score;
  saveProgress();
  gameScreenEl.style.display = "none";
  gameOverEl.style.display = "block";
  document.getElementById("snowContainer").style.opacity = "1";
}

// ============================================================
//  START GAME
// ============================================================
function startGame() {
  const name = nameInput.value.trim() || "Player";
  state.playerName = name;
  playerNameDisplay.textContent = name;

  document.getElementById("snowContainer").style.opacity = "0.15";

  menuEl.style.display = "none";
  gameOverEl.style.display = "none";
  gameScreenEl.style.display = "block";

  initGame();
  beginSmoothRender(state.snake.map((seg) => ({ ...seg })));
  drawGame();
  playMusicIfLoaded();

  showCountdown(() => {
    if (state.gameLoop) clearInterval(state.gameLoop);
    state.gameLoop = setInterval(stepGame, state.speed);
    playMusicIfLoaded();
    updateAllDisplays();
    updateHeartsDisplay();
  });
}

function restartGameWithCountdown() {
  if (state.gameLoop) {
    clearInterval(state.gameLoop);
    state.gameLoop = null;
  }
  state.gameRunning = false;
  state.paused = false;
  state.gameOver = false;

  gameOverEl.style.display = "none";
  gameScreenEl.style.display = "block";

  initGame();
  beginSmoothRender(state.snake.map((seg) => ({ ...seg })));
  drawGame();
  playMusicIfLoaded();

  showCountdown(() => {
    if (state.gameLoop) clearInterval(state.gameLoop);
    state.gameLoop = setInterval(stepGame, state.speed);
    updateAllDisplays();
    updateHeartsDisplay();
    playMusicIfLoaded();
  });
}

restartGameBtn.addEventListener("click", function () {
  if (state.gameRunning && !state.gameOver && !state.paused) {
    if (confirm("Restart game?")) {
      restartGameWithCountdown();
    }
  } else {
    restartGameWithCountdown();
  }
});

restartBtn.addEventListener("click", function () {
  restartGameWithCountdown();
});

playBtn.addEventListener("click", startGame);
menuBtn.addEventListener("click", backToMenu);

// ============================================================
//  DIRECTION CONTROLS - 8 جهته دایره‌ای
// ============================================================
function changeDirection(dx, dy) {
  if (!state.gameRunning || state.gameOver || state.respawning || state.paused)
    return;
  const dir = state.direction;

  if (dx === -dir.dx && dy === -dir.dy) return;

  state.moveBuffer = [{ dx, dy }];
}

const directionMap = {
  btnUp: { dx: 0, dy: -1 },
  btnDown: { dx: 0, dy: 1 },
  btnLeft: { dx: -1, dy: 0 },
  btnRight: { dx: 1, dy: 0 },
  btnUpLeft: { dx: -1, dy: -1 },
  btnUpRight: { dx: 1, dy: -1 },
  btnDownLeft: { dx: -1, dy: 1 },
  btnDownRight: { dx: 1, dy: 1 },
};

function setupDirectionButton(id, dx, dy) {
  const el = document.getElementById(id);
  if (!el) return;

  let intervalId = null;

  const action = (e) => {
    e.preventDefault();
    changeDirection(dx, dy);
  };

  el.addEventListener("click", action);

  el.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      changeDirection(dx, dy);
      clearInterval(intervalId);
      intervalId = setInterval(() => changeDirection(dx, dy), 100);
    },
    { passive: false },
  );

  el.addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      clearInterval(intervalId);
      intervalId = null;
    },
    { passive: false },
  );

  el.addEventListener("touchcancel", () => {
    clearInterval(intervalId);
    intervalId = null;
  });

  el.addEventListener("mousedown", () => {
    changeDirection(dx, dy);
    clearInterval(intervalId);
    intervalId = setInterval(() => changeDirection(dx, dy), 100);
  });

  el.addEventListener("mouseup", () => {
    clearInterval(intervalId);
    intervalId = null;
  });

  el.addEventListener("mouseleave", () => {
    clearInterval(intervalId);
    intervalId = null;
  });
}

for (const [id, dir] of Object.entries(directionMap)) {
  setupDirectionButton(id, dir.dx, dir.dy);
}

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (
    [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      " ",
      "Space",
      "r",
      "R",
      "w",
      "W",
      "a",
      "A",
      "s",
      "S",
      "d",
      "D",
      "q",
      "Q",
      "e",
      "E",
      "z",
      "Z",
      "x",
      "X",
      "c",
      "C",
    ].includes(key)
  ) {
    e.preventDefault();
  }

  if (key === "ArrowUp") {
    changeDirection(0, -1);
  } else if (key === "ArrowDown") {
    changeDirection(0, 1);
  } else if (key === "ArrowLeft") {
    changeDirection(-1, 0);
  } else if (key === "ArrowRight") {
    changeDirection(1, 0);
  } else if (key === "w" || key === "W") {
    changeDirection(0, -1);
  } else if (key === "s" || key === "S") {
    changeDirection(0, 1);
  } else if (key === "a" || key === "A") {
    changeDirection(-1, 0);
  } else if (key === "d" || key === "D") {
    changeDirection(1, 0);
  } else if (key === "q" || key === "Q") {
    changeDirection(-1, -1);
  } else if (key === "e" || key === "E") {
    changeDirection(1, -1);
  } else if (key === "z" || key === "Z") {
    changeDirection(-1, 1);
  } else if (key === "x" || key === "X") {
    changeDirection(1, 1);
  } else if (key === " " || key === "Space") {
    if (state.paused) resumeGame();
    else if (state.gameRunning && !state.gameOver) pauseGame();
  } else if (key === "r" || key === "R") {
    if (state.gameRunning && !state.gameOver) {
      if (confirm("Restart game?")) restartGameWithCountdown();
    } else if (state.gameOver) {
      restartGameWithCountdown();
    }
  }
});

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") startGame();
});
speedBtn.addEventListener("click", () => {
  currentSpeedIndex = (currentSpeedIndex + 1) % SPEED_LEVELS.length;
  updateSpeedDisplay();
});

// ============================================================
//  SIDEBAR
// ============================================================
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

// ============================================================
//  INIT
// ============================================================
loadProgress();
updateWheelHistory();
updateWheelStats();
buildColorOptions();
updateAllTexts();
updateAllDisplays();
updateHeartsDisplay();
updateSpeedDisplay();

console.log("🐍 Snake Game Mega Original - 8 Direction Control!");
console.log("🎮 Controls:");
console.log("   ⬆️⬇️⬅️➡️  - Arrow keys or WASD");
console.log("   ↖️↗️↙️↘️  - Q/E/Z/X for diagonal movement");
console.log("⏸ Space to pause/resume");
console.log("🔄 R to restart");
