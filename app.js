/**
 * DigiQuest: IT Motion Hero - Game Logic & State Module
 */

// ==========================================================================
// 1. GAME LEVEL & QUESTION DATABASE (Computer/Digital Tech Primary School)
// ==========================================================================
const GAME_LEVELS = [
    {
        id: 1,
        title: "ฮาร์ดแวร์ vs ซอฟต์แวร์",
        description: "แยกแยะชิ้นส่วนอุปกรณ์ที่จับต้องได้ กับโปรแกรมสั่งการ",
        icon: "💻",
        timeLimit: 20, // 20 seconds per question
        questions: [
            {
                text: "แผงแป้นอักขระ (Keyboard) จัดเป็นฮาร์ดแวร์ หรือ ซอฟต์แวร์?",
                choices: [
                    { label: "A", text: "ฮาร์ดแวร์ (แตะต้องได้)" },
                    { label: "B", text: "ซอฟต์แวร์ (โปรแกรม)" }
                ],
                correctIndex: 0
            },
            {
                text: "ระบบปฏิบัติการ Windows ที่ทำงานในคอมพิวเตอร์ จัดเป็นอะไร?",
                choices: [
                    { label: "A", text: "ฮาร์ดแวร์" },
                    { label: "B", text: "ซอฟต์แวร์" }
                ],
                correctIndex: 1
            },
            {
                text: "โปรแกรมเว็บเบราว์เซอร์ Google Chrome จัดเป็นอะไร?",
                choices: [
                    { label: "A", text: "ฮาร์ดแวร์" },
                    { label: "B", text: "ซอฟต์แวร์" }
                ],
                correctIndex: 1
            },
            {
                text: "เครื่องพิมพ์เอกสาร (Printer) ที่ต่อกับคอมพิวเตอร์ จัดเป็นอะไร?",
                choices: [
                    { label: "A", text: "ฮาร์ดแวร์ (แตะต้องได้)" },
                    { label: "B", text: "ซอฟต์แวร์ (โปรแกรม)" }
                ],
                correctIndex: 0
            },
            {
                text: "เกม Minecraft ที่นักเรียนชอบเล่นบนหน้าจอ จัดเป็นอะไร?",
                choices: [
                    { label: "A", text: "ฮาร์ดแวร์" },
                    { label: "B", text: "ซอฟต์แวร์" }
                ],
                correctIndex: 1
            }
        ]
    },
    {
        id: 2,
        title: "อุปกรณ์รับเข้า vs ส่งออก",
        description: "แยกแยะฮาร์ดแวร์ทำหน้าที่รับข้อมูล (Input) หรือแสดงผล (Output)",
        icon: "🔌",
        timeLimit: 20,
        questions: [
            {
                text: "เมาส์ (Mouse) ที่ใช้คลิกและชี้ตำแหน่ง ทำหน้าที่อะไร?",
                choices: [
                    { label: "A", text: "รับเข้าข้อมูล (Input)" },
                    { label: "B", text: "ส่งออกผลลัพธ์ (Output)" }
                ],
                correctIndex: 0
            },
            {
                text: "จอภาพคอมพิวเตอร์ (Monitor) จัดเป็นอุปกรณ์ประเภทใด?",
                choices: [
                    { label: "A", text: "อุปกรณ์รับเข้า (Input)" },
                    { label: "B", text: "อุปกรณ์แสดงผล (Output)" }
                ],
                correctIndex: 1
            },
            {
                text: "เครื่องสแกนเนอร์ (Scanner) สำหรับบันทึกภาพลงเครื่องคอมฯ คืออะไร?",
                choices: [
                    { label: "A", text: "อุปกรณ์รับเข้า (Input)" },
                    { label: "B", text: "อุปกรณ์ส่งออก (Output)" }
                ],
                correctIndex: 0
            },
            {
                text: "หูฟังหรือลำโพง (Speaker) ทำหน้าที่ประมวลผลข้อมูลในลักษณะใด?",
                choices: [
                    { label: "A", text: "รับเข้า (รับเสียงคน)" },
                    { label: "B", text: "ส่งออก (ส่งเสียงเพลง)" }
                ],
                correctIndex: 1
            },
            {
                text: "ไมโครโฟน (Microphone) ที่ใช้พูดอัดเสียง จัดเป็นอุปกรณ์อะไร?",
                choices: [
                    { label: "A", text: "อุปกรณ์รับเข้า (Input)" },
                    { label: "B", text: "อุปกรณ์ส่งออก (Output)" }
                ],
                correctIndex: 0
            }
        ]
    },
    {
        id: 3,
        title: "ความปลอดภัยบนอินเทอร์เน็ต",
        description: "การเอาตัวรอด และมารยาทดิจิทัลเบื้องต้นสำหรับเด็ก",
        icon: "🛡️",
        timeLimit: 25,
        questions: [
            {
                text: "หากมีคนในเกมออนไลน์ขอรหัสผ่าน (Password) ของคุณ ควรทำอย่างไร?",
                choices: [
                    { label: "A", text: "ให้ทันทีจะได้เล่นด้วยกัน" },
                    { label: "B", text: "ปฏิเสธและแจ้งครู/ผู้ปกครอง" }
                ],
                correctIndex: 1
            },
            {
                text: "หากเจอกล่องข้อความว่า 'ยินดีด้วย คุณได้รับโทรศัพท์ฟรี! คลิกเพื่อรับ' ควรทำอย่างไร?",
                choices: [
                    { label: "A", text: "ห้ามคลิกเด็ดขาด ปิดหน้าจอนั้นทิ้ง" },
                    { label: "B", text: "รีบคลิกเพื่อกรอกที่อยู่รับของ" }
                ],
                correctIndex: 0
            },
            {
                text: "การตั้งรหัสผ่าน (Password) ที่ปลอดภัยและคาดเดายาก ควรเป็นอย่างไร?",
                choices: [
                    { label: "A", text: "ใช้ 123456 หรือวันเกิดตนเอง" },
                    { label: "B", text: "ผสมระหว่างอักษร เลข และสัญลักษณ์" }
                ],
                correctIndex: 1
            },
            {
                text: "เราสามารถนำรูปภาพตลก ๆ แกล้งเพื่อนไปโพสต์ประจานบนโซเชียลมีเดียได้หรือไม่?",
                choices: [
                    { label: "A", text: "ไม่ได้ เพราะเป็นการล้อเลียนทางไซเบอร์" },
                    { label: "B", text: "ได้ เพราะสร้างความสนุกสนานในกลุ่ม" }
                ],
                correctIndex: 0
            },
            {
                text: "หากได้รับข้อความจากคนไม่รู้จัก ชวนไปเจอส่วนตัวข้างนอก ควรทำอย่างไร?",
                choices: [
                    { label: "A", text: "แอบไปพบเพื่อหาเพื่อนใหม่" },
                    { label: "B", text: "แจ้งผู้ปกครองและบล็อกคนนั้นทันที" }
                ],
                correctIndex: 1
            }
        ]
    },
    {
        id: 4,
        title: "การเขียนโค้ดและผังงาน",
        description: "คิดวิเคราะห์เชิงคำนวณและเข้าใจขั้นตอนวิธี (Algorithm)",
        icon: "🧩",
        timeLimit: 25,
        questions: [
            {
                text: "สัญลักษณ์ผังงาน (Flowchart) รูปสี่เหลี่ยมผืนผ้า หมายถึงอะไร?",
                choices: [
                    { label: "A", text: "การปฏิบัติงาน / ประมวลผล" },
                    { label: "B", text: "จุดเริ่มต้น หรือจุดสิ้นสุด" }
                ],
                correctIndex: 0
            },
            {
                text: "ขั้นตอนวิธี (Algorithm) หมายถึงอะไร?",
                choices: [
                    { label: "A", text: "กระบวนการแก้ปัญหาเป็นลำดับขั้นตอน" },
                    { label: "B", text: "ภาษาคอมพิวเตอร์ระดับสูง" }
                ],
                correctIndex: 0
            },
            {
                text: "การเขียนชุดคำสั่งให้หุ่นยนต์ทำงานซ้ำ ๆ เรื่อย ๆ เรียกว่าการทำอะไร?",
                choices: [
                    { label: "A", text: "การวนซ้ำ (Loop)" },
                    { label: "B", text: "การตัดสินใจเงื่อนไข (If-Else)" }
                ],
                correctIndex: 0
            },
            {
                text: "สัญลักษณ์ผังงานรูปสี่เหลี่ยมข้าวหลามตัด (Diamond) มีหน้าที่อะไร?",
                choices: [
                    { label: "A", text: "การรับและแสดงข้อมูล" },
                    { label: "B", text: "การตัดสินใจหรือตรวจสอบเงื่อนไข" }
                ],
                correctIndex: 1
            },
            {
                text: "หากต้องการเดินนำเพื่อนพ้นทางตัน ขั้นตอนวิธีใดควรทำเป็นอันดับแรก?",
                choices: [
                    { label: "A", text: "เดินสำรวจและวางแผนเส้นทาง" },
                    { label: "B", text: "วิ่งลุยเข้าไปเลยทันที" }
                ],
                correctIndex: 0
            }
        ]
    }
];

