// Rotating prompts that display during the countdown
const prompts = [
  // 🧠 Reframe (思维重构)
  "Ask: what if the opposite were true?",
  "Rephrase the problem in one sentence.",
  "Describe this idea to a 5-year-old.",
  "Summarize it as a tweet (280 chars).",
  "Turn the goal into a question.",
  "Explain it to your future self 10 years later.",
  "If this failed, what would be the reason?",
  "Define what 'success' *really* means here.",
  "List the assumptions — which one feels weakest?",
  "Pretend you're your harshest critic.",
  
  // 🔍 Simplify / Reduce
  "Cut the concept to half its size.",
  "Remove the most obvious feature.",
  "If you could only keep 10% of it, what stays?",
  "Describe it using only verbs.",
  "Say it in 3 words.",
  "Remove all nouns and rewrite the idea.",
  "Explain it without technical terms.",
  "What if this had to fit on a business card?",
  "Describe it as if it were a game rule.",
  "Turn it into a physical gesture.",

  // 🎨 Diverge (发散思维)
  "Make it absurd on purpose.",
  "Translate it into sound.",
  "Imagine it as a movie scene.",
  "Draw it as an emoji sequence.",
  "What if it were a meme?",
  "Replace every human with an AI, what changes?",
  "Add an impossible constraint.",
  "Make it work without technology.",
  "Turn it into a board game mechanic.",
  "Visualize it as a map.",

  // 🔄 Combine & Remix
  "Combine this with your last idea.",
  "Merge two unrelated ideas you saw today.",
  "Blend it with a childhood memory.",
  "Add a random Wikipedia article concept.",
  "Cross it with a kitchen tool.",
  "Imagine it as an animal — which one?",
  "Give it a color, a texture, and a smell.",
  "Describe it as a weather pattern.",
  "Turn it into a musical instrument metaphor.",
  "What if it collaborated with ChatGPT?",

  // 🧩 Constraints & Challenges
  "You have only 1 hour — what version do you make?",
  "Make it work offline.",
  "If it cost $0, what would it look like?",
  "Design it for someone blindfolded.",
  "Only one button allowed.",
  "Must work for kids and grandparents.",
  "Use only black and white.",
  "Use only paper and tape.",
  "No text allowed — how to explain it?",
  "You can’t use rectangles.",

  // 🧭 Perspective Shift
  "See it from the user's nightmare scenario.",
  "What would your competitor do better?",
  "How would a 16-year-old use this?",
  "How would a 70-year-old misuse this?",
  "What if it were illegal?",
  "How would an alien interpret it?",
  "Design it for one specific person you know.",
  "Imagine it existed in 1980.",
  "Imagine it in 2080.",
  "Pretend you hate this idea — now improve it.",

  // 🔬 Structural Thinking
  "Sketch the data flow instead of the UI.",
  "Show the cause-and-effect chain.",
  "Define its input and output like a function.",
  "Describe the failure mode.",
  "If it had a heartbeat, when would it spike?",
  "Where does it break under stress?",
  "What’s the smallest testable version?",
  "Map all dependencies — then remove one.",
  "Turn a hidden assumption into a feature.",
  "If it could speak, what would it complain about?",

  // ⚙️ Constraint Relaxation
  "Remove time as a limit — what happens?",
  "Remove money as a limit — what happens?",
  "Remove technology as a limit — what happens?",
  "What if users had superpowers?",
  "What if everything went wrong — what remains useful?",
  "What if this was infinite in scale?",
  "Shrink it to a single line of code.",
  "Make it happen in one click.",
  "Design it for chaos.",
  "Describe its version 100.",

  // 🧭 Meta / Self-Reflection
  "Why are *you* interested in this?",
  "What emotion does this idea avoid?",
  "How would you sabotage it?",
  "What if it had to surprise you?",
  "What does this idea secretly want?",
  "If it had a theme song, what would it be?",
  "What part feels boring — fix only that.",
  "Which part feels too safe?",
  "Imagine explaining it live on stage tomorrow.",
  "End the sentence: 'It would be crazy if...'",

  // 🌀 Random Curveballs
  "Invert its goal completely.",
  "Replace humans with cats — what breaks?",
  "Design it for Mars.",
  "What if it only worked once?",
  "Add a time-travel paradox.",
  "Make it useful during a power outage.",
  "Imagine it’s haunted.",
  "Turn it into a riddle.",
  "Describe it as a scene in a dream.",
  "Make it poetic — not practical."
];


