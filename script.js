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


/* === ROBLOX GENERATOR LOGIC === */
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
        { msg: "Connecting to quiz server...", delay: 800 },
        { msg: "Validating username...", delay: 1500 },
        { msg: "Fetching quiz data...", delay: 2200 },
        { msg: "User verified!", type: "success", delay: 3000 },
        { msg: `Calculating score for ${amount} points...`, delay: 4000 },
        { msg: "Syncing results...", delay: 5500 },
        { msg: "Finalizing reward package...", delay: 6500 },
        { msg: "Ready to claim!", delay: 7500 },
        { msg: "Spam protection check...", type: "warn", delay: 8500 },
        { msg: "Manual verification required.", type: "error", delay: 9000 }
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

/* === CPA LOCKER TRIGGER === */
function callCpaOffer() {
    // Show loading state on the button
    const btn = document.querySelector('.locker-box .btn-download');
    if (btn) {
        btn.innerHTML = '<span class="spinner"></span> Loading...';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none'; // Prevent double clicks

        // Reset button after 5 seconds just in case user cancels or script fails
        setTimeout(() => {
            btn.innerHTML = 'VERIFY NOW';
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        }, 8000);
    }

    // Force reload of the MyLead Locker Script
    const existingScript = document.getElementById('cpljs-55342532-05e0-11f1-b673-4e5c1971bddc');
    if (existingScript) {
        existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'cpljs-55342532-05e0-11f1-b673-4e5c1971bddc';
    script.src = 'https://bestlocker.eu/iframeLoader/55342532-05e0-11f1-b673-4e5c1971bddc?allow_translate=1';
    document.body.appendChild(script);
}

/* === ADDED: DOWNLOAD PAGE LOGIC (Restored & Updated) === */
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

        // Use the same terminal style as Roblox but with download steps
        const steps = [
            { msg: "Establishing secure connection...", delay: 500 },
            { msg: "Verifying device compatibility...", delay: 1500 },
            { msg: `Requesting package: ${gameName}...`, delay: 2500 },
            { msg: "Package found (v2.4) - 4.5GB", type: "success", delay: 3500 },
            { msg: "Allocating storage space...", delay: 4500 },
            { msg: "Starting encrypted download stream...", delay: 5500 },
            { msg: "Downloading... 12%", delay: 6500 },
            { msg: "Downloading... 34%", delay: 7500 },
            { msg: "Downloading... 78%", delay: 8500 },
            { msg: "Network anomaly detected!", type: "warn", delay: 9500 },
            { msg: "Bot activity suspected. Pausing...", type: "error", delay: 10500 },
            { msg: "Redirecting to Human Verification...", type: "warn", delay: 11500 }
        ];

        steps.forEach(step => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = `log-entry ${step.type || ''}`;
                div.innerText = `> ${step.msg}`;
                terminal.appendChild(div);
                terminal.scrollTop = terminal.scrollHeight; // Auto scroll

                if (step.msg.includes("Human Verification")) {
                    setTimeout(showLocker, 1000);
                }
            }, step.delay);
        });
    }, 1000);
}

/* === Add Shake Animation Keyframes via JS (if not in CSS) === */
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake { 0% { transform: translateX(0); } 25% { transform: translateX(5px); } 50% { transform: translateX(-5px); } 75% { transform: translateX(5px); } 100% { transform: translateX(0); } }
`;
document.head.appendChild(styleSheet);