// ==========================================================================
// 2. RETRO SOUND SYNTHESIZER (Web Audio API)
// ==========================================================================
class SoundSynthesizer {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        const iconSvg = document.getElementById('audio-icon-svg');
        if (this.muted) {
            // Mute Icon Path
            iconSvg.innerHTML = `<path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>`;
            document.getElementById('btn-toggle-audio').classList.add('active');
        } else {
            // Unmute Icon Path
            iconSvg.innerHTML = `<path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>`;
            document.getElementById('btn-toggle-audio').classList.remove('active');
            this.init();
        }
    }

    playTone(freq, type, duration, startTimeOffset = 0, volume = 0.1) {
        if (this.muted) return;
        this.init();

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTimeOffset);

            gain.gain.setValueAtTime(volume, this.ctx.currentTime + startTimeOffset);
            // Smooth decay
            gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + startTimeOffset + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(this.ctx.currentTime + startTimeOffset);
            osc.stop(this.ctx.currentTime + startTimeOffset + duration);
        } catch (e) {
            console.error("Audio error:", e);
        }
    }

    playClick() {
        this.playTone(800, 'sine', 0.08, 0, 0.15);
    }

    playDwellTick(progress) {
        // Higher progress -> higher pitch
        const freq = 400 + (progress * 600); // 400Hz to 1000Hz
        this.playTone(freq, 'triangle', 0.05, 0, 0.08);
    }

    playCorrect() {
        const now = 0;
        this.playTone(523.25, 'triangle', 0.15, now, 0.15); // C5
        this.playTone(659.25, 'triangle', 0.15, now + 0.08, 0.15); // E5
        this.playTone(783.99, 'triangle', 0.15, now + 0.16, 0.15); // G5
        this.playTone(1046.50, 'sine', 0.3, now + 0.24, 0.2); // C6
    }

    playWrong() {
        const now = 0;
        this.playTone(220, 'sawtooth', 0.2, now, 0.15); // A3
        this.playTone(147, 'sawtooth', 0.35, now + 0.1, 0.15); // D3
    }

    playBonusActive() {
        this.playTone(880, 'sine', 0.1, 0, 0.1);
        this.playTone(987.77, 'sine', 0.15, 0.08, 0.1);
    }

    playLevelUp() {
        const now = 0;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, index) => {
            this.playTone(freq, 'sine', 0.2, now + (index * 0.08), 0.15);
        });
    }

    playGameOver() {
        const now = 0;
        this.playTone(392.00, 'sawtooth', 0.2, now, 0.15); // G4
        this.playTone(349.23, 'sawtooth', 0.2, now + 0.15, 0.15); // F4
        this.playTone(311.13, 'sawtooth', 0.25, now + 0.3, 0.15); // Eb4
        this.playTone(261.63, 'sawtooth', 0.5, now + 0.45, 0.15); // C4
    }
}

