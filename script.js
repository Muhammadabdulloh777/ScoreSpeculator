// DOM Elements
const startScreen = document.getElementById('startScreen');
const calculatorScreen = document.getElementById('calculatorScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const backBtn = document.getElementById('backBtn');
const resultsBackBtn = document.getElementById('resultsBackBtn');
const newEstimationBtn = document.getElementById('newEstimationBtn');
const calculateBtn = document.getElementById('calculateBtn');
const scoreForm = document.getElementById('scoreForm');

// Reading & Writing Inputs
const rwModule1 = document.getElementById('rwModule1');
const rwModule1Range = document.getElementById('rwModule1Range');
const rwModule1Value = document.getElementById('rwModule1Value');
const rwModule2 = document.getElementById('rwModule2');
const rwModule2Range = document.getElementById('rwModule2Range');
const rwModule2Value = document.getElementById('rwModule2Value');
const rwTotal = document.getElementById('rwTotal');

// Math Inputs
const mathModule1 = document.getElementById('mathModule1');
const mathModule1Range = document.getElementById('mathModule1Range');
const mathModule1Value = document.getElementById('mathModule1Value');
const mathModule2 = document.getElementById('mathModule2');
const mathModule2Range = document.getElementById('mathModule2Range');
const mathModule2Value = document.getElementById('mathModule2Value');
const mathTotal = document.getElementById('mathTotal');

// Results Elements
const totalScore = document.getElementById('totalScore');
const rwScore = document.getElementById('rwScore');
const mathScore = document.getElementById('mathScore');
const rwProgress = document.getElementById('rwProgress');
const mathProgress = document.getElementById('mathProgress');

// Summary Elements
const summaryRw1 = document.getElementById('summaryRw1');
const summaryRw2 = document.getElementById('summaryRw2');
const summaryRwTotal = document.getElementById('summaryRwTotal');
const summaryMath1 = document.getElementById('summaryMath1');
const summaryMath2 = document.getElementById('summaryMath2');
const summaryMathTotal = document.getElementById('summaryMathTotal');

// Initialize the app
function init() {
    // Set up event listeners for inputs
    setupInputListeners();
    
    // Set up button listeners
    startBtn.addEventListener('click', showCalculator);
    backBtn.addEventListener('click', showStart);
    resultsBackBtn.addEventListener('click', () => showCalculator());
    newEstimationBtn.addEventListener('click', () => {
        // Reset form
        resetForm();
        showCalculator();
    });
    
    // Form submission
    scoreForm.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateScore();
    });
    
    // Initialize totals
    updateTotals();
}

// Set up input listeners for number inputs and sliders
function setupInputListeners() {
    // Reading & Writing Module 1
    rwModule1.addEventListener('input', () => {
        const value = Math.min(22, Math.max(0, parseInt(rwModule1.value) || 0));
        rwModule1.value = value;
        rwModule1Range.value = value;
        rwModule1Value.textContent = value;
        updateTotals();
    });
    
    rwModule1Range.addEventListener('input', () => {
        rwModule1.value = rwModule1Range.value;
        rwModule1Value.textContent = rwModule1Range.value;
        updateTotals();
    });
    
    // Reading & Writing Module 2
    rwModule2.addEventListener('input', () => {
        const value = Math.min(22, Math.max(0, parseInt(rwModule2.value) || 0));
        rwModule2.value = value;
        rwModule2Range.value = value;
        rwModule2Value.textContent = value;
        updateTotals();
    });
    
    rwModule2Range.addEventListener('input', () => {
        rwModule2.value = rwModule2Range.value;
        rwModule2Value.textContent = rwModule2Range.value;
        updateTotals();
    });
    
    // Math Module 1
    mathModule1.addEventListener('input', () => {
        const value = Math.min(27, Math.max(0, parseInt(mathModule1.value) || 0));
        mathModule1.value = value;
        mathModule1Range.value = value;
        mathModule1Value.textContent = value;
        updateTotals();
    });
    
    mathModule1Range.addEventListener('input', () => {
        mathModule1.value = mathModule1Range.value;
        mathModule1Value.textContent = mathModule1Range.value;
        updateTotals();
    });
    
    // Math Module 2
    mathModule2.addEventListener('input', () => {
        const value = Math.min(27, Math.max(0, parseInt(mathModule2.value) || 0));
        mathModule2.value = value;
        mathModule2Range.value = value;
        mathModule2Value.textContent = value;
        updateTotals();
    });
    
    mathModule2Range.addEventListener('input', () => {
        mathModule2.value = mathModule2Range.value;
        mathModule2Value.textContent = mathModule2Range.value;
        updateTotals();
    });
}

// Update total correct answers display
function updateTotals() {
    const rw1 = parseInt(rwModule1.value) || 0;
    const rw2 = parseInt(rwModule2.value) || 0;
    const math1 = parseInt(mathModule1.value) || 0;
    const math2 = parseInt(mathModule2.value) || 0;
    
    rwTotal.textContent = rw1 + rw2;
    mathTotal.textContent = math1 + math2;
}