// DOM Elements
const timeDisplay = document.getElementById('timeDisplay');
const promptText = document.getElementById('promptText');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const status = document.getElementById('status');
const timerWrapper = document.querySelector('.timer-wrapper');
const progressCircle = document.querySelector('.progress-circle');

// Timer state
let totalSeconds = 0;
let remainingSeconds = 0;
let timerInterval = null;
let isRunning = false;
let isPaused = false;
let currentPromptIndex = 0;

// Initialize the timer display
function updateDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    updateProgressRing();
}

// Update the progress ring
function updateProgressRing() {
    const circumference = 816.42;
    const progress = remainingSeconds / totalSeconds;
    const offset = circumference * (1 - progress);
    progressCircle.style.strokeDashoffset = offset;
}

// Rotate prompts
function rotatePrompt() {
    currentPromptIndex = (currentPromptIndex + 1) % prompts.length;
    promptText.style.animation = 'none';
    setTimeout(() => {
        promptText.textContent = prompts[currentPromptIndex];
        promptText.style.animation = 'fadeInOut 8s ease-in-out infinite';
    }, 50);
}

// Format and validate input
function getTimerDuration() {
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    return minutes * 60 + seconds;
}

// Start the timer
function startTimer() {
    if (totalSeconds === 0) {
        totalSeconds = getTimerDuration();
        if (totalSeconds <= 0) {
            alert('Please enter a valid time!');
            return;
        }
        remainingSeconds = totalSeconds;
    }

    isRunning = true;
    isPaused = false;

    // Disable inputs
    minutesInput.disabled = true;
    secondsInput.disabled = true;

    // Update button states
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;

    // Update status
    status.textContent = 'Running...';
    status.classList.add('active');

    // Start the countdown
    timerInterval = setInterval(() => {
        remainingSeconds--;
        updateDisplay();

        // Play a subtle sound at certain intervals
        if (remainingSeconds > 0 && remainingSeconds % 5 === 0) {
            playTick();
        }

        // Rotate prompt every 8 seconds
        if (remainingSeconds % 8 === 0 && remainingSeconds > 0) {
            rotatePrompt();
        }

        // Timer finished
        if (remainingSeconds <= 0) {
            finishTimer();
        }
    }, 1000);
}

// Pause the timer
function pauseTimer() {
    if (!isRunning) return;

    isPaused = true;
    isRunning = false;
    clearInterval(timerInterval);

    startBtn.disabled = false;
    startBtn.textContent = 'Resume';
    pauseBtn.disabled = true;

    status.textContent = 'Paused';
    status.classList.remove('active');
    status.classList.add('paused');
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    
    isRunning = false;
    isPaused = false;
    totalSeconds = 0;
    remainingSeconds = 0;
    currentPromptIndex = 0;

    // Reset inputs
    minutesInput.disabled = false;
    secondsInput.disabled = false;
    minutesInput.value = '5';
    secondsInput.value = '0';

    // Reset buttons
    startBtn.disabled = false;
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    resetBtn.disabled = true;

    // Reset display
    updateDisplay();
    promptText.textContent = 'Enter your time and get started!';
    status.textContent = 'Ready';
    status.classList.remove('active', 'paused', 'finished');
    timerWrapper.classList.remove('finished');
}

// Finish timer
function finishTimer() {
    clearInterval(timerInterval);
    isRunning = false;

    status.textContent = 'Time\'s Up! 🎉';
    status.classList.remove('active', 'paused');
    status.classList.add('finished');

    promptText.textContent = '✨ You did it! Great job! ✨';
    promptText.style.animation = 'none';

    // Pulse animation
    timerWrapper.classList.add('finished');
    playFinish();

    // Reset buttons
    startBtn.disabled = false;
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    resetBtn.disabled = false;

    minutesInput.disabled = false;
    secondsInput.disabled = false;
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Allow Enter key to start timer
minutesInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startTimer();
});

secondsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startTimer();
});

// Input validation
minutesInput.addEventListener('change', (e) => {
    let value = parseInt(e.target.value) || 0;
    if (value > 99) value = 99;
    if (value < 0) value = 0;
    e.target.value = value;
});

secondsInput.addEventListener('change', (e) => {
    let value = parseInt(e.target.value) || 0;
    if (value > 59) value = 59;
    if (value < 0) value = 0;
    e.target.value = value;
});

// Initialize display
updateDisplay();
promptText.textContent = prompts[currentPromptIndex];