const sfx = new SoundSynthesizer();

// ==========================================================================
// 3. MAIN GAME CONTROLLER Class
// ==========================================================================
class DigiQuestGame {
    constructor() {
        // Game Settings
        this.totalHearts = 3;
        this.bonusThreshold = 8; // Time window for bonus score (8 seconds)

        // Dynamic State
        this.currentScreen = "lobby";
        this.selectedStageIndex = 0;
        this.currentQuestionIdx = 0;
        this.score = 0;
        this.lives = this.totalHearts;
        this.timeLeft = 0;
        this.bonusTimeLeft = 0;
        this.isPaused = false;
        
        // Timers
        this.countdownTimer = null;
        this.bonusCountdownTimer = null;
        
        // Stats
        this.timeSpentInStage = 0;
        this.stageTimerInterval = null;

        // Leaderboard
        this.leaderboard = [];

        // UI elements cache
        this.elements = {};
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadLeaderboard();
        this.renderLobbyStages();
        this.renderLobbyLeaderboard();
        
        // Initialize Screen
        this.showScreen("lobby-screen");
    }

    cacheElements() {
        this.elements = {
            screens: document.querySelectorAll('.screen'),
            stagesGrid: document.getElementById('stages-grid'),
            lobbyLeaderboardList: document.getElementById('lobby-leaderboard-list'),
            hudScore: document.getElementById('hud-score-val'),
            hudTime: document.getElementById('hud-time-val'),
            hudStageName: document.getElementById('hud-stage-name'),
            hudLives: document.getElementById('hud-lives-container'),
            hudQuestionNum: document.getElementById('hud-question-number'),
            hudQuestionText: document.getElementById('hud-question-text'),
            hudTargetsContainer: document.getElementById('hud-targets-container'),
            alertBanner: document.getElementById('alert-banner'),
            bonusCountdownAlert: document.getElementById('bonus-countdown-alert'),
            bonusSeconds: document.getElementById('bonus-seconds-val'),
            pauseOverlay: document.getElementById('pause-overlay'),
            manualOverlay: document.getElementById('manual-overlay'),
            gameOverScreen: document.getElementById('game-over-screen'),
            gameOverTitle: document.getElementById('game-over-title'),
            gameOverSubtitle: document.getElementById('game-over-subtitle'),
            resScore: document.getElementById('res-score'),
            resLives: document.getElementById('res-lives'),
            resTimeSpent: document.getElementById('res-time-spent'),
            starsContainer: document.getElementById('stars-container'),
            playerNameInput: document.getElementById('player-name-input'),
            btnSubmitScore: document.getElementById('btn-submit-score'),
            leaderboardEntryContainer: document.getElementById('leaderboard-entry-container'),
            trackingStatusDot: document.getElementById('tracking-status-dot'),
            trackingStatusText: document.getElementById('tracking-status-text')
        };
    }

