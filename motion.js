/**
 * DigiQuest: IT Motion Hero - Motion Tracking & Camera Control Module
 */

class MotionTrackingSystem {
    constructor() {
        // Webcam stream variables
        this.stream = null;
        this.video = null;
        this.canvas = null;
        this.ctx = null;
        
        // MediaPipe Hands setup
        this.hands = null;
        this.cameraActive = false;
        this.handsInitialized = false;

        // Interactive states
        this.cursorX = 0;
        this.cursorY = 0;
        this.smoothedX = 0;
        this.smoothedY = 0;
        this.lerpFactor = 0.25; // Pointer smoothing factor

        // Tracking status
        this.handDetected = false;
        this.isMouseControl = false;

        // Dwell Time configuration
        this.dwellDuration = 1500; // 1.5 seconds to choose
        this.activeTargets = [];
        this.lastUpdateTime = Date.now();
        this.tickAudioTimer = 0;

        // Particle System for hand cursor
        this.particles = [];
    }

    init() {
        this.video = document.getElementById('webcam-video');
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Initial sizing
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Setup MediaPipe
        this.initMediaPipe();

        // Listen for mouse movement for fallback mode
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        // Start animation frame loop for rendering canvas & particle trails
        requestAnimationFrame((t) => this.renderLoop(t));
    }

    resizeCanvas() {
        const calCanvas = document.getElementById('calibration-canvas');
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        if (calCanvas) {
            // Calibration canvas is smaller, sized by its container aspect ratio
            const container = calCanvas.parentElement;
            calCanvas.width = container.clientWidth;
            calCanvas.height = container.clientHeight;
        }
    }

    // ==========================================================================
    // MediaPipe Initialization & Hand Handling
    // ==========================================================================
    initMediaPipe() {
        try {
            this.hands = new Hands({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            });

            this.hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });

            this.hands.onResults((results) => this.onHandResults(results));
            this.handsInitialized = true;
            console.log("MediaPipe Hands initialized.");
        } catch (error) {
            console.error("Failed to initialize MediaPipe Hands:", error);
            // Auto fallback to mouse
            this.setMouseMode(true);
            document.getElementById('mouse-mode-toggle').checked = true;
        }
    }

    onHandResults(results) {
        if (!this.cameraActive) return;

        const calCanvas = document.getElementById('calibration-canvas');
        let currentCanvas = this.canvas;
        let isCalibration = false;

        // Determine which screen/canvas is active
        if (window.gameEngine && window.gameEngine.currentScreen === 'calibration-screen') {
            currentCanvas = calCanvas;
            isCalibration = true;
        }

        const width = currentCanvas.width;
        const height = currentCanvas.height;
        const currentCtx = currentCanvas.getContext('2d');

        // Draw webcam frame onto canvas (Mirrored)
        currentCtx.save();
        currentCtx.clearRect(0, 0, width, height);
        currentCtx.translate(width, 0);
        currentCtx.scale(-1, 1);
        
        if (results.image) {
            currentCtx.drawImage(results.image, 0, 0, width, height);
        }
        currentCtx.restore();

        // Check if hand is detected
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            this.handDetected = true;
            this.updateTrackingStatus(true, "ตรวจพบมือผู้เล่น");

            const handLandmarks = results.multiHandLandmarks[0];
            
            // Draw skeleton lines/dots for visual feedback (Only in calibration, or subtle in game)
            this.drawHandOverlay(currentCtx, handLandmarks, width, height);

            // Index finger tip is index 8
            const indexTip = handLandmarks[8];

            // Convert normalized coordinates (0..1) to mirrored screen space
            // Since canvas is drawn mirrored, landmark X maps directly if we subtract from 1
            const targetX = (1 - indexTip.x) * width;
            const targetY = indexTip.y * height;

            if (!this.isMouseControl) {
                this.cursorX = targetX;
                this.cursorY = targetY;
            }

            // Enable Start Button on Calibration Screen
            if (isCalibration) {
                const startBtn = document.getElementById('btn-start-from-calibration');
                startBtn.removeAttribute('disabled');
                document.getElementById('camera-status-badge').querySelector('.text').innerText = "พร้อมเข้าสู่เกม! (พบมือแล้ว)";
                document.getElementById('camera-status-badge').querySelector('.dot').className = "dot connected";
            }

        } else {
            this.handDetected = false;
            if (!this.isMouseControl) {
                this.updateTrackingStatus(false, "กรุณายกมือขึ้นหน้ากล้อง");
            }

            if (isCalibration) {
                const startBtn = document.getElementById('btn-start-from-calibration');
                if (!this.isMouseControl) {
                    startBtn.setAttribute('disabled', 'true');
                    document.getElementById('camera-status-badge').querySelector('.text').innerText = "กรุณายกมือเพื่อตรวจจับ...";
                    document.getElementById('camera-status-badge').querySelector('.dot').className = "dot blinking";
                }
            }
        }
    }

    drawHandOverlay(ctx, landmarks, width, height) {
        // Draw joints connecting index finger tip to wrist for minimal elegant tracking look
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'var(--color-primary)';
        
        // Flipped coords mapping helper
        const getXY = (lm) => ({ x: (1 - lm.x) * width, y: lm.y * height });

        // Draw index finger skeleton (Points 5, 6, 7, 8)
        ctx.beginPath();
        const p5 = getXY(landmarks[5]); ctx.moveTo(p5.x, p5.y);
        const p6 = getXY(landmarks[6]); ctx.lineTo(p6.x, p6.y);
        const p7 = getXY(landmarks[7]); ctx.lineTo(p7.x, p7.y);
        const p8 = getXY(landmarks[8]); ctx.lineTo(p8.x, p8.y);
        ctx.stroke();

        // Draw glowing circles at landmarks
        [5, 6, 7, 8].forEach(idx => {
            const pt = getXY(landmarks[idx]);
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, idx === 8 ? 10 : 6, 0, 2 * Math.PI);
            ctx.fill();
        });
    }

    // ==========================================================================
    // Camera Control Stream Lifecycle
    // ==========================================================================
    async startCamera() {
        if (this.cameraActive) return;

        // If mouse control is selected, we don't strictly require camera
        if (this.isMouseControl) {
            this.cameraActive = true;
            this.updateTrackingStatus(true, "เมาส์คุมสำรอง");
            // Enable calibration start immediately
            const startBtn = document.getElementById('btn-start-from-calibration');
            if (startBtn) startBtn.removeAttribute('disabled');
            return;
        }

        try {
            const constraints = {
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: "user"
                }
            };
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = this.stream;
            this.video.play();
            
            this.cameraActive = true;
            console.log("Webcam started.");

            // Start processing frames
            this.processCameraFrames();
        } catch (error) {
            console.error("Error accessing camera: ", error);
            alert("ไม่สามารถเปิดกล้องเว็บแคมได้ ระบบจะเปิด 'โหมดควบคุมด้วยเมาส์' แทนโดยอัตโนมัติ");
            
            // Switch to Mouse Mode
            this.setMouseMode(true);
            const mouseToggle = document.getElementById('mouse-mode-toggle');
            if (mouseToggle) mouseToggle.checked = true;
        }
    }

    processCameraFrames() {
        if (!this.cameraActive) return;

        const process = async () => {
            if (!this.cameraActive) return;
            
            if (this.video.readyState === 4) { // HAVE_ENOUGH_DATA
                try {
                    await this.hands.send({ image: this.video });
                } catch (err) {
                    console.error("MediaPipe inference error:", err);
                }
            }
            // Repeat on next animation frame
            requestAnimationFrame(process);
        };
        requestAnimationFrame(process);
    }

    stopCamera() {
        this.cameraActive = false;
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        if (this.video) {
            this.video.srcObject = null;
        }
        console.log("Webcam stopped.");
    }

    toggleCameraStreaming() {
        if (this.cameraActive) {
            this.stopCamera();
            this.updateTrackingStatus(false, "ปิดกล้อง (เมาส์คุม)");
            return false;
        } else {
            this.startCamera();
            return true;
        }
    }

    // ==========================================================================
    // Mouse Controls & Fallback Mode
    // ==========================================================================
    setMouseMode(enabled) {
        this.isMouseControl = enabled;
        if (enabled) {
            this.stopCamera();
            this.cameraActive = false;
            this.updateTrackingStatus(true, "เมาส์คุมสำรอง");
            
            // Allow calibration starts immediately
            const startBtn = document.getElementById('btn-start-from-calibration');
            if (startBtn) startBtn.removeAttribute('disabled');
        } else {
            this.updateTrackingStatus(false, "กรุณาต่อกล้องเว็บแคม");
            this.startCamera();
        }
    }

    handleMouseMove(e) {
        if (this.isMouseControl) {
            this.cursorX = e.clientX;
            this.cursorY = e.clientY;
        }
    }

    updateTrackingStatus(active, text) {
        const dot = document.getElementById('tracking-status-dot');
        const txt = document.getElementById('tracking-status-text');

        if (dot && txt) {
            if (active) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
            txt.innerText = text;
        }
    }

    // ==========================================================================
    // Dwell Time Target Logic (Collision Checks)
    // ==========================================================================
    updateTargetElements() {
        const targetElements = document.querySelectorAll('.hud-target');
        this.activeTargets = [];

        targetElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            this.activeTargets.push({
                element: el,
                index: parseInt(el.dataset.index),
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                radius: rect.width / 2,
                hoverProgress: 0,
                lastTickPlayed: 0
            });
        });
    }

    checkTargetCollisions(cursorX, cursorY, dt) {
        if (!window.gameEngine || window.gameEngine.currentScreen !== 'game-screen' || window.gameEngine.isPaused) return;

        let insideAny = false;

        this.activeTargets.forEach(target => {
            const dist = Math.hypot(cursorX - target.x, cursorY - target.y);
            
            if (dist <= target.radius) {
                insideAny = true;
                target.element.classList.add('tracking-hover');
                
                // Advance hover progress
                target.hoverProgress += dt / this.dwellDuration;
                if (target.hoverProgress > 1.0) target.hoverProgress = 1.0;

                // Play ticks periodically as it fills
                const roundedTick = Math.floor(target.hoverProgress * 8); // 8 segments/ticks
                if (roundedTick > target.lastTickPlayed && target.hoverProgress < 1.0) {
                    target.lastTickPlayed = roundedTick;
                    sfx.playDwellTick(target.hoverProgress);
                }

                // Render progress ring
                const circle = target.element.querySelector('.progress-ring-circle');
                if (circle) {
                    const radius = circle.r.baseVal.value;
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (target.hoverProgress * circumference);
                    circle.style.strokeDashoffset = offset;
                }

                // Activate selected choice once filled
                if (target.hoverProgress >= 1.0) {
                    window.gameEngine.selectChoice(target.index);
                    this.resetAllTargetProgress();
                }

            } else {
                // Decay hover progress back to 0
                target.element.classList.remove('tracking-hover');
                target.hoverProgress -= dt / 400; // decay faster
                if (target.hoverProgress < 0) target.hoverProgress = 0;
                target.lastTickPlayed = 0;

                const circle = target.element.querySelector('.progress-ring-circle');
                if (circle) {
                    const radius = circle.r.baseVal.value;
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (target.hoverProgress * circumference);
                    circle.style.strokeDashoffset = offset;
                }
            }
        });

        // If we are in mouse mode and hover in, and click is triggered manually,
        // we can also support click. (handled via HTML listener, triggers select immediately).
        // To allow direct click during Mouse Mode:
        if (this.isMouseControl) {
            this.activeTargets.forEach(target => {
                // Set click event only once
                if (!target.clickBound) {
                    target.element.onclick = () => {
                        window.gameEngine.selectChoice(target.index);
                        this.resetAllTargetProgress();
                    };
                    target.clickBound = true;
                }
            });
        } else {
            // Unbind clicks in hand tracking mode
            this.activeTargets.forEach(target => {
                target.element.onclick = null;
                target.clickBound = false;
            });
        }
    }

    resetAllTargetProgress() {
        this.activeTargets.forEach(target => {
            target.hoverProgress = 0;
            target.lastTickPlayed = 0;
            const circle = target.element.querySelector('.progress-ring-circle');
            if (circle) {
                const radius = circle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                circle.style.strokeDashoffset = circumference;
            }
        });
    }

    // ==========================================================================
    // Particles & Main Animation Render Loop
    // ==========================================================================
    createParticles(x, y) {
        // Emit a few glowing particles at cursor
        for (let i = 0; i < 2; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1.0,
                decay: 0.04 + Math.random() * 0.03,
                size: 3 + Math.random() * 5,
                color: `hsla(${180 + Math.random() * 40}, 100%, 70%, ` // Neon blue-cyan
            });
        }
    }

    renderLoop() {
        const now = Date.now();
        const dt = now - this.lastUpdateTime;
        this.lastUpdateTime = now;

        // 1. Smooth out cursor using Lerp
        this.smoothedX += (this.cursorX - this.smoothedX) * this.lerpFactor;
        this.smoothedY += (this.cursorY - this.smoothedY) * this.lerpFactor;

        // Only draw on canvas when camera is disabled OR we are in gameplay
        // Because MediaPipe draws on canvas in its own callback when camera is active!
        // So we clear and draw our stuff on top
        if (window.gameEngine && window.gameEngine.currentScreen === 'game-screen') {
            // Draw visual cursor indicator on canvas
            this.drawGameOverlay(dt);
        }

        // 2. Check overlap logic
        this.checkTargetCollisions(this.smoothedX, this.smoothedY, dt);

        // Keep loop going
        requestAnimationFrame((t) => this.renderLoop(t));
    }

    drawGameOverlay(dt) {
        // If camera is NOT active (Mouse Mode only, or camera failed), 
        // we must clear the canvas ourselves since MediaPipe isn't drawing frames!
        if (!this.cameraActive || this.isMouseControl) {
            this.ctx.fillStyle = 'rgba(9, 9, 14, 0.4)'; // trails effect
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Spawn particles at cursor position
        if (this.cursorX > 0 && this.cursorY > 0) {
            this.createParticles(this.smoothedX, this.smoothedY);
        }

        // Render Particles
        this.particles.forEach((p, idx) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;

            if (p.life <= 0) {
                this.particles.splice(idx, 1);
                return;
            }

            this.ctx.fillStyle = p.color + p.life + ')';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, 2 * Math.PI);
            this.ctx.fill();
        });

        // Draw Golden Cursor Pointer
        if (this.smoothedX > 0 && this.smoothedY > 0) {
            this.ctx.save();
            
            // Outer glow
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = 'rgba(255, 226, 89, 0.8)'; // Golden Glow
            
            // Outer Ring
            this.ctx.strokeStyle = '#ffe259';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(this.smoothedX, this.smoothedY, 14, 0, 2 * Math.PI);
            this.ctx.stroke();

            // Inner Core Dot
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(this.smoothedX, this.smoothedY, 5, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.restore();
        }
    }
}

// Global instantiation of Motion System
window.motionTracking = new MotionTrackingSystem();
document.addEventListener('DOMContentLoaded', () => {
    window.motionTracking.init();
});