// Reset form to default values
function resetForm() {
    rwModule1.value = 0;
    rwModule1Range.value = 0;
    rwModule1Value.textContent = 0;
    
    rwModule2.value = 0;
    rwModule2Range.value = 0;
    rwModule2Value.textContent = 0;
    
    mathModule1.value = 0;
    mathModule1Range.value = 0;
    mathModule1Value.textContent = 0;
    
    mathModule2.value = 0;
    mathModule2Range.value = 0;
    mathModule2Value.textContent = 0;
    
    updateTotals();
}

// Screen navigation functions
function showStart() {
    startScreen.classList.add('active');
    calculatorScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
}

function showCalculator() {
    startScreen.classList.remove('active');
    calculatorScreen.classList.add('active');
    resultsScreen.classList.remove('active');
}

function showResults() {
    startScreen.classList.remove('active');
    calculatorScreen.classList.remove('active');
    resultsScreen.classList.add('active');
}

// Calculate estimated SAT score
function calculateScore() {
    // Get values from inputs
    const rw1 = parseInt(rwModule1.value) || 0;
    const rw2 = parseInt(rwModule2.value) || 0;
    const math1 = parseInt(mathModule1.value) || 0;
    const math2 = parseInt(mathModule2.value) || 0;
    
    // Calculate estimated scores based on adaptive test logic
    const rwEstimated = estimateRWScore(rw1, rw2);
    const mathEstimated = estimateMathScore(math1, math2);
    const totalEstimated = rwEstimated + mathEstimated;
    
    // Update summary elements
    summaryRw1.textContent = rw1;
    summaryRw2.textContent = rw2;
    summaryRwTotal.textContent = rw1 + rw2;
    summaryMath1.textContent = math1;
    summaryMath2.textContent = math2;
    summaryMathTotal.textContent = math1 + math2;
    
    // Update score displays (ensuring multiples of 10)
    totalScore.textContent = roundToTen(totalEstimated);
    rwScore.textContent = roundToTen(rwEstimated);
    mathScore.textContent = roundToTen(mathEstimated);
    
    // Update progress bars
    setTimeout(() => {
        rwProgress.style.width = `${(roundToTen(rwEstimated) / 800) * 100}%`;
        mathProgress.style.width = `${(roundToTen(mathEstimated) / 800) * 100}%`;
    }, 100);
    
    // Show results screen
    showResults();
}

// Round to nearest 10 (SAT scores are always multiples of 10)
function roundToTen(score) {
    return Math.round(score / 10) * 10;
}

// Estimate Reading & Writing score based on adaptive test logic
function estimateRWScore(module1Correct, module2Correct) {
    // Base score for Reading & Writing (200-800)
    let baseScore = 200;
    
    // Determine module difficulty based on first module performance
    let module1Difficulty = "medium";
    let module2Difficulty = "medium";
    
    if (module1Correct <= 7) {
        module1Difficulty = "easy";
        module2Difficulty = "easy"; // Easy second module
    } else if (module1Correct <= 15) {
        module1Difficulty = "medium";
        module2Difficulty = "medium"; // Medium second module
    } else {
        module1Difficulty = "hard";
        module2Difficulty = "hard"; // Hard second module
    }
    
    // Calculate raw score (0-44)
    const rawScore = module1Correct + module2Correct;
    
    // Apply scoring curve based on module difficulty
    // Harder modules have more generous curves
    let scaledScore;
    
    if (module2Difficulty === "easy") {
        // Easier module curve (less generous)
        scaledScore = baseScore + Math.min(600, rawScore * 12);
    } else if (module2Difficulty === "medium") {
        // Medium module curve
        scaledScore = baseScore + Math.min(600, rawScore * 12.5);
    } else {
        // Hard module curve (more generous)
        scaledScore = baseScore + Math.min(600, rawScore * 13);
    }
    
    // Ensure score is within bounds
    scaledScore = Math.max(200, Math.min(800, scaledScore));
    
    return scaledScore;
}

// Estimate Math score based on adaptive test logic
function estimateMathScore(module1Correct, module2Correct) {
    // Base score for Math (200-800)
    let baseScore = 200;
    
    // Determine module difficulty based on first module performance
    let module1Difficulty = "medium";
    let module2Difficulty = "medium";
    
    if (module1Correct <= 9) {
        module1Difficulty = "easy";
        module2Difficulty = "easy"; // Easy second module
    } else if (module1Correct <= 18) {
        module1Difficulty = "medium";
        module2Difficulty = "medium"; // Medium second module
    } else {
        module1Difficulty = "hard";
        module2Difficulty = "hard"; // Hard second module
    }
    
    // Calculate raw score (0-54)
    const rawScore = module1Correct + module2Correct;
    
    // Apply scoring curve based on module difficulty
    // Harder modules have more generous curves
    let scaledScore;
    
    if (module2Difficulty === "easy") {
        // Easier module curve (less generous)
        scaledScore = baseScore + Math.min(600, rawScore * 10);
    } else if (module2Difficulty === "medium") {
        // Medium module curve
        scaledScore = baseScore + Math.min(600, rawScore * 10.5);
    } else {
        // Hard module curve (more generous)
        scaledScore = baseScore + Math.min(600, rawScore * 11);
    }
    
    // Ensure score is within bounds
    scaledScore = Math.max(200, Math.min(800, scaledScore));
    
    return scaledScore;
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