    bindEvents() {
        // Lobby Actions
        document.getElementById('btn-calibration-lobby').addEventListener('click', () => {
            sfx.playClick();
            this.showScreen('calibration-screen');
            // Trigger motion system camera start
            if (window.motionTracking) {
                window.motionTracking.startCamera();
            }
        });

        document.getElementById('btn-how-to-play').addEventListener('click', () => {
            sfx.playClick();
            this.elements.manualOverlay.classList.add('active');
        });

        document.getElementById('btn-close-manual').addEventListener('click', () => {
            sfx.playClick();
            this.elements.manualOverlay.classList.remove('active');
        });

        // Calibration Screen Actions
        document.getElementById('btn-back-to-lobby').addEventListener('click', () => {
            sfx.playClick();
            this.showScreen('lobby-screen');
            if (window.motionTracking) {
                window.motionTracking.stopCamera();
            }
        });

        document.getElementById('btn-start-from-calibration').addEventListener('click', () => {
            sfx.playClick();
            this.startSelectedStage();
        });

        // Toggle Switch for Mouse Control Fallback
        const mouseToggle = document.getElementById('mouse-mode-toggle');
        mouseToggle.addEventListener('change', (e) => {
            sfx.playClick();
            if (window.motionTracking) {
                window.motionTracking.setMouseMode(e.target.checked);
            }
        });

        // In-game buttons
        document.getElementById('btn-game-pause').addEventListener('click', () => {
            sfx.playClick();
            this.pauseGame();
        });

        document.getElementById('btn-game-quit').addEventListener('click', () => {
            sfx.playClick();
            this.quitGame();
        });

        // Pause Menu Actions
        document.getElementById('btn-resume-game').addEventListener('click', () => {
            sfx.playClick();
            this.resumeGame();
        });

        document.getElementById('btn-restart-game').addEventListener('click', () => {
            sfx.playClick();
            this.elements.pauseOverlay.classList.remove('active');
            this.startSelectedStage();
        });

        document.getElementById('btn-exit-to-lobby').addEventListener('click', () => {
            sfx.playClick();
            this.elements.pauseOverlay.classList.remove('active');
            this.quitGame();
        });

        // Game Over Actions
        document.getElementById('btn-over-lobby').addEventListener('click', () => {
            sfx.playClick();
            this.showScreen('lobby-screen');
            if (window.motionTracking) {
                window.motionTracking.stopCamera();
            }
        });

        document.getElementById('btn-over-retry').addEventListener('click', () => {
            sfx.playClick();
            this.startSelectedStage();
        });

        this.elements.btnSubmitScore.addEventListener('click', () => {
            this.submitScoreToLeaderboard();
        });

        // Audio Toggle Button
        document.getElementById('btn-toggle-audio').addEventListener('click', () => {
            sfx.toggleMute();
        });

        // Camera Toggle Button
        document.getElementById('btn-toggle-camera').addEventListener('click', () => {
            sfx.playClick();
            if (window.motionTracking) {
                const isStreaming = window.motionTracking.toggleCameraStreaming();
                const btn = document.getElementById('btn-toggle-camera');
                if (isStreaming) {
                    btn.classList.remove('active');
                } else {
                    btn.classList.add('active');
                }
            }
        });
    }

