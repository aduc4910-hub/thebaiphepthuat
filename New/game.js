/**
 * POCKET QUEST: RELIC RUSH
 * Game Logic, Synthesized Web Audio & Interactive Controller
 */

// ==========================================
// 1. DATA: HEROES & RELICS DEFINITIONS (SVGs)
// ==========================================
const HEROES_DATA = {
  knight: {
    name: "The Knight",
    vietName: "Hiệp Sĩ Quả Cảm",
    line: "A small sword. Unshakeable courage.",
    vietLine: "Thanh kiếm nhỏ cùng lòng quả cảm sắt đá.",
    relicName: "Holy Blade",
    color: "#f5b342",
    svg: `<svg viewBox="0 0 100 120" class="hero-svg">
      <defs>
        <linearGradient id="kg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd166"/>
          <stop offset="100%" stop-color="#d49b25"/>
        </linearGradient>
      </defs>
      <!-- Knight Helmet / Shield Silhouette -->
      <circle cx="50" cy="50" r="42" fill="#1b152b" stroke="#f5b342" stroke-width="2.5"/>
      <path d="M50 18 L75 35 V62 C75 78 50 88 50 88 C50 88 25 78 25 62 V35 Z" fill="url(#kg-grad)" opacity="0.9"/>
      <path d="M47 38 H53 V72 H47 Z M36 48 H64 V54 H36 Z" fill="#130f1e"/>
      <circle cx="50" cy="51" r="5" fill="#f5b342"/>
      <polygon points="50,10 54,20 50,17 46,20" fill="#ffd166"/>
    </svg>`
  },
  ranger: {
    name: "The Ranger",
    vietName: "Thiện Xạ Rừng Xanh",
    line: "Keen eye. Silent arrows in the mist.",
    vietLine: "Đôi mắt tinh tường. Mũi tên lặng lẽ vút trong sương.",
    relicName: "Wind Bow",
    color: "#2ec4b6",
    svg: `<svg viewBox="0 0 100 120" class="hero-svg">
      <defs>
        <linearGradient id="rg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2ec4b6"/>
          <stop offset="100%" stop-color="#1b7870"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="#132422" stroke="#2ec4b6" stroke-width="2.5"/>
      <!-- Ranger Hood & Quiver -->
      <path d="M50 20 C32 20 28 42 28 58 C28 74 38 82 50 82 C62 82 72 74 72 58 C72 42 68 20 50 20 Z" fill="url(#rg-grad)"/>
      <path d="M40 46 Q50 36 60 46 Q50 56 40 46 Z" fill="#081413"/>
      <circle cx="46" cy="46" r="2.5" fill="#a7ffeb"/>
      <circle cx="54" cy="46" r="2.5" fill="#a7ffeb"/>
      <path d="M46 64 L54 64" stroke="#081413" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  bard: {
    name: "The Bard",
    vietName: "Thi Ca Huyền Bí",
    line: "A silver lute. Melodies that stir the ancients.",
    vietLine: "Cung đàn bạc khơi dậy những câu chuyện cổ tích.",
    relicName: "Golden Lyre",
    color: "#c77dff",
    svg: `<svg viewBox="0 0 100 120" class="hero-svg">
      <defs>
        <linearGradient id="bd-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e0aaff"/>
          <stop offset="100%" stop-color="#7b2cbf"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="#20122e" stroke="#c77dff" stroke-width="2.5"/>
      <!-- Bard Cap with Feather -->
      <path d="M26 50 C26 34 38 28 50 28 C64 28 74 34 74 50 C74 58 64 62 50 62 C36 62 26 58 26 50 Z" fill="url(#bd-grad)"/>
      <path d="M56 26 Q72 12 78 6 Q74 22 66 28 Z" fill="#f5b342"/>
      <path d="M38 68 Q50 78 62 68" stroke="#e0aaff" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="56" r="3" fill="#ffd166"/>
    </svg>`
  },
  paladin: {
    name: "The Paladin",
    vietName: "Hiệp Sĩ Ánh Sáng",
    line: "Sunlit shield. Unbreakable devotion.",
    vietLine: "Khiên mặt trời rực rỡ và đức tin bất diệt.",
    relicName: "Sun Aegis",
    color: "#ffd166",
    svg: `<svg viewBox="0 0 100 120" class="hero-svg">
      <defs>
        <linearGradient id="pl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#ffd166"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="#2b2413" stroke="#ffd166" stroke-width="2.5"/>
      <!-- Sun Halo & Sacred Cross -->
      <circle cx="50" cy="50" r="28" fill="none" stroke="url(#pl-grad)" stroke-width="3" stroke-dasharray="8 4"/>
      <circle cx="50" cy="50" r="14" fill="#ffd166"/>
      <polygon points="50,22 53,32 63,32 55,38 58,48 50,42 42,48 45,38 37,32 47,32" fill="#ffffff"/>
    </svg>`
  },
  mage: {
    name: "The Mage",
    vietName: "Pháp Sư Tối Thượng",
    line: "Starlight orb. Mastery over arcane flames.",
    vietLine: "Quả cầu tinh tú. Bậc thầy nguyên tố và ngọn lửa bí thuật.",
    relicName: "Arcane Sphere",
    color: "#48cae4",
    svg: `<svg viewBox="0 0 100 120" class="hero-svg">
      <defs>
        <linearGradient id="mg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#90e0ef"/>
          <stop offset="100%" stop-color="#0077b6"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="#0d2133" stroke="#48cae4" stroke-width="2.5"/>
      <!-- Wizard Hat & Mystic Rune Eye -->
      <path d="M50 12 L72 65 H28 Z" fill="url(#mg-grad)"/>
      <ellipse cx="50" cy="65" rx="30" ry="7" fill="#03045e"/>
      <circle cx="50" cy="46" r="6" fill="#caf0f8"/>
      <polygon points="50,34 52,40 58,40 53,44 55,50 50,46 45,50 47,44 42,40 48,40" fill="#ffd166"/>
    </svg>`
  },
  rogue: {
    name: "The Rogue",
    vietName: "Sát Thủ Bóng Đêm",
    line: "Twin shadow daggers. Steps like a whisper.",
    vietLine: "Song đoản kiếm bóng đêm. Bước chân êm như tiếng thở dài.",
    relicName: "Shadow Fang",
    color: "#ff4d6d",
    svg: `<svg viewBox="0 0 100 120" class="hero-svg">
      <defs>
        <linearGradient id="rg2-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff758f"/>
          <stop offset="100%" stop-color="#a4133c"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="#280f19" stroke="#ff4d6d" stroke-width="2.5"/>
      <!-- Mask & Dual Dagger Crossing -->
      <path d="M28 36 C28 36 38 28 50 28 C62 28 72 36 72 36 L66 64 C66 74 50 82 50 82 C50 82 34 74 34 64 Z" fill="url(#rg2-grad)"/>
      <!-- Glowing Rogue Eyes -->
      <polygon points="38,44 46,46 44,49 36,46" fill="#fff"/>
      <polygon points="62,44 54,46 56,49 64,46" fill="#fff"/>
      <line x1="32" y1="68" x2="68" y2="68" stroke="#ff4d6d" stroke-width="2"/>
    </svg>`
  }
};

const RELIC_CARDS = [
  {
    id: "blade",
    heroKey: "knight",
    name: "Holy Blade",
    icon: `<svg viewBox="0 0 60 60" class="pq-card-icon">
      <path d="M30 6 L35 14 L33 42 L30 46 L27 42 L25 14 Z" fill="#ffd166" stroke="#fff" stroke-width="1"/>
      <path d="M20 42 H40 V45 H20 Z" fill="#f5b342"/>
      <circle cx="30" cy="52" r="3.5" fill="#e63946"/>
      <path d="M29 16 L31 16 L31 38 L29 38 Z" fill="#fff" opacity="0.8"/>
    </svg>`
  },
  {
    id: "bow",
    heroKey: "ranger",
    name: "Wind Bow",
    icon: `<svg viewBox="0 0 60 60" class="pq-card-icon">
      <path d="M18 10 Q46 30 18 50" fill="none" stroke="#2ec4b6" stroke-width="3" stroke-linecap="round"/>
      <line x1="18" y1="10" x2="18" y2="50" stroke="#a7ffeb" stroke-width="1.5" stroke-dasharray="2 2"/>
      <line x1="14" y1="30" x2="44" y2="30" stroke="#ffd166" stroke-width="2"/>
      <polygon points="44,30 38,26 40,30 38,34" fill="#ffd166"/>
    </svg>`
  },
  {
    id: "lyre",
    heroKey: "bard",
    name: "Golden Lyre",
    icon: `<svg viewBox="0 0 60 60" class="pq-card-icon">
      <path d="M18 16 Q18 46 30 46 Q42 46 42 16" fill="none" stroke="#e0aaff" stroke-width="3"/>
      <path d="M15 16 H45" stroke="#f5b342" stroke-width="3" stroke-linecap="round"/>
      <line x1="24" y1="16" x2="24" y2="44" stroke="#ffd166" stroke-width="1.2"/>
      <line x1="30" y1="16" x2="30" y2="46" stroke="#ffd166" stroke-width="1.2"/>
      <line x1="36" y1="16" x2="36" y2="44" stroke="#ffd166" stroke-width="1.2"/>
    </svg>`
  },
  {
    id: "shield",
    heroKey: "paladin",
    name: "Sun Aegis",
    icon: `<svg viewBox="0 0 60 60" class="pq-card-icon">
      <path d="M30 10 L48 18 V34 C48 44 30 52 30 52 C30 52 12 44 12 34 V18 Z" fill="#ffd166" stroke="#fff" stroke-width="1.5"/>
      <circle cx="30" cy="30" r="9" fill="#e76f51"/>
      <circle cx="30" cy="30" r="5" fill="#fff"/>
    </svg>`
  },
  {
    id: "orb",
    heroKey: "mage",
    name: "Arcane Sphere",
    icon: `<svg viewBox="0 0 60 60" class="pq-card-icon">
      <circle cx="30" cy="30" r="16" fill="#0077b6" stroke="#48cae4" stroke-width="2"/>
      <ellipse cx="30" cy="30" rx="24" ry="7" fill="none" stroke="#90e0ef" stroke-width="1.5" transform="rotate(-25 30 30)"/>
      <circle cx="26" cy="25" r="4" fill="#ffffff" opacity="0.8"/>
    </svg>`
  },
  {
    id: "dagger",
    heroKey: "rogue",
    name: "Shadow Fang",
    icon: `<svg viewBox="0 0 60 60" class="pq-card-icon">
      <path d="M22 10 L38 26 L34 32 L20 20 L16 12 Z" fill="#ff4d6d" stroke="#fff" stroke-width="1"/>
      <line x1="34" y1="32" x2="46" y2="44" stroke="#f5b342" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="48" cy="46" r="3" fill="#ff758f"/>
    </svg>`
  }
];

// Card Back Rune SVG
const CARD_BACK_RUNE = `<svg viewBox="0 0 40 40" class="pq-card-back-rune">
  <circle cx="20" cy="20" r="16" fill="none" stroke="#c77dff" stroke-width="1.5" stroke-dasharray="3 3"/>
  <polygon points="20,8 24,16 32,20 24,24 20,32 16,24 8,20 16,16" fill="#f5b342"/>
  <circle cx="20" cy="20" r="3" fill="#ffffff"/>
</svg>`;

// ==========================================
// 2. SYNTHESIZED WEB AUDIO ENGINE
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playFlip() {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(560, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  playMatch(combo = 1) {
    if (!this.enabled) return;
    this.init();
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const baseFreq = notes[Math.min(combo - 1, notes.length - 1)];

      [0, 0.06, 0.12].forEach((offset, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(baseFreq * (1 + idx * 0.25), this.ctx.currentTime + offset);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + offset + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + offset);
        osc.stop(this.ctx.currentTime + offset + 0.38);
      });
    } catch (e) {}
  }

  playMismatch() {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch (e) {}
  }

  playStart() {
    if (!this.enabled) return;
    this.init();
    try {
      [392, 523.25, 659.25].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.09);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.09 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.09);
        osc.stop(this.ctx.currentTime + i * 0.09 + 0.28);
      });
    } catch (e) {}
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    try {
      const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.55);
      });
    } catch (e) {}
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }
}

const sfx = new SoundFX();

// ==========================================
// 3. GAME ENGINE CLASS
// ==========================================
class PocketQuestGame {
  constructor(containerEl) {
    this.container = containerEl;
    this.currentHero = "knight";
    this.timer = 30;
    this.timerInterval = null;
    this.state = "IDLE"; // IDLE, PEEK, PLAYING, ENDED
    
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.totalPairs = 6;
    
    this.score = 0;
    this.combo = 1;
    this.highestCombo = 1;
    this.bestScore = parseInt(localStorage.getItem("pq_relic_best") || "0", 10);
    
    this.cacheDom();
    this.bindEvents();
    this.updateChampionDisplay();
    this.updateBestScoreDisplay();
  }

  cacheDom() {
    this.board = this.container.querySelector("#pq-board");
    this.phaseEl = this.container.querySelector("#pq-phase");
    this.timeEl = this.container.querySelector("#pq-time");
    this.timeFill = this.container.querySelector("#pq-time-fill");
    this.scoreEl = this.container.querySelector("#pq-score");
    this.comboEl = this.container.querySelector("#pq-combo");
    this.comboDots = this.container.querySelectorAll("#pq-combo-dots i");
    this.pairCountEl = this.container.querySelector("#pq-pair-count");
    this.pairMarks = this.container.querySelectorAll("#pq-pair-marks i");
    this.noteEl = this.container.querySelector("#pq-note");
    this.startBtn = this.container.querySelector("#pq-start");
    this.againBtn = this.container.querySelector("#pq-again");
    this.resultModal = this.container.querySelector("#pq-result");
    this.resultLabel = this.container.querySelector("#pq-result-label");
    this.resultTitle = this.container.querySelector("#pq-result-title");
    this.resultScore = this.container.querySelector("#pq-result-score");
    this.resultDetail = this.container.querySelector("#pq-result-detail");
    this.bestEl = this.container.querySelector("#pq-best");
    
    this.championName = this.container.querySelector("#pq-champion-name");
    this.championLine = this.container.querySelector("#pq-champion-line");
    this.championSvg = this.container.querySelector(".pq-selected-hero");
    this.heroButtons = this.container.querySelectorAll(".pq-hero");
  }

  bindEvents() {
    // Hero selector buttons
    this.heroButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        if (this.state === "PLAYING" || this.state === "PEEK") return;
        const heroKey = btn.dataset.hero;
        if (heroKey && HEROES_DATA[heroKey]) {
          this.currentHero = heroKey;
          this.heroButtons.forEach(b => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
          this.updateChampionDisplay();
          sfx.playFlip();
        }
      });
    });

    // Start Button
    if (this.startBtn) {
      this.startBtn.addEventListener("click", () => this.startRound());
    }

    // Play Again Button
    if (this.againBtn) {
      this.againBtn.addEventListener("click", () => {
        this.resultModal.hidden = true;
        this.startRound();
      });
    }
  }

  updateChampionDisplay() {
    const hero = HEROES_DATA[this.currentHero];
    if (!hero) return;
    if (this.championName) this.championName.textContent = hero.name;
    if (this.championLine) this.championLine.textContent = hero.line;
    if (this.championSvg) {
      this.championSvg.innerHTML = hero.svg;
      this.championSvg.setAttribute("aria-label", `Your champion: ${hero.name}`);
    }
  }

  updateBestScoreDisplay() {
    if (this.bestEl) {
      this.bestEl.textContent = `Personal best: ${this.bestScore} · Saved on this device`;
    }
  }

  generateCards() {
    // 6 pairs = 12 cards
    const deck = [];
    RELIC_CARDS.forEach(relic => {
      deck.push({ ...relic, uid: relic.id + "_1" });
      deck.push({ ...relic, uid: relic.id + "_2" });
    });

    // Fisher-Yates Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    this.cards = deck;
    this.renderBoard();
  }

  renderBoard() {
    if (!this.board) return;
    this.board.innerHTML = "";

    this.cards.forEach((card, index) => {
      const cardEl = document.createElement("div");
      cardEl.className = "pq-card";
      cardEl.dataset.id = card.id;
      cardEl.dataset.index = index;

      cardEl.innerHTML = `
        <div class="pq-card-face pq-card-back">
          ${CARD_BACK_RUNE}
        </div>
        <div class="pq-card-face pq-card-front">
          ${card.icon}
          <span class="pq-card-name">${card.name}</span>
        </div>
      `;

      cardEl.addEventListener("click", () => this.handleCardClick(cardEl, card));
      this.board.appendChild(cardEl);
    });
  }

  startRound() {
    if (this.state === "PLAYING" || this.state === "PEEK") return;

    // Reset game state
    clearInterval(this.timerInterval);
    this.state = "PEEK";
    this.timer = 30;
    this.score = 0;
    this.combo = 1;
    this.highestCombo = 1;
    this.matchedPairs = 0;
    this.flippedCards = [];

    this.updateHUD();
    this.resultModal.hidden = true;
    this.generateCards();

    if (this.phaseEl) this.phaseEl.textContent = "TAKE A PEEK";
    if (this.noteEl) this.noteEl.textContent = "Take a quick look! Memorize the pairs...";
    if (this.startBtn) {
      this.startBtn.disabled = true;
      this.startBtn.textContent = "Round in Progress...";
      this.startBtn.style.opacity = "0.6";
    }

    sfx.playStart();

    // Flip all cards face up for Peek Phase (2.4 seconds)
    const cardEls = this.board.querySelectorAll(".pq-card");
    cardEls.forEach(el => el.classList.add("flipped"));

    setTimeout(() => {
      if (this.state !== "PEEK") return;
      cardEls.forEach(el => el.classList.remove("flipped"));
      sfx.playFlip();

      setTimeout(() => {
        this.beginTimer();
      }, 350);
    }, 2400);
  }

  beginTimer() {
    this.state = "PLAYING";
    if (this.phaseEl) this.phaseEl.textContent = "FIND THE PAIRS";
    if (this.noteEl) this.noteEl.textContent = "Quick! Find all 6 pairs before time runs out.";

    const startTime = Date.now();
    const totalDuration = 30000;

    this.timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, totalDuration - elapsed);
      this.timer = Math.ceil(remaining / 1000);

      const secondsStr = this.timer.toString().padStart(2, "0");
      if (this.timeEl) this.timeEl.textContent = `00:${secondsStr}`;

      const pct = (remaining / totalDuration) * 100;
      if (this.timeFill) {
        this.timeFill.style.width = `${pct}%`;
        if (remaining <= 5500) {
          this.timeFill.style.background = "linear-gradient(90deg, #ff4d6d, #e63946)";
        } else {
          this.timeFill.style.background = "linear-gradient(90deg, #ffd166, #c77dff)";
        }
      }

      // Last 5 seconds tick sound
      if (remaining <= 5000 && remaining > 500 && Math.floor(remaining / 1000) !== Math.floor((remaining + 100) / 1000)) {
        sfx.playTick();
      }

      if (remaining <= 0) {
        clearInterval(this.timerInterval);
        this.endRound(false);
      }
    }, 100);
  }

  handleCardClick(cardEl, card) {
    if (this.state !== "PLAYING") return;
    if (cardEl.classList.contains("flipped") || cardEl.classList.contains("matched")) return;
    if (this.flippedCards.length >= 2) return;

    cardEl.classList.add("flipped");
    sfx.playFlip();
    this.flippedCards.push({ el: cardEl, data: card });

    if (this.flippedCards.length === 2) {
      this.checkPair();
    }
  }

  checkPair() {
    const [card1, card2] = this.flippedCards;
    const isMatch = card1.data.id === card2.data.id;

    if (isMatch) {
      // Pair Matched!
      setTimeout(() => {
        card1.el.classList.add("matched");
        card2.el.classList.add("matched");
        
        this.matchedPairs++;
        const points = 100 * this.combo;
        this.score += points;
        this.highestCombo = Math.max(this.highestCombo, this.combo);
        sfx.playMatch(this.combo);

        this.combo = Math.min(this.combo + 1, 4);
        this.updateHUD();

        if (this.noteEl) {
          this.noteEl.innerHTML = `<span style="color:var(--emerald-accent)">+${points}</span> Matched <b>${card1.data.name}</b>!`;
        }

        this.flippedCards = [];

        // Check Victory
        if (this.matchedPairs === this.totalPairs) {
          clearInterval(this.timerInterval);
          setTimeout(() => this.endRound(true), 400);
        }
      }, 350);
    } else {
      // Mismatch
      setTimeout(() => {
        card1.el.classList.add("wobble");
        card2.el.classList.add("wobble");
        sfx.playMismatch();

        this.combo = 1;
        this.updateHUD();

        if (this.noteEl) {
          this.noteEl.textContent = "Not a pair. Combo reset!";
        }

        setTimeout(() => {
          card1.el.classList.remove("flipped", "wobble");
          card2.el.classList.remove("flipped", "wobble");
          this.flippedCards = [];
        }, 600);
      }, 500);
    }
  }

  updateHUD() {
    if (this.scoreEl) this.scoreEl.textContent = this.score;
    if (this.comboEl) this.comboEl.textContent = `×${this.combo}`;
    if (this.pairCountEl) this.pairCountEl.textContent = `${this.matchedPairs} / ${this.totalPairs} pairs`;

    // Update combo dots
    this.comboDots.forEach((dot, idx) => {
      dot.className = (idx < this.combo - 1) ? "lit" : "";
    });

    // Update pair diamond marks
    this.pairMarks.forEach((mark, idx) => {
      mark.className = (idx < this.matchedPairs) ? "filled" : "";
    });
  }

  endRound(victory) {
    this.state = "ENDED";
    if (this.startBtn) {
      this.startBtn.disabled = false;
      this.startBtn.textContent = "Start 30-second round";
      this.startBtn.style.opacity = "1";
    }

    let finalScore = this.score;
    if (victory) {
      const timeBonus = this.timer * 25;
      finalScore += timeBonus;
      sfx.playVictory();

      this.resultLabel.textContent = "ROUND COMPLETE";
      this.resultTitle.innerHTML = "A little<br>victory.";
      this.resultScore.textContent = finalScore;
      this.resultDetail.innerHTML = `Found all 6 relics with <b>${this.timer}s</b> left!<br>Time bonus: +${timeBonus} · Peak Combo: ×${this.highestCombo}`;
    } else {
      sfx.playMismatch();
      this.resultLabel.textContent = "TIME EXPIRED";
      this.resultTitle.innerHTML = "The magic<br>fades.";
      this.resultScore.textContent = finalScore;
      this.resultDetail.innerHTML = `You discovered ${this.matchedPairs} of 6 pairs.<br>A quick focus and try again!`;
    }

    // Save personal best
    if (finalScore > this.bestScore) {
      this.bestScore = finalScore;
      localStorage.setItem("pq_relic_best", this.bestScore);
      this.updateBestScoreDisplay();
      this.resultDetail.innerHTML += `<br><span style="color:var(--gold-accent)">✦ New Personal Best! ✦</span>`;
    }

    this.resultModal.hidden = false;
  }
}

// ==========================================
// 4. GLOBAL PAGE INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Sound button in Navbar
  const audioBtn = document.getElementById("audio-toggle");
  if (audioBtn) {
    audioBtn.addEventListener("click", () => {
      const enabled = sfx.toggle();
      audioBtn.classList.toggle("active", enabled);
      audioBtn.setAttribute("title", enabled ? "Mute Sound" : "Enable Sound");
    });
  }

  // Initialize Game inside Dialog
  const dialogEl = document.getElementById("pq-game");
  let dialogGame = null;
  if (dialogEl) {
    dialogGame = new PocketQuestGame(dialogEl);

    const closeBtn = dialogEl.querySelector(".pq-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => dialogEl.close());
    }

    dialogEl.addEventListener("click", (e) => {
      if (e.target === dialogEl) dialogEl.close();
    });
  }

  // Initialize Game inside Phone Mockup on Hero Section
  const phoneScreen = document.querySelector(".phone-screen");
  let phoneGame = null;
  if (phoneScreen) {
    phoneGame = new PocketQuestGame(phoneScreen);
  }

  // Trigger buttons that open Dialog
  const openModalBtns = document.querySelectorAll(".btn-open-game");
  openModalBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (dialogEl) {
        dialogEl.showModal();
        if (dialogGame && dialogGame.state === "IDLE") {
          dialogGame.startRound();
        }
      }
    });
  });

  // Hero showcase buttons on landing page
  const rosterCards = document.querySelectorAll(".roster-card");
  rosterCards.forEach(card => {
    card.addEventListener("click", () => {
      const heroKey = card.dataset.hero;
      if (heroKey && HEROES_DATA[heroKey]) {
        if (dialogEl) {
          const heroBtn = dialogEl.querySelector(`.pq-hero[data-hero="${heroKey}"]`);
          if (heroBtn) heroBtn.click();
          dialogEl.showModal();
        }
      }
    });
  });

  console.log("Pocket Quest / Phép Thuật loaded successfully!");
});