    showScreen(screenId) {
        this.currentScreen = screenId;
        this.elements.screens.forEach(screen => {
            if (screen.id === screenId) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });
    }

    // ==========================================================================
    // Lobby Mechanics
    // ==========================================================================
    renderLobbyStages() {
        this.elements.stagesGrid.innerHTML = '';
        GAME_LEVELS.forEach((level, idx) => {
            // Load high scores from memory
            const highscore = this.getHighScoreForLevel(level.id);

            const card = document.createElement('div');
            card.className = 'stage-card';
            card.innerHTML = `
                <div class="stage-info">
                    <h4><span>${level.icon}</span> ด่านที่ ${level.id}: ${level.title}</h4>
                    <p>${level.description}</p>
                </div>
                <div class="stage-meta">
                    <span class="stage-score">คะแนนสูงสุด: ${highscore}</span>
                    <span class="stage-badge-status unlocked">พร้อมเล่น</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                sfx.playClick();
                this.selectedStageIndex = idx;
                
                // Show Calibration panel first so the user checks camera layout
                this.showScreen('calibration-screen');
                if (window.motionTracking) {
                    window.motionTracking.startCamera();
                }
            });
            this.elements.stagesGrid.appendChild(card);
        });
    }

    getHighScoreForLevel(levelId) {
        const scores = this.leaderboard.filter(item => item.levelId === levelId);
        if (scores.length === 0) return 0;
        return Math.max(...scores.map(s => s.score));
    }

    loadLeaderboard() {
        const stored = localStorage.getItem('digiquest_leaderboard');
        this.leaderboard = stored ? JSON.parse(stored) : [];
    }

    saveLeaderboard() {
        localStorage.setItem('digiquest_leaderboard', JSON.stringify(this.leaderboard));
    }

    renderLobbyLeaderboard() {
        this.elements.lobbyLeaderboardList.innerHTML = '';
        
        // Sort: highest score first, then quickest time
        const sorted = [...this.leaderboard]
            .sort((a, b) => b.score - a.score || a.timeSpent - b.timeSpent)
            .slice(0, 5); // top 5

        if (sorted.length === 0) {
            this.elements.lobbyLeaderboardList.innerHTML = '<div class="no-score">ยังไม่มีคะแนนบันทึก</div>';
            return;
        }

        sorted.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'leaderboard-item animate-pop';
            row.style.animationDelay = `${index * 0.1}s`;
            row.innerHTML = `
                <div class="leaderboard-name-box">
                    <span class="leaderboard-rank">${index + 1}</span>
                    <span class="leaderboard-name">${this.escapeHTML(item.name)}</span>
                </div>
                <div class="leaderboard-stats-box">
                    <span style="font-size:0.75rem; color:var(--color-text-muted); margin-right:8px;">ด่าน ${item.levelId}</span>
                    <span class="leaderboard-score-val">${item.score} คะแนน</span>
                </div>
            `;
            this.elements.lobbyLeaderboardList.appendChild(row);
        });
    }

    escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // ==========================================================================
    // Gameplay Core
    // ==========================================================================
    startSelectedStage() {
        this.score = 0;
        this.lives = this.totalHearts;
        this.currentQuestionIdx = 0;
        this.isPaused = false;
        this.timeSpentInStage = 0;

        const levelData = GAME_LEVELS[this.selectedStageIndex];
        this.elements.hudStageName.innerText = `ด่าน ${levelData.id}: ${levelData.title}`;
        this.elements.hudScore.innerText = '0';
        
        // Show game screen
        this.showScreen('game-screen');

        // Start motion system camera in game
        if (window.motionTracking) {
            window.motionTracking.startCamera();
        }

        // Start stage time counter
        if (this.stageTimerInterval) clearInterval(this.stageTimerInterval);
        this.stageTimerInterval = setInterval(() => {
            if (!this.isPaused) this.timeSpentInStage++;
        }, 1000);

        this.loadQuestion();
        sfx.playLevelUp();
    }

    loadQuestion() {
        const levelData = GAME_LEVELS[this.selectedStageIndex];
        const q = levelData.questions[this.currentQuestionIdx];

        this.elements.hudQuestionNum.innerText = `คำถามที่ ${this.currentQuestionIdx + 1}/${levelData.questions.length}`;
        this.elements.hudQuestionText.innerText = q.text;

        this.timeLeft = levelData.timeLimit;
        this.bonusTimeLeft = this.bonusThreshold;
        this.updateHUDTime();
        this.updateHUDLives();

        // Trigger Alert for Question Start (e.g. Slide-in or pop sound)
        this.elements.bonusCountdownAlert.classList.remove('active');

        // Render targets
        this.renderChoices(q.choices);

        // Start timers
        this.startQuestionTimers();
    }

    renderChoices(choices) {
        this.elements.hudTargetsContainer.innerHTML = '';
        
        choices.forEach((choice, idx) => {
            // Position Left vs Right (or center if 1 option)
            let posClass = idx === 0 ? 'hud-target-left' : 'hud-target-right';
            if (choices.length === 1) posClass = 'hud-target-center';

            const target = document.createElement('div');
            target.className = `hud-target ${posClass}`;
            target.dataset.index = idx;

            // Render SVG Progress Ring
            target.innerHTML = `
                <div class="target-circle"></div>
                <svg class="progress-ring" width="200" height="200">
                    <circle 
                        class="progress-ring-circle" 
                        stroke-width="8" 
                        fill="transparent" 
                        r="92" 
                        cx="100" 
                        cy="100"
                        stroke-dasharray="578" 
                        stroke-dashoffset="578"
                    />
                </svg>
                <div class="target-content">
                    <span class="target-label">${choice.label}</span>
                    <span class="target-text">${choice.text}</span>
                </div>
            `;
            
            // Add click listener for Mouse Fallback directly
            target.addEventListener('mousedown', (e) => {
                if (window.motionTracking && window.motionTracking.isMouseControl) {
                    sfx.playClick();
                }
            });

            this.elements.hudTargetsContainer.appendChild(target);
        });

        // Inform motion module to scan new positions
        setTimeout(() => {
            if (window.motionTracking) {
                window.motionTracking.updateTargetElements();
            }
        }, 100);
    }

    startQuestionTimers() {
        if (this.countdownTimer) clearInterval(this.countdownTimer);
        if (this.bonusCountdownTimer) clearInterval(this.bonusCountdownTimer);

        // Main Timer
        this.countdownTimer = setInterval(() => {
            if (this.isPaused) return;

            this.timeLeft--;
            this.updateHUDTime();

            if (this.timeLeft <= 0) {
                clearInterval(this.countdownTimer);
                clearInterval(this.bonusCountdownTimer);
                this.onQuestionTimeOut();
            }
        }, 1000);

        // Bonus Timer
        this.elements.bonusCountdownAlert.classList.add('active');
        this.elements.bonusSeconds.innerText = this.bonusTimeLeft;
        
        this.bonusCountdownTimer = setInterval(() => {
            if (this.isPaused) return;

            this.bonusTimeLeft--;
            if (this.bonusTimeLeft >= 0) {
                this.elements.bonusSeconds.innerText = this.bonusTimeLeft;
            }

            if (this.bonusTimeLeft <= 0) {
                clearInterval(this.bonusCountdownTimer);
                this.elements.bonusCountdownAlert.classList.remove('active');
            }
        }, 1000);
    }

    updateHUDTime() {
        const mins = Math.floor(this.timeLeft / 60);
        const secs = this.timeLeft % 60;
        this.elements.hudTime.innerText = `${mins} นาที ${secs} วินาที`;
        
        // Visual warning when time is low
        if (this.timeLeft <= 5) {
            this.elements.hudTime.parentElement.style.borderColor = 'rgba(255, 8, 68, 0.4)';
            this.elements.hudTime.style.color = 'var(--color-danger)';
        } else {
            this.elements.hudTime.parentElement.style.borderColor = 'rgba(255, 226, 89, 0.15)';
            this.elements.hudTime.style.color = 'var(--color-warning)';
        }
    }

    updateHUDLives() {
        this.elements.hudLives.innerHTML = '';
        for (let i = 1; i <= this.totalHearts; i++) {
            const heart = document.createElement('span');
            heart.className = `heart-icon ${i > this.lives ? 'lost' : ''}`;
            heart.innerText = i > this.lives ? '🖤' : '❤️';
            this.elements.hudLives.appendChild(heart);
        }
    }

    // ==========================================================================
    // Interaction Actions (Answer Selection)
    // ==========================================================================
    selectChoice(choiceIdx) {
        // Pause timers
        clearInterval(this.countdownTimer);
        clearInterval(this.bonusCountdownTimer);
        
        const levelData = GAME_LEVELS[this.selectedStageIndex];
        const q = levelData.questions[this.currentQuestionIdx];
        const isCorrect = choiceIdx === q.correctIndex;

        // Highlight visual results in targets
        const targetElements = document.querySelectorAll('.hud-target');
        targetElements.forEach(el => {
            const idx = parseInt(el.dataset.index);
            if (idx === q.correctIndex) {
                el.classList.add('correct-highlight');
            } else if (idx === choiceIdx && !isCorrect) {
                el.classList.add('wrong-highlight');
            }
            // Disable clicks
            el.style.pointerEvents = 'none';
        });

        if (isCorrect) {
            // Success Logic
            const hasBonus = this.bonusTimeLeft > 0;
            let pointsEarned = 2; // base points
            if (hasBonus) {
                pointsEarned += 1; // bonus points
                this.triggerAlertBanner('bonus');
                sfx.playBonusActive();
            } else {
                this.triggerAlertBanner('correct');
                sfx.playCorrect();
            }

            this.score += pointsEarned;
            this.elements.hudScore.innerText = this.score;
        } else {
            // Fail Logic
            this.lives--;
            this.updateHUDLives();
            this.triggerAlertBanner('wrong');
            sfx.playWrong();
        }

        // Wait 3 seconds then go to next question or game over
        setTimeout(() => {
            this.elements.alertBanner.classList.remove('active');
            this.elements.bonusCountdownAlert.classList.remove('active');
            
            if (this.lives <= 0) {
                this.endGame(false);
            } else {
                this.currentQuestionIdx++;
                if (this.currentQuestionIdx < levelData.questions.length) {
                    this.loadQuestion();
                } else {
                    this.endGame(true); // Complete Stage successfully
                }
            }
        }, 2500);
    }

    onQuestionTimeOut() {
        // Question timed out
        this.lives--;
        this.updateHUDLives();
        this.triggerAlertBanner('wrong');
        sfx.playWrong();

        // Disable options
        document.querySelectorAll('.hud-target').forEach(el => el.style.pointerEvents = 'none');

        setTimeout(() => {
            this.elements.alertBanner.classList.remove('active');
            if (this.lives <= 0) {
                this.endGame(false);
            } else {
                this.currentQuestionIdx++;
                const levelData = GAME_LEVELS[this.selectedStageIndex];
                if (this.currentQuestionIdx < levelData.questions.length) {
                    this.loadQuestion();
                } else {
                    this.endGame(true);
                }
            }
        }, 2500);
    }

    triggerAlertBanner(type) {
        const banner = this.elements.alertBanner;
        banner.className = 'alert-banner'; // reset classes
        
        if (type === 'bonus') {
            banner.classList.add('active', 'bonus');
            banner.innerHTML = '<span>CORRECT! 🎉</span><br><span style="font-size:1.8rem;color:var(--color-warning);">BONUS TIME +1 แต้ม! ⏰⚡</span>';
        } else if (type === 'correct') {
            banner.classList.add('active', 'correct');
            banner.innerHTML = '<span>ถูกต้องแล้ว! 🎉</span>';
        } else if (type === 'wrong') {
            banner.classList.add('active', 'wrong');
            banner.innerHTML = '<span>ผิดน้า... ❌</span>';
        }
    }

    // ==========================================================================
    // Pause & Control
    // ==========================================================================
    pauseGame() {
        if (this.isPaused) return;
        this.isPaused = true;
        this.elements.pauseOverlay.classList.add('active');
    }

    resumeGame() {
        this.isPaused = false;
        this.elements.pauseOverlay.classList.remove('active');
    }

    quitGame() {
        clearInterval(this.countdownTimer);
        clearInterval(this.bonusCountdownTimer);
        if (this.stageTimerInterval) clearInterval(this.stageTimerInterval);
        
        this.showScreen('lobby-screen');
        if (window.motionTracking) {
            window.motionTracking.stopCamera();
        }
    }

    // ==========================================================================
    // Results Screen & Leaderboard
    // ==========================================================================
    endGame(isCompleted) {
        clearInterval(this.countdownTimer);
        clearInterval(this.bonusCountdownTimer);
        if (this.stageTimerInterval) clearInterval(this.stageTimerInterval);

        const levelData = GAME_LEVELS[this.selectedStageIndex];

        // Format stats
        this.elements.resScore.innerText = this.score;
        this.elements.resTimeSpent.innerText = this.formatDuration(this.timeSpentInStage);

        // Hearts left
        let heartsHTML = '';
        for (let i = 0; i < this.totalHearts; i++) {
            heartsHTML += i < this.lives ? '❤️' : '🖤';
        }
        this.elements.resLives.innerHTML = heartsHTML;

        // Render Stars
        const starsContainer = this.elements.starsContainer;
        starsContainer.innerHTML = '';
        
        let starsCount = 0;
        if (isCompleted) {
            if (this.lives === this.totalHearts && this.score >= levelData.questions.length * 2) {
                starsCount = 3; // Perfect score and no lives lost
            } else if (this.lives >= 2) {
                starsCount = 2;
            } else {
                starsCount = 1;
            }
        }

        for (let i = 0; i < 3; i++) {
            const star = document.createElement('span');
            star.className = `star ${i < starsCount ? 'active' : ''}`;
            star.innerText = '★';
            starsContainer.appendChild(star);
        }

        // Title styling
        this.elements.gameOverSubtitle.innerText = `ด่านที่ ${levelData.id}: ${levelData.title}`;
        if (isCompleted) {
            this.elements.gameOverScreen.classList.remove('fail');
            this.elements.gameOverTitle.innerText = "🎉 สำเร็จภารกิจ!";
            sfx.playLevelUp();
        } else {
            this.elements.gameOverScreen.classList.add('fail');
            this.elements.gameOverTitle.innerText = "💥 พลังชีวิตหมดลง!";
            sfx.playGameOver();
        }

        // Show Leaderboard entry form only if completed stage (or positive score)
        if (this.score > 0) {
            this.elements.leaderboardEntryContainer.style.display = 'block';
            this.elements.playerNameInput.value = '';
            this.elements.btnSubmitScore.disabled = false;
        } else {
            this.elements.leaderboardEntryContainer.style.display = 'none';
        }

        // Show Screen
        this.showScreen('game-over-screen');
    }

    formatDuration(secs) {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    submitScoreToLeaderboard() {
        const nameInput = this.elements.playerNameInput;
        const name = nameInput.value.trim() || "นักเรียนไร้นาม";
        const levelData = GAME_LEVELS[this.selectedStageIndex];

        // Insert new entry
        this.leaderboard.push({
            name: name,
            levelId: levelData.id,
            score: this.score,
            timeSpent: this.timeSpentInStage,
            timestamp: Date.now()
        });

        this.saveLeaderboard();
        this.renderLobbyLeaderboard();
        this.renderLobbyStages(); // Update top scores

        // Disable form to prevent duplicate submit
        this.elements.btnSubmitScore.disabled = true;
        nameInput.value = 'บันทึกสำเร็จ!';
        
        sfx.playClick();
    }
}

// Global instantiation of Game
window.gameEngine = new DigiQuestGame();
document.addEventListener('DOMContentLoaded', () => {
    window.gameEngine.init();
});
